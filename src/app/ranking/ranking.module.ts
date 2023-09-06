import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RankingRoutingModule } from './ranking-routing.module';
import { RankingViewComponent } from './components/ranking-view/ranking-view.component';


@NgModule({
  declarations: [
    RankingViewComponent
  ],
  imports: [
    CommonModule,
    RankingRoutingModule
  ],
  exports: [
    RankingViewComponent
  ]
})
export class RankingModule { }
