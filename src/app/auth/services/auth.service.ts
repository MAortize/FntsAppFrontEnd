import { Injectable, Output } from '@angular/core';



import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, Auth, SignInMethod, signInWithPopup } from '@angular/fire/auth';

import { Firestore, addDoc, collection, doc, getDoc, setDoc } from '@angular/fire/firestore';

import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import baseUrl from '../../../environments/environment';


import Swal from 'sweetalert2';
import { UserModelo } from 'src/app/shared/models/user.model';



@Injectable({
  providedIn: 'root'
})


export class AuthService {



  userToken!: string;

  @Output() loggedIn!: boolean;



  constructor(private http: HttpClient, private db: Firestore, private router: Router) {
    this.leerToken();
  }

  public añadirUsuario(user: UserModelo) {
    return this.http.post(`${baseUrl}/users/`, user);
  }

  //generamos el token
  public generateToken(user: UserModelo) {
    // console.log(user);
    const body = {
      "email": user.email,
      "password": user.password
    }
    return this.http.post(`${baseUrl}/generate-token`, body);
  }

  public getCurrentUser() {
    return this.http.get(`${baseUrl}/actual-usuario`);
  }

  //iniciamos sesión y establecemos el token en el localStorage (diferente a firebase, cambiar nombre)
  public loginUser(token: any) {
    sessionStorage.setItem('JWT', token);
    return true;
  }

  public isLoggedIn() {
    let tokenStr = sessionStorage.getItem('JWT');
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    } else {
      return true;
    }
  }

  //obtenemos el token
  public getToken() {
    return sessionStorage.getItem('JWT');
  }

  logInBack(user: UserModelo){
    console.log(user);
    this.generateToken(user).subscribe(
      (data:any) => {
        console.log(data);
        this.loginUser(data.token);
        this.getCurrentUser()
      }
    )
  }


  signUp(user: UserModelo) {
    this.añadirUsuario(user);
    createUserWithEmailAndPassword(getAuth(), user.email!, user.password!)
      .then((userCredential) => {
        const userRegister = userCredential.user
        console.log(userRegister.uid);
        Swal.fire({
          title: 'Registro exitoso',
          icon: 'success',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#008000'
        }).then(() => {
          const pathCollection = 'users'
          const userFillingData = {
            uid: userRegister.uid,
            userName: user.username,
            puntuacion: user.score,
            urlPic: user.urlPicProfile
          }
          sessionStorage.setItem('uid', userRegister.uid!)
          sessionStorage.setItem('urlPic', user.urlPicProfile!)
          sessionStorage.setItem('username', user.username!)
          setDoc(doc(this.db, pathCollection, userRegister.uid), userFillingData)
          userRegister.getIdToken().then((token) => {
            this.guardarToken(token)
            this.router.navigate(['learn'])
          })
        })
      }).catch(error => {
        console.log('Aca salta el error', error);
      })
  }


  signIn(user: UserModelo) {
    this.logInBack(user)
    signInWithEmailAndPassword(getAuth(), user.email!, user.password!)
      .then((userCredential) => {
        const userLogged = userCredential.user;
        console.log(userLogged.uid);
        Swal.fire({
          title: 'Iniciando Sesion',
          icon: 'success',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#008000'
        }).then(() => {
          sessionStorage.setItem('uid', userLogged.uid!);
          sessionStorage.setItem('email', userLogged.email!);
          userLogged.getIdToken().then((token) => {
            this.guardarToken(token);
            this.getInfoUser()
          });
        })
      })
      .catch((error) => {
        console.log(error.message);
        if (error.message === "Firebase: Error (auth/wrong-password).") {
          const errPassword = "Contraseña incorrecta"
          Swal.fire({
            title: 'Parece que hay problemas',
            icon: 'warning',
            text: errPassword,
            confirmButtonText: 'Ok',
            confirmButtonColor: '#dc3545'
          })
        }
        if (error.message === "Firebase: Error (auth/user-not-found).") {
          const errEmail = "Tenemos problemas encontrando tu usuario, verifica que el correo que estas ingresando sea el correcto ^.^"
          Swal.fire({
            title: 'Parece que hay problemas',
            icon: 'warning',
            text: errEmail,
            confirmButtonText: 'Ok',
            confirmButtonColor: '#dc3545'
          })
        }
      })
  }


  signOut() {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('email')
    sessionStorage.removeItem('expira')
    sessionStorage.removeItem('uid')
    sessionStorage.removeItem('urlPic')
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('JWT')
  }

  private getInfoUser() {
    const pathCollection = '/users/' + sessionStorage.getItem('uid')
    const docInstance =  doc(this.db, pathCollection)
    getDoc(docInstance).then((doc)=>{
      if (doc && doc.exists()) {
        const data = doc.data();
        sessionStorage.setItem("username", data['userName'])
        sessionStorage.setItem("urlPic", data['urlPic'])
        this.router.navigate(['learn'])
      }
    })
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

    // let tokenStr = sessionStorage.getItem('JWT');
    // if (this.userToken.length < 2 || tokenStr == undefined || tokenStr == '' || tokenStr == null) {
    //   this.loggedIn = false;
    //   return false
    // } else {
    //   return true;
    // }


    const expira = Number(sessionStorage.getItem('expira'));
    const hoy = new Date();

    hoy.setTime(expira);

    if (hoy > new Date()) {
      this.loggedIn = true;
      return true;
    } else {
      this.loggedIn = false;
      return false
    }

  }

  //METODO OBTENER EL EMAIL EN CUALQUIER COMPONENTE QUE SE NECESITE
  // getEmail(): Observable<string|null> {
  //   return this.emailOnScreen.asObservable();
  // }

}
