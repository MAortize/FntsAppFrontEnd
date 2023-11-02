import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-implementation-routing.module';
import { AuthCardComponent } from './components/auth-card/auth-card.component';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { firebaseConfig } from 'src/environments/environment';
import { AuthService } from './services/auth.service';
import { AuthModule } from '@angular/fire/auth';
import { SharedModule } from '../shared/shared.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AuthCardComponent,
  ],
  imports: [
    provideFirebaseApp(()=>initializeApp(firebaseConfig)),
    HttpClientModule,
    CommonModule,
    AuthRoutingModule,
    AuthModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  exports: [
    AuthCardComponent
  ],
  providers: [
    AuthService
  ]

})
export class AuthImplementationModule { }
