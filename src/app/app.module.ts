import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module'; // Routing module
import { AppComponent } from './app.component'; // Root component
import { SummaryCardComponent } from './components/summary-card/summary-card.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { AddTransactionComponent } from './pages/add-transaction/add-transaction.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReportsComponent } from './pages/reports/reports.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,DashboardComponent,SummaryCardComponent,TransactionListComponent,
    AddTransactionComponent,ReportsComponent,NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent], // Bootstrap the root component
})
export class AppModule {}
