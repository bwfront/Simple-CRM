import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { UserComponent } from '../user/user.component';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.sass'],
})
export class DialogAddUserComponent {
  user: User = new User();
  birthDate: Date = new Date();
  userComponent: UserComponent;
  loading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DialogAddUserComponent>,
    private userService: UserService
  ) {}

  saveUser() {
    this.loading = true;
    this.user.birthDate = this.birthDate.getTime();
    let response = this.userService.setUser(this.user);
    if (response) {
      this.loading = false;
      this.closeUserDialog();
    }
  }

  closeUserDialog() {
    this.dialogRef.close();
  }
}
