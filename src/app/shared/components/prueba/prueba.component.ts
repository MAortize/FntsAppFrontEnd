import { Component } from '@angular/core';
import { AchievementService } from '../../services/achievement.service';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent {

  constructor(private acService :AchievementService){}
  

  actualizarTabla(){
    this.acService.guardarAlgo()
  }

}
