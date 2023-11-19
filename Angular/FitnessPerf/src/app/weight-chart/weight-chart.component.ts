import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Weight } from '../model/weight.model';
import { WeightService } from '../services/weight.service';
import { formatDate } from '@angular/common';
import { Session } from '../model/session.model';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { WeightDialogComponent } from './partials/weight-dialog/weight-dialog.component';
import { filter } from 'rxjs/operators';
import { Chart } from 'chart.js/auto';
import { Utils } from '../utils/utils';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weight-chart',
  templateUrl: './weight-chart.component.html',
  styleUrls: ['./weight-chart.component.scss'],
})
export class WeightChartComponent implements OnInit, OnDestroy {
  @Input() allWeights: Weight[] = [];
  public chart: any;
  subWeight: Subscription;

  constructor(private weightService: WeightService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.subWeight = this.weightService.getWeights().subscribe((allWeights) => {
      this.allWeights = Utils.sortWeightsByDate(allWeights);
      this.createChart();
    });
  }

  ngOnDestroy(): void {
    this.subWeight?.unsubscribe();
  }

  createChart() {
    this.chart?.destroy();
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
        if (weight.date && weight.totalWeight) {
          this.weightService.save(weight).then(() => {
          });
        }      
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
