import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { __await } from 'tslib';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';



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
  

  email!: string;


  constructor(private authService: AuthService, private router: Router) {

  }

  public user = {
    username : 'qwer',
    lastname : '',
    email : '',
    password : '',
    name : '',
    level : 1,
    score : 0,
    perfil : ''
  }

  loginData = {
    "username" : this.user.username,
    "password" : ''
  }

  registroUser() {
    this.authService.añadirUsuario(this.user).subscribe(
      (data) => {
      },(error) => {
        console.log(error);
      }
    )
  }

  formSubmit(){
    console.log(this.loginData);
    
    this.authService.generateToken(this.loginData).subscribe(
      (data:any) => {
        console.log(data);
        this.authService.loginUser(data.token);
        this.authService.getCurrentUser().subscribe((user:any) => {
          this.authService.setUser(user);
          console.log(user);
          Swal.fire({
            title: 'Inicio sesion de manera exitosa',
            icon: 'success',
            confirmButtonText:'Ok',
            confirmButtonColor: '#008000'
          }).then(() => {

          if(this.authService.getUserRole() == 'ADMIN'){
            //dashboard admin
            //window.location.href = '/admin';
            this.router.navigate(['admin']);
            this.authService.loginStatusSubjec.next(true);
          }
          else if(this.authService.getUserRole() == 'NORMAL'){
            //user dashboard
            //window.location.href = '/user-dashboard';
            this.authService.estaAutenticado();
            this.router.navigateByUrl('learn')
            this.authService.loginStatusSubjec.next(true);
          }
          else{
            this.authService.signOut();
          }
        })
      })
      },(error) => {
        console.log(error);
      }
    )
  }
  
  
  
  logSelecciona(path:any) {
    this.urlPic = path
    this.user.perfil = path
    console.log('SOY HOMBRE',this.urlPic);
    
    
  }

  logIn() {
    this.formSubmit();
    this.authService.signIn(this.emailLogin, this.passwordLogin)    
  }

  register() {
    this.registroUser();
    this.authService.signUp(this.user.email, this.user.password, this.urlPic)
    console.log('me estoy ejecutando');
    
  }


  logOut() {
    this.authService.signOut()
  }








}
