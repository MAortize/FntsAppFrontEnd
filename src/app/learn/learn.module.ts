import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearnRoutingModule } from './learn-routing.module';
import { LearnViewComponent } from './components/learn-view/learn-view.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { LearnService } from './services/learn.service';



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
 
  ],
  providers:[
    LearnService
  ]
})
export class LearnModule { }
