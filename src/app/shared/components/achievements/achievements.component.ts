import { AfterContentInit, AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { LearnService } from '../../../learn/services/learn.service';


@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.css']
})
export class AchievementsComponent implements OnInit, AfterViewInit, AfterContentInit {

  @ViewChild('listAchievements') listAchievementsRef: ElementRef


  emailUserInSesssion: string;
  userCourseActivity: any = []

  activity_id = 0

  logroSuccess: boolean = true;


  constructor() { }

  ngOnInit(): void { }

  ngAfterContentInit(): void {
  }


  ngAfterViewInit(): void {
    this.emailUserInSesssion = sessionStorage.getItem('email');
    setTimeout(()=>{
      this.fillAchievementsInPage()
    },0)
  }


  fillAchievementsInPage() {
    if (localStorage.getItem('dataUserCourseActivities')) {
      this.getDataForFillAchievements()
    }
    setTimeout(() => {
      this.getDataForFillAchievements()
    }, 5600)

  }


  getDataForFillAchievements() {
    const data = localStorage.getItem('dataUserCourseActivities');

    this.userCourseActivity = JSON.parse(data);


    const activity_id = this.userCourseActivity[0].activity_id
    const ulElements = this.listAchievementsRef.nativeElement as HTMLUListElement;
    const liElements = ulElements.querySelectorAll('li');

    liElements.forEach((li: HTMLLIElement, index: number) => {
      if (index + 1 < activity_id) {
        this.logroSuccess = false
        li.classList.add('active')
      } else {
        this.logroSuccess = true
        li.classList.add('disabled')
      }
    })
  }
}
