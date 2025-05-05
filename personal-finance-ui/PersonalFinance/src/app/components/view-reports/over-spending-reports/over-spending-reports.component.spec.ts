import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverSpendingReportsComponent } from './over-spending-reports.component';

describe('OverSpendingReportsComponent', () => {
  let component: OverSpendingReportsComponent;
  let fixture: ComponentFixture<OverSpendingReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverSpendingReportsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OverSpendingReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
