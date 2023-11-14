import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/services/user.service';

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

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
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
    this.userbirth = this.user.formatBrithDayUser(this.user.birthDate)
    
  }
}
