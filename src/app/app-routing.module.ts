import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddTransactionComponent } from './pages/add-transaction/add-transaction.component';
import { ReportsComponent } from './pages/reports/reports.component';

const routes: Routes = [
  { path: '', component: DashboardComponent }, // Default route
  { path: 'add-transaction', component: AddTransactionComponent }, // Default route
  { path: 'reports', component: ReportsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
