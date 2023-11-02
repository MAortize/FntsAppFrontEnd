import { Injectable, Output } from '@angular/core';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, setPersistence } from '@angular/fire/auth';

import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';

import { Router } from '@angular/router';
import baseUrl from '../../../environments/environment';
import Swal from 'sweetalert2';
import { UserModelo } from 'src/app/shared/models/user.model';

import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {



  userToken!: string;

  @Output() loggedIn!: boolean;



  constructor(private http: HttpClient, private db?: Firestore, private router?: Router) {
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

  logInBack(user: UserModelo) {
    // console.log(user);
    this.generateToken(user).subscribe(
      (data: any) => {
        // console.log(data);
        this.loginUser(data.token);
        this.getCurrentUser()
      }
    )
  }


  signUp(user: UserModelo) {
    this.añadirUsuario(user);
    createUserWithEmailAndPassword(getAuth(), user.email!, user.password!).then((userCredential) => {
      const userRegister = userCredential.user
      // console.log(userRegister);
      Swal.fire({
        title: 'Registro exitoso',
        text: 'Tu registro fue exitoso recuerda verificar tu correo electrónico para que puedas iniciar sesión',
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
        sessionStorage.setItem('email', user.email!)
        sessionStorage.setItem('puntuacion', user.score.toString())
        userRegister.getIdToken().then((token) => {
          this.guardarToken(token)
          sendEmailVerification(getAuth().currentUser)
        })
        setDoc(doc(this.db, pathCollection, userRegister.uid), userFillingData).then(()=>{
          window.location.reload()
        })

      })
    }).catch(error => {
      console.log('Aca salta el error', error);
    });
  }


  signIn(user: UserModelo) {
    this.logInBack(user)
    signInWithEmailAndPassword(getAuth(), user.email!, user.password!)
      .then((userCredential) => {
        const userLogged = userCredential.user;
        sessionStorage.setItem('currentUser', JSON.stringify(userLogged))
        // console.log(userLogged.uid);
        // console.log(userCredential);
        if (userLogged.emailVerified) {
          Swal.fire({
            title: 'Iniciando Sesión',
            icon: 'success',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#008000'
          }).then(() => {
            sessionStorage.setItem('email', userLogged.email!);
            sessionStorage.setItem('uid', userLogged.uid!);
            userLogged.getIdToken().then((token) => {
              this.guardarToken(token);
              this.getInfoUser(userLogged.email)
            });

          })
        } else {
          Swal.fire({
            title: 'Verificación de correo obligatoria',
            text: 'Debes verificar tu correo electrónico para iniciar sesión',
            icon: 'error',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#008000'
          })
        }
      })
      .catch((error) => {
        // console.log(error.message);
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
    sessionStorage.clear()
    localStorage.clear()
  }

  private getInfoUser(email?: string | null) {
    const pathCollection = '/users/' + sessionStorage.getItem('uid')
    const docInstance = doc(this.db, pathCollection)
    // if (this.esAdmin(email)) {
    //   this.router.navigate(['admin'])
    // }
    getDoc(docInstance).then((doc) => {
      if (doc && doc.exists()) {
        const data = doc.data();
        sessionStorage.setItem("username", data['userName'])
        sessionStorage.setItem("urlPic", data['urlPic'])
        sessionStorage.setItem("puntuacion", data['puntuacion'])
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


  esAdmin(email?: string | null): boolean {
    if (email === 'adminfnts@gmail.com') {
      return true
    } else {
      return false
    }

  }

  //METODO OBTENER EL EMAIL EN CUALQUIER COMPONENTE QUE SE NECESITE
  // getEmail(): Observable<string|null> {
  //   return this.emailOnScreen.asObservable();
  // }

}
