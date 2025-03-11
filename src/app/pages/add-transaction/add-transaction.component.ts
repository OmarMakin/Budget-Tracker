import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';
import { SignalService } from '../../services/signal.service';
import { StateService } from '../../services/state.service';

interface Transaction {
  date: string;
  category: string;
  amount: number;
  type: 'income' | 'expense';
}


@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css'],
  standalone:false
})
export class AddTransactionComponent {
  transactionForm: FormGroup;

  constructor(private fb: FormBuilder, private transactionService: TransactionService, private stateService: StateService, private signalService: SignalService) {
    this.transactionForm = this.fb.group({
      date: ['', Validators.required],
      category: ['', [Validators.required, Validators.minLength(3)]],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      type: ['income', Validators.required],
    });
  }

  onSubmit() {
    if (this.transactionForm.valid) {
      const newTransaction: Transaction = this.transactionForm.value;
      this.transactionService.addTransaction(newTransaction);
      console.log('Transaction added successfully!');
      this.stateService.addTransaction(newTransaction);
      this.signalService.notifyTransactionAdded();
      this.transactionForm.reset(); // Reset the form after submission
    }
  }
}
