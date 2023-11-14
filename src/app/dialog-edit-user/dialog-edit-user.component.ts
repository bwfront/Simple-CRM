import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.sass'],
})
export class DialogEditUserComponent {
  public id: string;

  user: any;

  userfirstname: string = '';
  userlastname: string = '';
  usermail: string = '';
  userbirth: string = '';

  loading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DialogEditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.id = this.data.id;
    this.fetchUser();
  }

  async fetchUser() {
    try {
      const user = await this.userService.getUserRef(this.id);
      if (user) {
        this.user = user;
        this.userDatails();
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }

  userDatails() {
    this.userfirstname = this.user.firstName;
    this.userlastname = this.user.lastName;
    this.usermail = this.user.email;
    this.userbirth = this.user.formatBrithDayUser(this.user.birthDate);
  }

  closeUserDialog() {
    this.dialogRef.close(true);
  }
  
  saveUser() {
    this.loading = true;
    this.userService
      .updateUser(this.id, this.updatetUserData())
      .then(() => {
        this.loading = false;
        this.closeUserDialog();
      })
      .catch((error) => {
        console.error('Fehler beim Speichern:', error);
      });
  }

  updatetUserData() {
    return {
      firstName: this.userfirstname,
      lastName: this.userlastname,
      email: this.usermail,
      birthDate: new Date(this.userbirth).getTime(),
    };
  }
}
