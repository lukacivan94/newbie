import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-mentor-recommendation',
  templateUrl: './mentor-recommendation.component.html',
  styleUrls: ['./mentor-recommendation.component.css']
})
export class MentorRecommendationComponent implements OnInit {


  // mentors = [
  //   {imagePath: 'assets/student-mentor-4_3.png', name: 'Max', contact: 'max@mytum.de', meetingTime: new Date(), satisfactionRate: 10, accordanceLevel: 95},
  //   {imagePath: 'assets/student-newbie-4_3.png', name: 'Susi', contact: 'susi@mytum.de', meetingTime: new Date(), satisfactionRate: 25, accordanceLevel: 70},
  //   {imagePath: 'assets/student-mentor-4_3.png', name: 'Dave', contact: 'dave@mytum.de', meetingTime: new Date(), satisfactionRate: 30, accordanceLevel: 60},
  // ]

  mentors = [];

  constructor(private messageService: MessageService) {
    this.messageService.onMentorsReceived().subscribe((mentors: any) => this.mentors = mentors);
  }

  ngOnInit() {
  }

  getSatisfactionColor(mentor: any) {
    if (mentor.satisfactionRate < 20) {
      return 'red';
    }
    if (mentor.satisfactionRate < 70) {
      return 'darkorange';
    } else {
      return 'limegreen';
    }
  }

  getAccordanceColor(mentor: any) {
    if (mentor.accordanceLevel < 20) {
      return 'red';
    }
    if (mentor.accordanceLevel < 70) {
      return 'darkorange';
    } else {
      return 'limegreen';
    }
  }

  onMeet (mentor: any) {
    this.messageService.sendOnTitleChanged('Meet mentor');
    this.messageService.sendOnClickedMeetMentor(mentor);
  }
}
