import { formatDate } from '@angular/common';
import { AngularFirestore } from '@angular/fire/firestore';
import { Session } from '../model/session.model';
import { Constants } from '../utils/constants';

export abstract class BaseService {

  constructor(protected firestore: AngularFirestore) { }

  getUserDataDocuments() {
    return this.firestore
      .collection(Constants.USER_DATA)
      .doc(localStorage.getItem('login'))
   }

  /** Format du nom d'une séance : DD-MM-YYYY */
  buildSessionDocumentName(ddmmyyyy: Date | any): string {
    if (ddmmyyyy.seconds) { 
      ddmmyyyy = Session.convertTimestampToDate(ddmmyyyy.seconds);
    }

    return formatDate(ddmmyyyy, "yyyy-MM-dd", "en");
  }
}
