import { Injectable } from '@angular/core';
import { SocialAuthService, SocialUser } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
data:any
user: SocialUser = new SocialUser;
loggedIn?: boolean;
  constructor(
    private authService: SocialAuthService

  ) { 
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(this.user)
      this.loggedIn = (user != null);
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(((value : SocialUser)=> 
     {localStorage.setItem('user', JSON.stringify(value))
     this.data = JSON.parse(localStorage.getItem('user') || '{}');
     window.location.reload()
    console.log(this.data)
  }));
  }

 

  signOut(): void {
    this.authService.signOut();
    window.location.reload()
  }
}
