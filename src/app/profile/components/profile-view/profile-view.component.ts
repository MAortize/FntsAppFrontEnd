import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { UserModelo } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {
  email: string = sessionStorage.getItem('email')!
  nickName: string = sessionStorage.getItem('username')!
  urlPicProfile: string = sessionStorage.getItem('urlPic')!

  passwordRegisterControl!: FormControl;

  formChangePass: FormGroup;

  userModelo: UserModelo;


  miEstilo: any = {
    'color': 'red',
    'font-weight': 'bold'
  };

  changeData: boolean = true

  value: string = "Modificar datos"

  constructor(private fb: FormBuilder, private service: ProfileService){
  }


  ngOnInit(): void {
    this.passwordRegisterControl = new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,40}$/)])    

    this.formChangePass = this.fb.group({
      password: this.passwordRegisterControl
    })
  }



  changePass(){
    this.service.changePasswordBack(this.fillDataUser(this.userModelo)).subscribe()
    this.service.changePassword(this.fillDataUser(this.userModelo));
  }


  fillDataUser(user: UserModelo): UserModelo{
    const email = sessionStorage.getItem('email')
    console.log(email);
    
    const password = this.formChangePass.get('password')?.value
    console.log(password);
    

    user = new UserModelo()


    user.email = email;
    user.password = password

    return user

  }


  activarCambioData(){
    this.changeData = !this.changeData
    if (this.changeData==false) {
      this.value = "Modificando datos"
    }else{
      this.value = "Modificar  datos"
    }
  }


}
