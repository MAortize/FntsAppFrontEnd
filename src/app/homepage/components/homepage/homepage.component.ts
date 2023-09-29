import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  
  emailOnScreen : string|null = null;
  adminEmail: string|null = sessionStorage.getItem('email');
  thereIsAdminEmail: boolean|null = null;

  constructor(private auth: AuthService, private router: Router){ 
    this.adminEmail = sessionStorage.getItem('email')
    
    this.validateAdminEmail()
    
  }

  ngOnInit(): void {
    this.emailOnScreen = sessionStorage.getItem('email')
  }

  validateAdminEmail(){
    if (this.adminEmail === null) {
      this.thereIsAdminEmail = false
    }else if(this.adminEmail==='adminfnts@gmail.com') {
      this.thereIsAdminEmail = true
    }
  }

  logOut(){
    this.auth.signOut()
    this.router.navigateByUrl('/authpage')
  }
}
