import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';
import { UserService } from 'src/services/user.service';
import { Subscription } from 'rxjs';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass'],
})
export class UserComponent implements OnDestroy {
  private subscription: Subscription = new Subscription();
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'birthDate',
    'street',
    'city',
    'zipCode',
  ];
  dataSource = [];
  user: User = new User();

  constructor(public dialog: MatDialog, private userService: UserService) {}

  ngOnInit() {
    this.setUserTable();
  }

  setUserTable() {
    this.subscription.add(
      this.userService.getUserRef().subscribe((users) => {
        this.dataSource = users.map((user) => {
          if (user.birthDate) {
            user.birthDate = this.formatBrithDayUser(user.birthDate);
          }
          return user;
        });
      })
    );
  }

  formatBrithDayUser(brithDay: Date) {
    return formatDate(new Date(brithDay), 'yyyy-MM-dd', 'en-US');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}
