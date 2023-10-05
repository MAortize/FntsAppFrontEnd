import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileViewComponent } from './components/profile-view/profile-view.component';
import { SharedModule } from '../shared/shared.module';
import { LearnModule } from '../learn/learn.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from './services/profile.service';


@NgModule({
  declarations: [
    ProfileViewComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    LearnModule,
    ReactiveFormsModule
  ],
  providers:[
    ProfileService
  ]
})
export class ProfileModule { }
