import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface Transaction {
    date: string;
    category: string;
    amount: number;
    type: 'income' | 'expense';
  }  

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private transactionsSubject: BehaviorSubject<Transaction[]> = new BehaviorSubject<Transaction[]>([]);
  public transactions$: Observable<Transaction[]> = this.transactionsSubject.asObservable();

  constructor() {}

  loadTransactions(transactions: Transaction[]) {
    this.transactionsSubject.next(transactions);
  }

  addTransaction(transaction: Transaction) {
    const currentTransactions = this.transactionsSubject.value;
    this.transactionsSubject.next([...currentTransactions, transaction]);
  }
  
  getCurrentTransactions(): Transaction[] {
    return this.transactionsSubject.value;
  }
}