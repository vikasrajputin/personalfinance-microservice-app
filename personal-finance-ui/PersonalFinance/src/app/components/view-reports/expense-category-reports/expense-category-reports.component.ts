import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsData from 'highcharts/modules/data';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
import {HighchartsChartModule} from 'highcharts-angular';
import { ReportService } from 'src/app/services/report.service';
import { CommonServiceService } from 'src/app/services/common/common-service.service';

HighchartsExporting(Highcharts);
HighchartsData(Highcharts);
HighchartsAccessibility(Highcharts);


@Component({
  selector: 'app-expense-category-reports',
  standalone: true,
  imports: [HighchartsChartModule],
  templateUrl: './expense-category-reports.component.html',
  styleUrl: './expense-category-reports.component.css'
})
export class ExpenseCategoryReportsComponent {

   baseUrl ='report-service';

  categories: any[] = [];
  actualExpenses: any[] = [];
  plannedExpenses: any[] = [];
  updateFlag: boolean = false; 
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Monthly Expense Report'
    },
    subtitle: {
      text: 'Source: PersonalExpense.com'
    },
    xAxis: {
      categories:this.categories,
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Amount (Rupees)'
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>₹{point.y:.1f}</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      },
    },
    series: []
  };

  chart: Highcharts.Chart | undefined;

  constructor(private commonServices:CommonServiceService) {}

  ngOnInit(): void {
    this.commonServices.get(this.baseUrl+"/api/reports/expense").subscribe((expenses: any[]) => {
      console.log(expenses)
      this.categories = expenses.map((expense: any) => expense.category);
      this.actualExpenses = expenses.map((expense: any) => expense.totalActualExpense);
      this.plannedExpenses = expenses.map((expense: any) => expense.totalPlannedExpense);

      if (this.chartOptions.xAxis) {
        (this.chartOptions.xAxis as Highcharts.XAxisOptions).categories = this.categories;
      }
      if (this.chartOptions.series) {
        this.chartOptions.series = [
          { type: 'column', name: 'Planned Expense Amount', data: this.plannedExpenses },
          { type: 'column', name: 'Actual Expense Amount', data: this.actualExpenses }
        ];
      }

      if (this.chart) {
        this.chart.update(this.chartOptions);
      } else {
        this.chart = Highcharts.chart('expense-container', this.chartOptions);
      }
    });
  }

  
  updateSeriesData(): void { 
    if (this.chart && this.chart.series && this.chart.series[0]) {
      this.chart.series[0].setData(this.plannedExpenses);
      this.chart.series[1].setData(this.actualExpenses);
    }
  }

  



}
 



