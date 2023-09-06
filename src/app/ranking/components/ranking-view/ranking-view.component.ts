import { Component, OnDestroy, OnInit } from '@angular/core';
import { RankingService } from '../../services/ranking.service';
import { DocumentData } from '@angular/fire/firestore';

@Component({
  selector: 'app-ranking-view',
  templateUrl: './ranking-view.component.html',
  styleUrls: ['./ranking-view.component.css']
})
export class RankingViewComponent implements OnInit {

  listaDeUsuarios: DocumentData[] = []


  constructor(protected rankingService: RankingService) {
    this.listDataFromFirestoreSnaptshot()

  }

  ngOnInit(): void {
    // this.listaDeUsuarios = this.rankingService.listaDeUsuarios
  }

  listDataFromFirestoreSnaptshot() {
    if (this.listaDeUsuarios.length == 0) {
      this.rankingService.getDataInitial().then((docs) => {
        docs.forEach((items) => {
          this.listaDeUsuarios.push(items.data())
        })
      })
    }
    this.rankingService.getDataActFromFirestore(this.listaDeUsuarios)
  }
}



