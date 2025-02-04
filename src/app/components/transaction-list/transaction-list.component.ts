import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';

interface Transaction {
  date: string;
  category: string;
  amount: number;
  type: 'income' | 'expense';
}

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css'],
  standalone: false
})
export class TransactionListComponent implements OnInit {
  transactions: Transaction[] = []; // Explicitly define the type

  constructor(private transactionService: TransactionService) {}

  ngOnInit() {
    this.transactions = this.transactionService.getTransactions();
  }
}
