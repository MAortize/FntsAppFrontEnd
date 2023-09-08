import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent {
  email: string = sessionStorage.getItem('email')!
  nickName: string = sessionStorage.getItem('username')!
  urlPicProfile: string = sessionStorage.getItem('urlPic')!

  changeData: boolean = true

  value: string = "Modificar datos"

  constructor(){
  }


  activarCambioData(){
    this.changeData = !this.changeData
    if (this.changeData==false) {
      this.value = "Modificando datos"
    }else{
      this.value = "Modificar  datos"
    }
  }


}
