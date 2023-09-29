import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearnRoutingModule } from './learn-routing.module';
import { LearnViewComponent } from './components/learn-view/learn-view.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LearnViewComponent

  ],
  imports: [
    CommonModule,
    LearnRoutingModule,
    DragDropModule,
    FormsModule
  ],
  exports: [
 
  ]
})
export class LearnModule { }
