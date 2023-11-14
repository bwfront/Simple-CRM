import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/services/user.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.sass'],
})
export class DialogEditAddressComponent {

  public id: string;

  user: any;

  usercity: string = '';
  userzipcode: string = '';
  userstreet: string = '';
  loading: boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService, private route: ActivatedRoute,) {}

  onNoClick(): void {
    this.dialogRef.close();
  }


  ngOnInit() {
    this.id = this.data.id
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
      this.usercity = this.user.city;
      this.userzipcode = this.user.zipCode;
      this.userstreet = this.user.street;
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
        city: this.usercity,
        zicode: this.userzipcode,
        street: this.userstreet,
      };
  }
}
