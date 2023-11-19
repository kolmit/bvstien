import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { BaseService } from './base.service';
import { SnackbarService } from './snackbar.service';
import { Constants } from '../utils/constants';
import { map } from 'rxjs/operators';
import { Weight } from '../model/weight.model';
import { Session } from '../model/session.model';

@Injectable({
  providedIn: 'root',
})
export class WeightService extends BaseService {
  constructor(firestore: AngularFirestore, private snackbarService: SnackbarService) {
    super(firestore);
  }

  save(weight: Weight) {
    return this.getUserDataDocuments().collection(Constants.USER_WEIGHT).doc().set(weight);
  }

  delete(weight: Weight) {
    return this.getUserDataDocuments().collection(Constants.USER_WEIGHT).doc(weight.id).delete();
  }

  update(weight: Weight) {
    return this.getUserDataDocuments().collection(Constants.USER_WEIGHT).doc(weight.id).update(weight);
  }

  getWeights() {
    return this.getUserDataDocuments()
      .collection(Constants.USER_WEIGHT)
      .snapshotChanges()
      .pipe(
        map((allWeights) => {
          let weightList: Weight[] = [];
          allWeights.map((programMetadata) => {
            let p: Weight = programMetadata.payload.doc.data() as Weight;
            p.id = programMetadata.payload.doc.id;
            p.date = Session.convertTimestampToDate((p.date as any).seconds);
            weightList.push(p);
          });

          return weightList;
        })
      );
  }
}
