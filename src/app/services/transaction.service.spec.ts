import { TestBed } from '@angular/core/testing';
import { TransactionService } from './transaction.service';

interface Transaction {
  date: string;
  category: string;
  amount: number;
  type: 'income' | 'expense';
}

describe('TransactionService', () => {
  let service: TransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransactionService],
    });
    service = TestBed.inject(TransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add and fetch transactions', () => {
    const dummyTransactions: Transaction[] = [
      { date: '2025-03-10', category: 'Salary', amount: 5000, type: 'income' },
      { date: '2025-03-11', category: 'Groceries', amount: -150, type: 'expense' }
    ];

    service.addTransaction(dummyTransactions[0]);
    service.addTransaction(dummyTransactions[1]);

    const transactions = service.getTransactions();
    expect(transactions.length).toBe(2);
    expect(transactions).toEqual(dummyTransactions);
  });

  it('should handle empty transactions', () => {
    const transactions = service.getTransactions();
    expect(transactions.length).toBe(0);
  });

  it('should handle multiple transactions', () => {
    const dummyTransactions: Transaction[] = [
      { date: '2025-03-10', category: 'Salary', amount: 5000, type: 'income' },
      { date: '2025-03-11', category: 'Groceries', amount: -150, type: 'expense' },
      { date: '2025-03-12', category: 'Rent', amount: -1000, type: 'expense' }
    ];

    dummyTransactions.forEach(transaction => service.addTransaction(transaction));

    const transactions = service.getTransactions();
    expect(transactions.length).toBe(3);
    expect(transactions).toEqual(dummyTransactions);
  });
});