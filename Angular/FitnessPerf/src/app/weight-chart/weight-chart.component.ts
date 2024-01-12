import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Weight } from '../model/weight.model';
import { WeightService } from '../services/weight.service';
import { formatDate } from '@angular/common';
import { Session } from '../model/session.model';
import {
  MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA,
  MatLegacyDialog as MatDialog,
  MatLegacyDialogRef as MatDialogRef
} from '@angular/material/legacy-dialog';
import {
  WeightDialogComponent,
  WeightDialogResult
} from './partials/weight-dialog/weight-dialog.component';
import { filter } from 'rxjs/operators';
import { Chart } from 'chart.js/auto';
import { Utils } from '../utils/utils';
import { Subscription } from 'rxjs';
import { Constants } from '../utils/constants';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-weight-chart',
  templateUrl: './weight-chart.component.html',
  styleUrls: ['./weight-chart.component.scss']
})
export class WeightChartComponent implements OnInit, OnDestroy {
  CONSTANTS = Constants;
  @Input() allWeights: Weight[] = [];
  public chart: any;
  subWeight: Subscription;

  constructor(
    private weightService: WeightService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.subWeight = this.weightService.getWeights().subscribe((allWeights) => {
      this.allWeights = Utils.sortWeightsByDate(allWeights);
      this.createChart();
      this.addWeight();
    });
  }

  ngOnDestroy(): void {
    this.subWeight?.unsubscribe();
  }

  createChart() {
    this.chart?.destroy();
    this.chart = new Chart('MyChart', {
      type: 'bar',

      data: {
        yLabels: ['kg'],
        labels: this.allWeights.map((w) => {
          return formatDate(w.date, 'dd MMM yy', 'en');
        }),
        datasets: [
          {
            label: 'Poids',
            data: this.allWeights.map((w) => w.totalWeight),
            backgroundColor: '#ff9900',
            borderColor: '#ff9900'
          },
          {
            label: 'Bodyfat',
            data: this.allWeights.map((w) => w.fatWeight),
            borderColor: '#67d4ff',
            backgroundColor: '#67d4ff'
          }
        ]
      },
      options: {
        aspectRatio: 2.5,
        color: 'white',
        borderColor: 'grey'
      }
    });
  }

  displayDate(date: any) {
    return formatDate(date, 'dd MMM yy', 'en');
  }

  getBodyFatPercentage(total: number, fat: number) {
    return ((fat / total) * 100).toFixed(1);
  }

  addWeight() {
    this.dialog
      .open(WeightDialogComponent)
      .afterClosed()
      .pipe(filter((w) => !!w))
      .subscribe((weight: Weight) => {
        this.weightService
          .save(weight)
          .then(() => {
            this.snackbarService.openSnackBar('Sauvegardé ! ✅');
          })
          .catch((promiseRejected) => {
            this.snackbarService.openSnackBar(promiseRejected);
          });
      });
  }

  editWeight(weight: Weight) {
    this.dialog
      .open(WeightDialogComponent, {
        data: {
          weight: weight
        },
        width: '100vh'
      })
      .afterClosed()
      .pipe(filter((w) => !!w))
      .subscribe((result: WeightDialogResult) => {
        const serviceAction = result.isUpdate
          ? this.weightService.update(result.weight)
          : this.weightService.delete(result.weight);
        serviceAction
          .then(() => {
            this.snackbarService.openSnackBar('Sauvegardé ! ✅');
          })
          .catch((promiseRejected) => {
            this.snackbarService.openSnackBar(promiseRejected);
          });
      });
  }
}
