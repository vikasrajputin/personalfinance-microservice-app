import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddIncomeComponent } from './components/add-income/add-income.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ListIncomeComponentComponent } from './components/list-income/list-income-component/list-income-component.component';
import { EditIncomeComponent } from './components/edit-income/edit-income.component';


@NgModule({
  declarations: [
    AppComponent,
    AddIncomeComponent,
    LoginComponent,
    ListIncomeComponentComponent,
    EditIncomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
