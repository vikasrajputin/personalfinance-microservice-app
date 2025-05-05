import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeSourcesReportsComponent } from './income-sources-reports.component';

describe('IncomeSourcesReportsComponent', () => {
  let component: IncomeSourcesReportsComponent;
  let fixture: ComponentFixture<IncomeSourcesReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncomeSourcesReportsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IncomeSourcesReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
