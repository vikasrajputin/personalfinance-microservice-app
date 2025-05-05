import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseCategoryReportsComponent } from './expense-category-reports.component';

describe('ExpenseCategoryReportsComponent', () => {
  let component: ExpenseCategoryReportsComponent;
  let fixture: ComponentFixture<ExpenseCategoryReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseCategoryReportsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpenseCategoryReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
