import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';


import { AchievementsComponent } from './components/achievements/achievements.component';
import { RigthMenuComponent } from './components/rigth-menu/rigth-menu.component';
import { RankingModule } from '../ranking/ranking.module';
import { ErrorFormsHandleComponent } from './components/error-forms-handle/error-forms-handle.component';
import { LearnModule } from '../learn/learn.module';




@NgModule({
  declarations: [
    RigthMenuComponent,
    ErrorFormsHandleComponent,
    AchievementsComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    provideFirestore(() => getFirestore()),
    RankingModule,
    LearnModule
  ],
  exports: [
    RigthMenuComponent,
    ErrorFormsHandleComponent,
    AchievementsComponent
  ]
})
export class SharedModule { }
