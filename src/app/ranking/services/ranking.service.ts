import { Injectable } from '@angular/core';


import { DocumentData, Firestore, collection, getDocs, onSnapshot, orderBy, query } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class RankingService {

  listaDeUsuarios: DocumentData[] = []
  listaDeUsuariosAdded: DocumentData[] = []



  constructor(protected db: Firestore) {
    // this.getDataFromFirestore()
  }




  async getDataInitial() {
    const q = query(collection(this.db, 'users'), orderBy('puntuacion', 'desc'))
    const allDocs = await getDocs(q)
    return allDocs
  }


  getDataActFromFirestore(list:DocumentData[]) {
    const q = query(collection(this.db, 'users'), orderBy('puntuacion', 'desc'))
    const allDocsListen = onSnapshot(q, (doc) => {
      doc.docChanges().forEach((change) => {
        if (change.type === "modified" && list.length > 0) {
          let index = 0;
          list.forEach((users) => {
            if (users['uid'] === change.doc.data()['uid']) {
              index = list.indexOf(users)
              list[index] = change.doc.data()
              list.sort((a, b) => {
                if (b['puntuacion'] > a['puntuacion']) {
                  return 1
                }
                if (b['puntuacion'] < a['puntuacion']) {
                  return -1
                }
                return 0
              })
            }
          })
        }
        if (change.type === "removed" && list.length > 0) {
          let index = 0;
          list.forEach((users) => {
            if (users['uid'] === change.doc.data()['uid']) {
              index = list.indexOf(users)
              list.splice(index, 1)
            }
          })
        }
      })
    })
    return list
  }


}
