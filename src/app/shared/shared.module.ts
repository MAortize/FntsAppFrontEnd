import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { EyesComponent } from './components/eyes/eyes.component';


@NgModule({
  declarations: [
    EyesComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [
    EyesComponent
  ]
})
export class SharedModule { }
