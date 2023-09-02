import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';


import { AchievementsComponent } from './components/achievements/achievements.component';
import { PruebaComponent } from './components/prueba/prueba.component';
import { RigthMenuComponent } from './components/rigth-menu/rigth-menu.component';
import { RankingModule } from '../ranking/ranking.module';




@NgModule({
  declarations: [
    AchievementsComponent,
    PruebaComponent,
    RigthMenuComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    provideFirestore(() => getFirestore()),
    RankingModule
  ],
  exports: [
    AchievementsComponent,
    RigthMenuComponent
  ]
})
export class SharedModule { }
