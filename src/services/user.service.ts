import {
  Firestore,
  addDoc,
  collection,
  collectionData,
} from '@angular/fire/firestore';
import { User } from 'src/models/user.class';
import { inject } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  user: User = new User();
  firestore: Firestore = inject(Firestore);
  Users$: Observable<any[]> = of([]);
  UsersResp;

  getGameRef() {
    return collection(this.firestore, 'user');
  }

  async setUser(user) {
    await addDoc(this.getGameRef(), user.toJsonUser())
      .then(() => {
        return true;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  getUserRef(): Observable<any[]> {
    return collectionData(this.getGameRef());
  }
}
