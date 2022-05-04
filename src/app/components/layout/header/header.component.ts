import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from "angularx-social-login";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: SocialUser = new SocialUser;
  loggedIn: boolean = true;
  data:any
  userNameLetter: any;
  constructor(
    private authService: SocialAuthService,

  ) { 
    this.data = JSON.parse(localStorage.getItem('user') || '{}');
    this.userNameLetter = this.data.firstName?.charAt(0)
    console.log(this.userNameLetter)
  }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      localStorage.setItem('user', JSON.stringify(user));
      this.user = user;
      this.data = JSON.parse(localStorage.getItem('user') || '{}');
      this.loggedIn = (user != null);
    });
  }

}
