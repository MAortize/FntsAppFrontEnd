import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';


import { AchievementsComponent } from './components/achievements/achievements.component';
import { PruebaComponent } from './components/prueba/prueba.component';
import { RigthMenuComponent } from './components/rigth-menu/rigth-menu.component';
import { RankingModule } from '../ranking/ranking.module';
import { ErrorFormsHandleComponent } from './components/error-forms-handle/error-forms-handle.component';




@NgModule({
  declarations: [
    AchievementsComponent,
    PruebaComponent,
    RigthMenuComponent,
    ErrorFormsHandleComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    provideFirestore(() => getFirestore()),
    RankingModule
  ],
  exports: [
    AchievementsComponent,
    RigthMenuComponent,
    ErrorFormsHandleComponent
  ]
})
export class SharedModule { }
