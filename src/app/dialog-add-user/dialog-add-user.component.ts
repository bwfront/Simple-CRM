import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.sass']
})
export class DialogAddUserComponent {

  user: User = new User();
  birthDate: Date = new Date();
  
  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>){
  }

  saveUser(){
    this.user.birthDate = this.birthDate.getTime();
    console.log(this.user);
    
  }
  closeUserDialog(){
    this.dialogRef.close();
  }
}
