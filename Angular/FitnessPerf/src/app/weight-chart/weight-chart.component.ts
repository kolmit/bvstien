import { Component, Inject, Input, OnInit } from '@angular/core';
import { Weight } from '../model/weight.model';
import { WeightService } from '../services/weight.service';
import { formatDate } from '@angular/common';
import { Session } from '../model/session.model';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { WeightDialogComponent } from './partials/weight-dialog/weight-dialog.component';
import { filter } from 'rxjs/operators';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-weight-chart',
  templateUrl: './weight-chart.component.html',
  styleUrls: ['./weight-chart.component.scss'],
})
export class WeightChartComponent implements OnInit {
  @Input() allWeights: Weight[] = [];
  public chart: any;

  constructor(private weightService: WeightService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.weightService.getWeights().subscribe((allWeights) => {
      this.allWeights = allWeights;
      this.createChart();
    });
  }

  createChart() {
    this.chart?.destroy();
    console.log(
      this.allWeights.map((w) => {
        return formatDate(w.date, 'yyyy-MM-dd', 'en');
      })
    );
    this.chart = new Chart('MyChart', {
      type: 'line',

      data: {
        labels: this.allWeights.map((w) => {
          return formatDate(w.date, 'yyyy-MM-dd', 'en');
        }),
        datasets: [
          {
            label: 'Poids',
            data: this.allWeights.map((w) => w.totalWeight),
            backgroundColor: '#ff9900',
            borderColor: '#ff9900',
          },
          {
            label: 'Bodyfat',
            data: this.allWeights.map((w) => w.fatWeight),
            borderColor: '#67d4ff',
            backgroundColor: '#67d4ff',
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
        color: 'white',
        borderColor: 'grey',
      },
    });
  }

  displayDate(date: any) {
    return formatDate(date, 'dd MMM yyyy', 'en');
  }

  getBodyFatPercentage(total: number, fat: number) {
    return ((fat / total) * 100).toFixed(2);
  }

  addWeight() {
    this.dialog
      .open(WeightDialogComponent)
      .afterClosed()
      .pipe(filter((w) => !!w))
      .subscribe((weight: Weight) => {
        this.weightService.save(weight).then(() => {
          console.log('ok weight', weight);
        });
      });
  }

  editWeight(weight: Weight) {
    this.dialog
      .open(WeightDialogComponent, {
        data: {
          weight: weight,
        },
        width: '100vh',
      })
      .afterClosed()
      .pipe(filter((w) => !!w))
      .subscribe((weight: Weight) => {
        this.weightService.update(weight).then(() => {
          console.log('ok weight', weight);
        });
      });
  }
}
