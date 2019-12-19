import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-course-recommendation',
  templateUrl: './course-recommendation.component.html',
  styleUrls: ['./course-recommendation.component.css']
})
export class CourseRecommendationComponent implements OnInit {

  // courses = [
  //     {title: 'Basics of Algorithms 1', ects: 5, language: 'en', requirements: 'none', area: 'Algorithms'},
  //     {title: 'Basics of Algorithms 2', ects: 5, language: 'en', requirements: 'BoA 1', area: 'Algorithms'},
  //     {title: 'Basics of Algorithms 3', ects: 6, language: 'en', requirements: 'BoA 1 & BoA 2', area: 'Algorithms'},
  //     {title: 'Künstliche Intelligenz', ects: 5, language: 'de', requirements: 'none', area: 'Machine Learning and Analytics'},
  //     {title: 'Machine Learning', ects: 5, language: 'en', requirements: 'none', area: 'Machine Learning and Analytics'},
  //     {title: 'Advaned Machine Learning', ects: 6, language: 'en', requirements: 'Machine Learning', area: 'Machine Learning and Analytics'},
  // ];

  public courses;

  totalCredits: number = 0;

  coursesActive = [];

  creditsByAreas = [];
  coursesCounter = 0;

  constructor(private messageService: MessageService, private backendService: BackendService) {
    this.messageService.onCoursesReceived().subscribe(courses => {
      this.courses = courses;
      for (let course of courses) {
        if (course.area === "") {
          course.area = "No specified area";
        }
      }
      this.courses.sort(
        function(a,b) {
          return a.ects - b.ects;
        }
      );
    });
    // this.messageService.onCoursesReceived().subscribe(() => console.log("Test"));
  }
  
  ngOnInit() {
  }

  onCourseClicked(course: any) {
    if (this.coursesActive.includes(course)) {
      this.coursesActive.splice(this.coursesActive.indexOf(course), 1);
      this.totalCredits = this.totalCredits - course.ects;
      this.onUpdateCreditsByArea(course, false);
    } else {
      this.coursesActive.push(course);
      this.totalCredits = this.totalCredits + course.ects;
      this.onUpdateCreditsByArea(course, true);
    }
  }

  onUpdateCreditsByArea(course: any, add: boolean) {

    if (this.creditsByAreas.length === 0) {
      this.creditsByAreas.push({area: course.area, credits: course.ects});
      this.coursesCounter = 1;
      return;
    } else {
      for (let creditByArea of this.creditsByAreas) {
        if (creditByArea.area === course.area) {
          if (add) {
            creditByArea.credits = creditByArea.credits + course.ects;
            this.coursesCounter = this.coursesCounter + 1;
            return;
          } else {
            creditByArea.credits = creditByArea.credits - course.ects;
            if (creditByArea.credits === 0) {
              this.creditsByAreas.splice(this.creditsByAreas.indexOf(creditByArea), 1);
            }
            this.coursesCounter = this.coursesCounter - 1;
            return;
          }
        }
      }
    }
    this.creditsByAreas.push({area: course.area, credits: course.ects});
    this.coursesCounter = this.coursesCounter + 1;
    return;
  }
}
