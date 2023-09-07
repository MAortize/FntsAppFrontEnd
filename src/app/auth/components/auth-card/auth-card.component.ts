import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { __await } from 'tslib';
import { Router } from '@angular/router';


import { AbstractControl, FormBuilder, FormControl, FormGroup, PatternValidator, Validators } from '@angular/forms';
import { UserModelo } from 'src/app/shared/models/user.model';



@Component({
  selector: 'app-auth-card',
  templateUrl: './auth-card.component.html',
  styleUrls: ['./auth-card.component.css']
})
export class AuthCardComponent implements OnInit {

  
  imgPerfilHombres: any[] = ['../../../../assets/img-hombres/hombre_1.png',
  '../../../../assets/img-hombres/hombre_2.png',
  '../../../../assets/img-hombres/hombre_3.png']

  imgPerfilMujeres: any[] = ['../../../../assets/img-mujeres/mujer_1.png',
  '../../../../assets/img-mujeres/mujer_2.png',
  '../../../../assets/img-mujeres/mujer_3.png']


  formRegister!: FormGroup;
  formLogin!: FormGroup;
  firstNameControl!: FormControl;
  lastNameControl!: FormControl;
  emailRegisterControl!: FormControl;
  emailLoginControl!: FormControl;
  userNameControl!: FormControl;
  passwordRegisterControl!: FormControl;
  passwordLoginControl!: FormControl;
  urlPic!: string;

  userModel!: UserModelo

  regexPassword: string = '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/';

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
    
    
  }

  ngOnInit(): void {
    this.firstNameControl = new FormControl('', Validators.required);
    this.lastNameControl = new FormControl('', Validators.required);
    this.emailRegisterControl = new FormControl('', [Validators.required, Validators.email])
    this.emailLoginControl = new FormControl('', [Validators.required, Validators.email])
    this.userNameControl = new FormControl('', [Validators.required])
    this.passwordRegisterControl = new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,40}$/)])
    this.passwordLoginControl = new FormControl('', [Validators.required])

    this.formRegister = this.formBuilder.group({
      firstName: this.firstNameControl,
      lastName: this.lastNameControl,
      email: this.emailRegisterControl,
      userName: this.userNameControl,
      password: this.passwordRegisterControl
    })
    
    this.formLogin = this.formBuilder.group({
      email: this.emailLoginControl,
      password: this.passwordLoginControl
    })
  }

  contraseñaCorrecta(control: AbstractControl): { [key: string]: any } | null {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}$/;
    const cumpleRegex = regex.test(control.value);
   
   return cumpleRegex ? { regex: true } : null;
  }

  registroUser(user: UserModelo) {
    this.authService.añadirUsuario(user).subscribe({
      next: (data) =>  console.log(data),
      error: (err) => console.log(err)
    })
  }
  
  logSelecciona(path:string) {
    this.urlPic = path
    console.log('urlPic',this.urlPic);
  }

  logIn() {
    this.authService.signIn(this.fillDataUserLogin(this.userModel))    
  }

  register() {   
    this.authService.signUp(this.fillDataUserRegister(this.userModel))
    this.registroUser(this.fillDataUserRegister(this.userModel));
    console.log('Estoy haciendo un registro');    
  }

  logOut() {
    this.authService.signOut()
  }

  fillDataUserLogin(user: UserModelo): UserModelo {
    const email = this.formLogin.get('email')?.value
    const password = this.formLogin.get('password')?.value

    user = new UserModelo()

    user.email = email
    user.password = password

    return user
  }

  fillDataUserRegister(user: UserModelo): UserModelo{
    const userName = this.formRegister.get('userName')?.value
    const firsName = this.formRegister.get('firstName')?.value
    
    const lastName = this.formRegister.get('lastName')?.value
    const email = this.formRegister.get('email')?.value
    const password = this.formRegister.get('password')?.value
    const levelCourse = 0
    const score = 0
    const urlPic = this.urlPic
    
    user = new UserModelo()

    user.username = userName
    user.name = firsName
    user.lastname = lastName
    user.email = email
    user.password = password
    user.level = levelCourse
    user.score = score
    user.urlPicProfile = urlPic

    return user
  }








}
