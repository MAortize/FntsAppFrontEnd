import { Component, OnInit } from '@angular/core';

import { DocumentData } from '@angular/fire/firestore';
import { AchievementService } from '../../services/achievement.service';

@Component({
  selector: 'app-rigth-menu',
  templateUrl: './rigth-menu.component.html',
  styleUrls: ['./rigth-menu.component.css']
})

export class RigthMenuComponent implements OnInit {
  
  urlImgUserInSession: string|null;
  usernameInSession: string|null;


  
  constructor(protected service: AchievementService) {
    this.urlImgUserInSession = sessionStorage.getItem('urlPic')
    this.usernameInSession = sessionStorage.getItem('username')
  }
  
  ngOnInit(): void {
    
  }

  prueba(){
    
    
    
  }


  




}
