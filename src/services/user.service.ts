import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
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

  getUsersRef(): Observable<any[]> {
    return collectionData(this.getGameRef(), { idField: 'id' });
  }

  async getUserRef(docId: string): Promise<User | null> {
    const docRef = doc(this.firestore, 'user', docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return new User(docSnap.data());
    } else {
      console.log('No User Found');
      return null;
    }
  }

  async updateUser(id: string, userData: any): Promise<void> {
    const userDocRef = doc(this.firestore, 'user', id);
    try {
      await updateDoc(userDocRef, userData);
    } catch (error) {
      console.error('Fehler beim Aktualisieren des Benutzers:', error);
    }
  }


  
}
