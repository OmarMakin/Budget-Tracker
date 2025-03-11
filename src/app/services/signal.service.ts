import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalService {
  private transactionAddedSubject = new Subject<void>();
  transactionAdded$ = this.transactionAddedSubject.asObservable();

  notifyTransactionAdded() {
    this.transactionAddedSubject.next();
  }
}
