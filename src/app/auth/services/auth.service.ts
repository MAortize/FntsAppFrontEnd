import { Injectable, Output } from '@angular/core';

import { GoogleAuthProvider } from 'firebase/auth';


import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, Auth, SignInMethod, signInWithPopup} from '@angular/fire/auth';

import { Firestore, addDoc, collection, doc, setDoc } from '@angular/fire/firestore';

import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient}  from '@angular/common/http';
import baseUrl from '../../../environments/environment';


import Swal from 'sweetalert2';



@Injectable({
  providedIn: 'root'
})


export class AuthService {
  
  emailUser = new BehaviorSubject<string|null>('');
  nameUser = new BehaviorSubject<string|null>('');
  nickUser = new BehaviorSubject<string|null>('');

  public loginStatusSubjec = new Subject<boolean>();

  
  
  userToken!: string;
  
  @Output() loggedIn!: boolean;
  
  
  
  constructor(private http: HttpClient, private db: Firestore , private router: Router) { 
    this.leerToken();
  }
  
  public añadirUsuario(user:any){
    return this.http.post(`${baseUrl}/users/`,user);
  }
  
  //generamos el token
  public generateToken(loginData:any){
    return this.http.post(`${baseUrl}/generate-token`,loginData);
  }

  public getCurrentUser(){
    return this.http.get(`${baseUrl}/actual-usuario`);
  }

  //iniciamos sesión y establecemos el token en el localStorage (diferente a firebase, cambiar nombre)
  public loginUser(token:any){
    sessionStorage.setItem('JWT',token);
    return true;
  }

  public isLoggedIn(){
    let tokenStr = sessionStorage.getItem('JWT');
    if(tokenStr == undefined || tokenStr == '' || tokenStr == null){
      return false;
    }else{
      return true;
    }
  }

  //obtenemos el token
  public getToken(){
    return sessionStorage.getItem('JWT');
  }

  public setUser(user:any){
    sessionStorage.setItem('user', JSON.stringify(user));
    sessionStorage.setItem('email',user.email);
  }

  public getUser(){
    let userStr = sessionStorage.getItem('user');
    if(userStr != null){
      return JSON.parse(userStr);
    }else{
      this.signOut();
      return null;
    }
  }

  public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }
  
  
  signUp(email:string, password:string, pathImg?:string, user?:any) {
    
    this.añadirUsuario(user);

    createUserWithEmailAndPassword(getAuth(), email, password)
    .then((userCredential) => {
      const userRegister = userCredential.user
      console.log(userRegister.uid);
      Swal.fire({
        title: 'Registro exitoso',
        icon: 'success',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#008000'
      }).then(() =>{
        const pathCollection = 'users'
        const userFillingData = {
          uid: userRegister.uid,
          userName: '',
          puntuacion: 0,
          urlPic: pathImg
          
        }
        sessionStorage.setItem('uid', userRegister.uid!)
        sessionStorage.setItem('urlPic', pathImg!)
        setDoc(doc(this.db,pathCollection, userRegister.uid), userFillingData)
        userRegister.getIdToken().then((token) => {
          this.guardarToken(token)
        })
        this.router.navigateByUrl('learn')
      })            
    })
    
    .catch(error => {
      console.log('Aca salta el error',error);      
    })
  }

  
  signIn(email:string, password:string) {
    signInWithEmailAndPassword(getAuth(), email, password)
    .then((userCredential) => {
      const userLogged = userCredential.user;
      console.log(userLogged.uid);

      sessionStorage.setItem('uid', userLogged.uid!);
      sessionStorage.setItem('email', userLogged.email!);
      console.log(userLogged.displayName);

      // sessionStorage.setItem('name', userLogged.displayName!)
      userLogged.getIdToken().then((token) => {
        this.guardarToken(token);
      });
      this.router.navigateByUrl('learn');
      // console.log(userLogged.email);
    })
    .catch(error => {
      console.log(error);      
    })
  }


  signOut() {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('email')
    sessionStorage.removeItem('expira')
    sessionStorage.removeItem('uid')
    sessionStorage.removeItem('urlPic')
    sessionStorage.removeItem('JWT')
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
  
    let tokenStr = sessionStorage.getItem('JWT');
    if (this.userToken.length < 2 || tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      this.loggedIn = false;
      return false
    } else {
      return true;
    }
    
  
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
