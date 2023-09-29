import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { LearnService } from '../../../learn/services/learn.service';


@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.css']
})
export class AchievementsComponent implements OnInit, AfterViewInit {

  @ViewChild('listAchievements') listAchievementsRef: ElementRef


  emailUserInSesssion: string;
  userCourseActivity: any = []

  activity_id = 0

  logroSuccess: boolean = true;


  constructor(private serviceLearn: LearnService) { }

  ngOnInit(): void {
    

  }

  ngAfterViewInit(): void {
    
    this.emailUserInSesssion = sessionStorage.getItem('email')

    this.serviceLearn.getUserCourseActivities(this.emailUserInSesssion).subscribe((data) => {
      this.userCourseActivity = data
      const activity_id = this.userCourseActivity[0].activity_id
      const ulElements = this.listAchievementsRef.nativeElement as HTMLUListElement;
      const liElements = ulElements.querySelectorAll('li');
      
      


      liElements.forEach((li: HTMLLIElement, index: number) => {
        if (index+1<activity_id) {          
          this.logroSuccess = false
          li.classList.add('active')
          
        }else{
          this.logroSuccess = true
          li.classList.add('disabled')
          
          
        }
      })
    })
  }
}
