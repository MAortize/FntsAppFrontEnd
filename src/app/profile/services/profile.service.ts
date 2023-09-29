import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, updatePassword } from '@angular/fire/auth';
import { UserModelo } from 'src/app/shared/models/user.model';
import baseUrl from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }


  changePasswordBack(user: UserModelo){
    const body = {
      "email":user.email,
      "password":user.password
    }
    console.log(body);
    
    return this.http.put(`${baseUrl}/users/modificar-password`,body)
  }



  changePassword(user: UserModelo){  
    if (getAuth().currentUser!==null) {
      updatePassword(getAuth().currentUser, user.password).then(()=>{
        Swal.fire({
          title: 'Cambio de contraseña exitoso',
          text: 'Seras redireccionado al inicio de sesión para que los cambios se efectuen',
          icon: 'success',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#008000'
        }).then(()=>{
          sessionStorage.clear()
          window.location.reload()
        })
      })
    }
  }

}
