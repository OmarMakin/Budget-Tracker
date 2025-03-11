import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { SummaryCardComponent } from '../../components/summary-card/summary-card.component';
import { TransactionListComponent } from '../../components/transaction-list/transaction-list.component';

@NgModule({
  declarations: [DashboardComponent, SummaryCardComponent, TransactionListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: DashboardComponent }])
  ]
})
export class DashboardModule {}
