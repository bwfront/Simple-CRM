import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.sass'],
})
export class DialogAddUserComponent {
  user: User = new User();
  birthDate: Date = new Date();
  firestore: Firestore = inject(Firestore);

  Users$: Observable<any[]> = of([]);

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>) {
    this.getUserRef();
  }


  async setUser() {
    await addDoc(this.getGameRef(), this.user.toJsonUser()).catch((err) => {
      console.error(err);
    });
  }


  getUserRef() {
    const aCollection = collection(this.firestore, 'user');
    this.Users$ = collectionData(aCollection);
    this.Users$.forEach((e) => {
      console.log(e);
    });
  }

  getGameRef() {
    return collection(this.firestore, 'user');
  }

  saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    this.setUser();
  }
  closeUserDialog() {
    this.dialogRef.close();
  }
}
