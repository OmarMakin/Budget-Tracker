import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css'],
  standalone:false
})
export class AddTransactionComponent {
  transactionForm: FormGroup;

  constructor(private fb: FormBuilder, private transactionService: TransactionService) {
    this.transactionForm = this.fb.group({
      date: ['', Validators.required],
      category: ['', [Validators.required, Validators.minLength(3)]],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      type: ['income', Validators.required],
    });
  }

  onSubmit() {
    if (this.transactionForm.valid) {
      this.transactionService.addTransaction(this.transactionForm.value);
      console.log('Transaction added successfully!');
      this.transactionForm.reset(); // Reset the form after submission
    }
  }
}
