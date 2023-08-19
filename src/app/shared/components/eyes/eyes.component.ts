import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eyes',
  templateUrl: './eyes.component.html',
  styleUrls: ['./eyes.component.css']
})
export class EyesComponent implements OnInit {
  balls = document.getElementsByClassName("ball") as HTMLCollectionOf<HTMLElement>
  
  
  ngOnInit(): void {
    document.onmousemove = (m) => {
      var x = m.clientX * 100 / window.innerWidth + "%";
      var y = m.clientY * 100 / window.innerHeight + "%";
      for (let index = 0; index < 2; index++) {
        this.balls[index].style.left = x
        this.balls[index].style.top = y
        this.balls[index].style.transform = "translate(-"+x+",-"+y+")" 
      }
    }
  }

  

}
