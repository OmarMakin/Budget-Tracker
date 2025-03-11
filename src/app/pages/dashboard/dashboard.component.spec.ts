import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { TransactionService } from '../../services/transaction.service';
import { StateService } from '../../services/state.service';
import { SignalService } from '../../services/signal.service';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of, BehaviorSubject } from 'rxjs';

interface Transaction {
  date: string;
  category: string;
  amount: number;
  type: 'income' | 'expense';
}

// Mock components
@Component({
  selector: 'app-summary-card',
  template: '',
  standalone: true
})
class MockSummaryCardComponent {}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let transactionService: jasmine.SpyObj<TransactionService>;
  let stateService: jasmine.SpyObj<StateService>;
  let signalService: jasmine.SpyObj<SignalService>;

  beforeEach(async () => {
    const transactionServiceSpy = jasmine.createSpyObj('TransactionService', ['getTransactions']);
    const stateServiceSpy = jasmine.createSpyObj('StateService', ['getCurrentTransactions', 'loadTransactions']);
    const signalServiceSpy = jasmine.createSpyObj('SignalService', [], {
      transactionAdded$: of(null) // Ensure an initial emission
    });
  
    // Mock transactions$ as a BehaviorSubject
    const transactionsSubject = new BehaviorSubject<Transaction[]>([]);
    stateServiceSpy.transactions$ = transactionsSubject.asObservable();
  
    await TestBed.configureTestingModule({
      imports: [MockSummaryCardComponent],
      declarations: [DashboardComponent],
      providers: [
        { provide: TransactionService, useValue: transactionServiceSpy },
        { provide: StateService, useValue: stateServiceSpy },
        { provide: SignalService, useValue: signalServiceSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    transactionService = TestBed.inject(TransactionService) as jasmine.SpyObj<TransactionService>;
    stateService = TestBed.inject(StateService) as jasmine.SpyObj<StateService>;
    signalService = TestBed.inject(SignalService) as jasmine.SpyObj<SignalService>;
  
    // Attach the subject to the spy
    (stateService.transactions$ as any) = transactionsSubject;
  });
  

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should load and calculate totals on init', () => {
    const dummyTransactions: Transaction[] = [
      { date: '2025-03-10', category: 'Salary', amount: 5000, type: 'income' },
      { date: '2025-03-11', category: 'Groceries', amount: 150, type: 'expense' }
    ];
  
    (stateService.transactions$ as any).next(dummyTransactions); // Emit transactions
    stateService.getCurrentTransactions.and.returnValue(dummyTransactions);
  
    fixture.detectChanges();
  
    console.log("seeeee: ", component.totalIncome);
    console.log("seeeee: ", component.totalExpenses);
    console.log("seeeee: ", component.balance);
    expect(component.totalIncome).toBe(5000);
    expect(component.totalExpenses).toBe(150);
    expect(component.balance).toBe(4850);
  });

  it('should handle empty transactions', () => {
    const emptyTransactions: Transaction[] = [];
  
    (stateService.transactions$ as any).next(emptyTransactions); // Emit empty transactions
    stateService.getCurrentTransactions.and.returnValue(emptyTransactions);
  
    fixture.detectChanges();
  
    expect(component.totalIncome).toBe(0);
    expect(component.totalExpenses).toBe(0);
    expect(component.balance).toBe(0);
  });

});