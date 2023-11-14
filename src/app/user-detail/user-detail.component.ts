import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/services/user.service';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.sass'],
})
export class UserDetailComponent {
  public id: string;

  user: any;

  username: string = '';
  usermail: string = '';
  userbirth: string = '';
  usercity: string = '';
  userzipcode: string = '';
  userstreet: string = '';

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
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
    this.username = this.user.firstName + ' ' + this.user.lastName;
    this.usermail = this.user.email;
    this.userbirth = this.user.formatBrithDayUser(this.user.birthDate);
    this.usercity = this.user.city;
    this.userzipcode = this.user.zipCode;
    this.userstreet = this.user.street;
  }

  editUser(): void {
    const dialogRef = this.dialog.open(DialogEditUserComponent, {
      data: { id: this.id },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchUser();
      }
    });
  }

  editAddress(): void {
    const dialogRef = this.dialog.open(DialogEditAddressComponent, {
      data: { id: this.id },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchUser();
      }
    });
  }
}
