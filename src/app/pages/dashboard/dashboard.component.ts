import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { SignalService } from '../../services/signal.service';
import { Observable } from 'rxjs';
import { StateService } from '../../services/state.service';

interface Transaction {
  date: string;
  category: string;
  amount: number;
  type: 'income' | 'expense';
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: false
})
export class DashboardComponent implements OnInit {
  transactions$: Observable<Transaction[]>;
  totalIncome = 0;
  totalExpenses = 0;
  balance = 0;

  constructor(
    private transactionService: TransactionService,
    private stateService: StateService,
    private signalService: SignalService
  ) {
    this.transactions$ = this.stateService.transactions$;
  }

  ngOnInit() {
    this.transactions$.subscribe((transactions) => {
      this.calculateTotals(transactions);
    });

    this.signalService.transactionAdded$.subscribe(() => {
      this.stateService.loadTransactions([...this.stateService.getCurrentTransactions()]);
    });
  }

  calculateTotals(transactions: Transaction[]) {
    this.totalIncome = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    this.totalExpenses = transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    this.balance = this.totalIncome - this.totalExpenses;
  }
}