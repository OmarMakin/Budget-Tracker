import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';

interface Transaction {
  date: string;
  category: string;
  amount: number;
  type: 'income' | 'expense';
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
  standalone: false
})
export class ReportsComponent implements OnInit {
  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  categoryFilter = '';
  dateFilter = '';
  chart: any;

  constructor(private transactionService: TransactionService) {}

  ngOnInit() {
    this.transactions = this.transactionService.getTransactions();
    this.filteredTransactions = [...this.transactions];
  }

  applyFilters() {
    this.filteredTransactions = this.transactions.filter(transaction => {
      const matchesCategory = this.categoryFilter
        ? transaction.category.toLowerCase().includes(this.categoryFilter.toLowerCase())
        : true;

      const matchesDate = this.dateFilter
        ? transaction.date === this.dateFilter
        : true;

      return matchesCategory && matchesDate;
    });
  }

}
