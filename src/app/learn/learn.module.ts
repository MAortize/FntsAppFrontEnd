import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearnRoutingModule } from './learn-routing.module';
import { LearnViewComponent } from './components/learn-view/learn-view.component';


@NgModule({
  declarations: [
    LearnViewComponent
  ],
  imports: [
    CommonModule,
    LearnRoutingModule
  ]
})
export class LearnModule { }
