import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomepageRoutingModule } from './homepage-routing.module';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AuthService } from '../auth/services/auth.service';
import { AuthImplementationModule } from '../auth/auth-implementation.module';
import { ProfileComponent } from './components/profile/profile.component';
import { LearnComponent } from './components/learn/learn.component';
import { GoOverComponent } from './components/go-over/go-over.component';
import { ShopComponent } from './components/shop/shop.component';
import { SidebarRightComponent } from './components/sidebar-right/sidebar-right.component';
import { SharedModule } from '../shared/shared.module';




@NgModule({
  declarations: [
    HomepageComponent,
    ProfileComponent,
    LearnComponent,
    GoOverComponent,
    ShopComponent,
    SidebarRightComponent
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
