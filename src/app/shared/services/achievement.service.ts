import { Injectable } from '@angular/core';

import { Firestore, collection, addDoc, setDoc, doc, updateDoc, collectionData } from '@angular/fire/firestore';

import { ModeloPrueba } from '../models/prueba.model';






@Injectable({
  providedIn: 'root'
})


export class AchievementService {

  pathCollection = '/Users/Username1'
  
  
  // refCollection: AngularFirestoreCollection<ModeloPrueba> | any
  

  constructor(protected db: Firestore) { 
    // this.refCollection =  db.doc(this.pathCollection)
   }  
  
   
   guardarAlgo(){
      const docInstance = doc(this.db, this.pathCollection)
      const updateData = {
        Puntuacion: 50
      }
      
      updateDoc(docInstance, updateData)
      .then(() => {
        console.log('Actulice la puntuacion con', updateData.Puntuacion);        
      })
      .catch((error) => {
        console.log('Got a error', error);
        
      })
       
   }

   getData(){

   }

}
