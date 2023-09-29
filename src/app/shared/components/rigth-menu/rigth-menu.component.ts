import { Component, OnInit } from '@angular/core';

import { DocumentData } from '@angular/fire/firestore';


@Component({
  selector: 'app-rigth-menu',
  templateUrl: './rigth-menu.component.html',
  styleUrls: ['./rigth-menu.component.css']
})

export class RigthMenuComponent implements OnInit {
  
  urlImgUserInSession: string|null;
  usernameInSession: string|null;
  scoreUserInSesssion: string|null

  miEstilo: any = {
    'background-color': 'transparent',
    'color': 'white',
  };

  
  constructor() {
    this.urlImgUserInSession = sessionStorage.getItem('urlPic')
    this.usernameInSession = sessionStorage.getItem('username')
    this.scoreUserInSesssion = sessionStorage.getItem('puntuacion')
  }
  
  ngOnInit(): void { }



  




}
