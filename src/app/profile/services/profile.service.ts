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

  constructor(private http: HttpClient) { console.log(getAuth().currentUser);   }
    


  changePasswordBack(user: UserModelo){
    const body = {
      "email":user.email,
      "password":user.password
    }
    // console.log(body);    
    return this.http.put(`${baseUrl}/users/modificar-password`,body)
  }



  changePassword(user: UserModelo){  
    if (getAuth().currentUser===null) {
      Swal.fire({
        title: 'Cambio de contraseña',
        text: 'Tenemos problemas encontrándote, ¿podrías iniciar sesión nuevamente y luego volver a intentarlo?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Ok',
        confirmButtonColor: '#008000',
        cancelButtonText: 'Cancelar',
        cancelButtonColor: '#dc3545'
      }).then((response)=>{
        if (response.isConfirmed) {
          sessionStorage.clear()
          window.location.reload()
        }
      })
    }
    if (getAuth().currentUser!==null) {
      Swal.fire({
        title: '¿Estas segur@ que quieres cambiar tu contraseña?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si',
        confirmButtonColor: '#008000',
        cancelButtonText: 'No',
        cancelButtonColor: '#dc3545'
      }).then((response)=>{
        if (response.isConfirmed){
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
        if (response.isDismissed) {
          window.location.reload()
        }
      })
    }
  }

}
