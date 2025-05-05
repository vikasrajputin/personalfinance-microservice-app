import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsData from 'highcharts/modules/data';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
import {HighchartsChartModule} from 'highcharts-angular';
import { ReportService } from 'src/app/services/report.service';

HighchartsExporting(Highcharts);
HighchartsData(Highcharts);
HighchartsAccessibility(Highcharts);

@Component({
  selector: 'app-income-sources-reports',
  standalone: true,
  imports: [HighchartsChartModule],
  templateUrl: './income-sources-reports.component.html',
  styleUrl: './income-sources-reports.component.css'
})
export class IncomeSourcesReportsComponent {

  source: any[] = [];
  actualincome: any[] = [];
  plannedincome: any[] = [];
  updateFlag: boolean = false; 
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Monthly Income Report'
    },
    subtitle: {
      text: 'Source: PersonalExpense.com'
    },
    xAxis: {
      categories:this.source,
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

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.reportService.getAllIncome().subscribe((incomes: any[]) => {

      console.log(incomes)
      this.source = incomes.map((income: any) => income.source);
      this.actualincome = incomes.map((income: any) => income.totalactualIncome);
      this.plannedincome = incomes.map((income: any) => income.totalplannedIncome);

      if (this.chartOptions.xAxis) {
        (this.chartOptions.xAxis as Highcharts.XAxisOptions).categories = this.source;
      }
      if (this.chartOptions.series) {
        this.chartOptions.series = [
          { type: 'column', name: 'Planned Income Amount', data: this.plannedincome },
          { type: 'column', name: 'Actual Income Amount', data: this.actualincome }
        ];
      }

      if (this.chart) {
        this.chart.update(this.chartOptions);
      } else {
        this.chart = Highcharts.chart('income-container', this.chartOptions);
      }
    });
  }

  
  updateSeriesData(): void { 
    if (this.chart && this.chart.series && this.chart.series[0]) {
      this.chart.series[0].setData(this.plannedincome);
      this.chart.series[1].setData(this.actualincome);
    }
  }


}
