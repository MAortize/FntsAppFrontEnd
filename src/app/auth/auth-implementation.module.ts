import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-implementation-routing.module';
import { AuthCardComponent } from './components/auth-card/auth-card.component';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { firebaseConfig } from 'src/environments/environment';
import { AuthService } from './services/auth.service';
import { AuthModule } from '@angular/fire/auth';








@NgModule({
  declarations: [
    AuthCardComponent,
  ],
  imports: [
    provideFirebaseApp(()=>initializeApp(firebaseConfig)),
    CommonModule,
    AuthRoutingModule,
    AuthModule,
    FormsModule,
    
  ],
  exports: [
    AuthCardComponent
  ],
  providers: [
    AuthService,
    
  ]

})
export class AuthImplementationModule { }
