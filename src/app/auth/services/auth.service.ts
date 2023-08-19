import { Injectable, Output } from '@angular/core';

import { GoogleAuthProvider } from 'firebase/auth';


import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, Auth, SignInMethod, signInWithPopup} from '@angular/fire/auth';

import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';





import Swal from 'sweetalert2';


// import { DialogNotificationComponent } from 'src/app/shared/components/dialog-notification/dialog-notification.component';


@Injectable({
  providedIn: 'root'
})


export class AuthService {
  
  emailUser = new BehaviorSubject<string|null>('');
  nameUser = new BehaviorSubject<string|null>('');
  nickUser = new BehaviorSubject<string|null>('');

  

  userToken!: string;

  @Output() loggedIn!: boolean;



  constructor(private auth: Auth , private router: Router) { 
    this.leerToken();
  }


  
  signUp(email:string, password:string) {
    createUserWithEmailAndPassword(getAuth(), email, password)
    .then((userCredential) => {
      const user = userCredential.user.displayName;
      console.log(user);
    })
    .catch(error => {
      console.log(error);      
    })
  }

  
  signIn(email:string, password:string) {
    signInWithEmailAndPassword(getAuth(), email, password)
    .then((userCredential) => {
      const userLogged = userCredential.user;
      console.log(userLogged.uid);
      Swal.fire({
        title: 'Inicio sesion de manera exitosa',
        icon: 'success',
        confirmButtonText:'Ok',
        confirmButtonColor: '#008000'
      }).then(() => {
        sessionStorage.setItem('email', userLogged.email!) 
        console.log(userLogged.displayName);
        
        // sessionStorage.setItem('name', userLogged.displayName!)
        userLogged.getIdToken().then((token) => {
          this.guardarToken(token)
        })
        this.router.navigateByUrl('learn')
        // console.log(userLogged.email);
      })      
    })
    .catch(error => {
      console.log(error);      
    })
  }


  signOut() {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('email')
    sessionStorage.removeItem('expira')
  }

  private getInfoUser() {
     signInWithPopup(getAuth(), new GoogleAuthProvider());
  }


  //METODO PARA GUARDAR EL TOKEN QUE LLEGA DESDE FIREBASE
  private guardarToken(idToken: string) {
    this.userToken = idToken
  
    sessionStorage.setItem('token', idToken)
    let today = new Date();
    today.setSeconds(3600)
  
    sessionStorage.setItem('expira', today.getTime().toString())
  }
  
  //METODO PARA LEER EL TOKEN QUE LLEGA DESDE FIREBASE
  leerToken() {
    if (sessionStorage.getItem('token')) {
      this.userToken = sessionStorage.getItem('token')!;
    } else {
      this.userToken = '';
    }
  
    return this.userToken;
  }

  //METODO PARA VALIDAR SI ESTA AUTENTICADO Y PERMITIR QUE ENTRE A LAS DEMAS VENTANAS
  estaAutenticado(): boolean {
  
    if (this.userToken.length < 2) {
      this.loggedIn = false;
      return false
    }

    return true
    
  
    // const expira = Number(sessionStorage.getItem('expira'));
    // const hoy = new Date();
  
    // hoy.setTime(expira);
  
    // if (hoy > new Date()) {
    //   this.loggedIn = true;
    //   return true;
    // } else {
    //   this.loggedIn = false;
    //   return false
    // }
  
  }

  //METODO OBTENER EL EMAIL EN CUALQUIER COMPONENTE QUE SE NECESITE
  // getEmail(): Observable<string|null> {
  //   return this.emailOnScreen.asObservable();
  // }
  
}
