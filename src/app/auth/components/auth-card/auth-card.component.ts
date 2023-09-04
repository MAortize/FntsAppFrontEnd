import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { __await } from 'tslib';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';



@Component({
  selector: 'app-auth-card',
  templateUrl: './auth-card.component.html',
  styleUrls: ['./auth-card.component.css']
})
export class AuthCardComponent {

  emailLogin!: string;
  passwordLogin!: string;

  emailsignup!: string;
  passwordsignup!: string;

  constructor(private authService: AuthService, private router:Router) {
    
  }
  
  public user = {
    username : 'mimi',
    lastname : '',
    email : '',
    password : '',
    name : '',
    level : 1,
    score : 0
  }

  loginData = {
    "username" : '',
    "password" : '',
  }

  registroUser() {

    console.log(this.user);
    this.authService.añadirUsuario(this.user).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Usuario guardado','Usuario registrado con exito en el sistema','success');
      },(error) => {
        console.log(error);
      }
    )
  }

  formSubmit(){

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
            this.authService.logout();
          }
        })
      })
      },(error) => {
        console.log(error);
      }
    )
  }
  
  logIn() {
    //todo: Debo capturar el stsTokenManager para guardarlo en el SessionStorage y hacer que el usuario permanezca loggueado
    this.authService.signIn(this.emailLogin, this.passwordLogin)
    // this.authService.getEmail().subscribe((email)=> console.log("log from controler",email))
    
    
    
  }

  register() {
    this.authService.signUp(this.emailsignup, this.passwordsignup)
  }


  logOut() {
    this.authService.signOut()
  }








}
