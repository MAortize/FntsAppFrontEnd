import { Injectable } from '@angular/core';

import { Firestore, collection, addDoc, setDoc, doc, updateDoc, collectionData, getDoc } from '@angular/fire/firestore';

import { ModeloPrueba } from '../models/prueba.model';






@Injectable({
  providedIn: 'root'
})


export class AchievementService {

  pathCollection = '/users/' + sessionStorage.getItem('uid')



  constructor(protected db: Firestore) {  }


  //TODO: HACER EL METODO LIBRE DE PUNTOS ES DECIR, LA PUNTUACION QUE LE LLEGUE ES LA QUE DEBE SUMAR, SE DEBE PARAMETRIZAR EL METODO PARA QUE RECIBA LAS PUNTUACIONES NECESARIAS
  guardarAlgo() {
    const docInstance = doc(this.db, this.pathCollection)
    getDoc(docInstance).then((doc) => {
      if (doc && doc.exists()) {
        const data = doc.data();
        let puntuacionFromBd = data['puntuacion']
        console.log('Antes de sumar', puntuacionFromBd);
        const updateData = {
          puntuacion: puntuacionFromBd + 10
        }
        updateDoc(docInstance, updateData).then(() => {
          console.log('actualice la puntuacion');
        })
        console.log('Despues de sumar', puntuacionFromBd);
      }
    }).catch((error) => {
      console.log(error);
    })
  }

}
