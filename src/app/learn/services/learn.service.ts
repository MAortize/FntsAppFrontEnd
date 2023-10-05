import { EventEmitter, Injectable, Output } from '@angular/core';

import baseUrl from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';


import { doc, updateDoc,  getDoc, Firestore, collection, query, onSnapshot } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class LearnService {


  pathCollection = '/users/' + sessionStorage.getItem('uid')

  constructor(private http: HttpClient, private db: Firestore) { }
  
  getListaCursos(){
    return this.http.get(`${baseUrl}/courses/get/`)
  }

  getCurso(){
    return this.http.get(`${baseUrl}/courses/`)
  }

  getUserCourseActivities(email: string){
    return this.http.get(`${baseUrl}/courses/get-courses-activities/${email}`)
  }

  sumPuntosInBack(email: string){
    return this.http.put(`${baseUrl}/users/sumar-puntos/${email}`,null)
  }

  upgradeLevel(email: string){
    return this.http.put(`${baseUrl}/users/aumentar-level/${email}`,null)
  }

  changeStateOfActivity(email: string){
    return this.http.put(`${baseUrl}/courses/actualizar-estado-actividad/${email}`,null)
  }
  changeActivity(email: string){
    return this.http.put(`${baseUrl}/courses/actualizar-actividad/${email}`,null)
  }

  upgradeCourse(email: string){
    return this.http.put(`${baseUrl}/courses/actualizar-curso/${email}`,null)
  }


  async sumPuntos() {
    const docInstance = doc(this.db, this.pathCollection)
    let puntuacionFromBd; 
    await getDoc(docInstance).then((doc) => {
      if (doc && doc.exists()) {
        const data = doc.data();
        puntuacionFromBd = data['puntuacion']
        // console.log('Antes de sumar', puntuacionFromBd);
        const updateData = {
          puntuacion: puntuacionFromBd + 10
        }
        updateDoc(docInstance, updateData).then(() => {
          // console.log('actualice la puntuacion');
          sessionStorage.removeItem('puntuacion')
          sessionStorage.setItem('puntuacion', updateData.puntuacion)
          // console.log('Despues de sumar', updateData.puntuacion);
        })
        
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

}
