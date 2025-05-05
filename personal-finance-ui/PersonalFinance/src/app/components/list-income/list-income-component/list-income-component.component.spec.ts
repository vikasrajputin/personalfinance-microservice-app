import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListIncomeComponentComponent } from './list-income-component.component';

describe('ListIncomeComponentComponent', () => {
  let component: ListIncomeComponentComponent;
  let fixture: ComponentFixture<ListIncomeComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListIncomeComponentComponent]
    });
    fixture = TestBed.createComponent(ListIncomeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
