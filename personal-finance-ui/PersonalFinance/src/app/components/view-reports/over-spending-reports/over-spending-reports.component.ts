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
  selector: 'app-over-spending-reports',
  standalone: true,
  imports: [HighchartsChartModule],
  templateUrl: './over-spending-reports.component.html',
  styleUrl: './over-spending-reports.component.css'
})
export class OverSpendingReportsComponent {

  baseUrl ='report-service';

  description: any[] = [];
  actualExpense: any[] = [];
  plannedExpense: any[] = [];
  updateFlag: boolean = false; 
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'line'
    },
    title: {
      text: 'Monthly Over Spending Expense Report'
    },
    subtitle: {
      text: 'Source: PersonalExpense.com'
    },
    xAxis: {
      categories:this.description,
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
    this.commonServices.get(this.baseUrl+"/api/reports/overSpend").subscribe((overs: any[]) => {
      console.log(overs)
      this.description = overs.map((over: any) => over.description);
      this.actualExpense = overs.map((over: any) => over.totalActualExpense);
      this.plannedExpense = overs.map((over: any) => over.totalPlannedExpense);

      if (this.chartOptions.xAxis) {
        (this.chartOptions.xAxis as Highcharts.XAxisOptions).categories = this.description;
      }
      if (this.chartOptions.series) {
        this.chartOptions.series = [
          { type: 'line', name: 'Planned Income Amount', data: this.actualExpense },
          { type: 'line', name: 'Actual Income Amount', data: this.plannedExpense , color: 'rgba(255, 99, 71, 0.7)'}
        ];
      }

      if (this.chart) {
        this.chart.update(this.chartOptions);
      } else {
        this.chart = Highcharts.chart('over-container', this.chartOptions);
      }
    });
  }

  
  updateSeriesData(): void { 
    if (this.chart && this.chart.series && this.chart.series[0]) {
      this.chart.series[0].setData(this.actualExpense);
      this.chart.series[1].setData(this.plannedExpense);
    }
  }




}
