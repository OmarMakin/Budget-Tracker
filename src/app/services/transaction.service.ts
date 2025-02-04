import { Injectable } from '@angular/core';

interface Transaction {
  date: string;
  category: string;
  amount: number;
  type: 'income' | 'expense';
}

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private transactions: Transaction[] = [];

  constructor() {}

  // Add a new transaction
  addTransaction(transaction: Transaction) {
    this.transactions.push(transaction);
    console.log('Transaction added:', transaction);
  }

  // Get all transactions
  getTransactions(): Transaction[] {
    return this.transactions;
  }
}
