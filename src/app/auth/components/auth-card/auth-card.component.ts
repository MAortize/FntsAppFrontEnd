import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { __await } from 'tslib';
import { Router } from '@angular/router';



@Component({
  selector: 'app-auth-card',
  templateUrl: './auth-card.component.html',
  styleUrls: ['./auth-card.component.css']
})
export class AuthCardComponent {

  
  imgPerfilHombres: any[] = ['../../../../assets/img-hombres/hombre_1.png',
  '../../../../assets/img-hombres/hombre_2.png',
  '../../../../assets/img-hombres/hombre_3.png']

  imgPerfilMujeres: any[] = ['../../../../assets/img-mujeres/mujer_1.png',
  '../../../../assets/img-mujeres/mujer_2.png',
  '../../../../assets/img-mujeres/mujer_3.png']

  emailLogin!: string;
  passwordLogin!: string;

  urlPic!: string;
  

  emailsignup!: string;
  passwordsignup!: string;

  constructor(private authService: AuthService, private router: Router) {

  }
  
  
  
  logSelecciona(path:any) {
    this.urlPic = path
    console.log('SOY HOMBRE',this.urlPic);
    
    
  }

  logIn() {
    this.authService.signIn(this.emailLogin, this.passwordLogin)    
  }

  register() {
    this.authService.signUp(this.emailsignup, this.passwordsignup, this.urlPic)
    console.log('me estoy ejecutando');
    
  }


  logOut() {
    this.authService.signOut()
  }








}
