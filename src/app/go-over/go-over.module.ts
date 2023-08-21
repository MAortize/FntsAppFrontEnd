import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoOverRoutingModule } from './go-over-routing.module';
import { GoOverViewComponent } from './components/go-over-view/go-over-view.component';


@NgModule({
  declarations: [
    GoOverViewComponent
  ],
  imports: [
    CommonModule,
    GoOverRoutingModule
  ]
})
export class GoOverModule { }
