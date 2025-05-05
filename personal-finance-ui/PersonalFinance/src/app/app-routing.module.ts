import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { AddIncomeComponent } from './components/add-income/add-income.component';
import { LoginComponent } from './components/login/login.component';
import { ListIncomeComponentComponent } from './components/list-income/list-income-component/list-income-component.component';
import { ViewReportsComponent } from './components/view-reports/view-reports.component';
import { AddExpenseComponent } from './components/add-expense/add-expense.component';
import { ListExpenseComponent } from './components/list-expense/list-expense.component';
import { EditExpenseComponent } from './components/edit-expense/edit-expense.component';
import { ExpenseCategoryReportsComponent } from './components/view-reports/expense-category-reports/expense-category-reports.component';
import { IncomeSourcesReportsComponent } from './components/view-reports/income-sources-reports/income-sources-reports.component';
import { OverSpendingReportsComponent } from './components/view-reports/over-spending-reports/over-spending-reports.component';
import { EditIncomeComponent } from './components/edit-income/edit-income.component';


const routes: Routes = [
  { path: 'add-income', component: AddIncomeComponent , canActivate: [AuthGuard] },
  { path: 'list-income', component: ListIncomeComponentComponent , canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  {path: 'view-reports', component: ViewReportsComponent, canActivate: [AuthGuard] },
  {path:'add-expense',component:AddExpenseComponent,canActivate: [AuthGuard]},
{path:'list-expense',component:ListExpenseComponent,canActivate: [AuthGuard]},
{path:"edit-expense",component:EditExpenseComponent,canActivate:[AuthGuard]},
{path:"edit-income",component:EditIncomeComponent,canActivate:[AuthGuard]},
{path:"expense-reports" ,component:ExpenseCategoryReportsComponent,canActivate:[AuthGuard]},
{path:"income-reports" ,component:IncomeSourcesReportsComponent,canActivate:[AuthGuard]},
{path:"over-spending" , component:OverSpendingReportsComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
