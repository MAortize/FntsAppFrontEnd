import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomepageRoutingModule } from './homepage-routing.module';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AuthService } from '../auth/services/auth.service';
import { AuthImplementationModule } from '../auth/auth-implementation.module';
import { SharedModule } from '../shared/shared.module';




@NgModule({
  declarations: [
    HomepageComponent
  ],
  imports: [
    CommonModule,
    HomepageRoutingModule,
    AuthImplementationModule,
    SharedModule
  ],
  providers: [
    AuthService
  ]
})
export class HomepageModule { }
