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

  constructor(private auth: AuthService, private router: Router){
  }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.emailOnScreen = sessionStorage.getItem("email");
    console.log(this.emailOnScreen);
    
  }

  logOut(){
    this.auth.signOut()
    this.router.navigateByUrl('/authpage')
  }
}
