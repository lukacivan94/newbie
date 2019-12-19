import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { MessageService as NgMessageService } from 'primeng/api';
import { BackendService } from '../backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mentor-page',
  templateUrl: './mentor-page.component.html',
  styleUrls: ['./mentor-page.component.css']
})
export class MentorPageComponent implements OnInit {

  mentor;
  changePin = false;

  constructor(private messageService: MessageService, private ngMessageService: NgMessageService, private backendService: BackendService, private router: Router) {
    this.messageService.onMentorLoggedIn().subscribe(mentor => this.mentor = mentor);
    this.messageService.onUserLoggedIn().subscribe(
      loggedIn => {
        if (loggedIn === false) {
          this.router.navigateByUrl("/signin");
          this.messageService.sendOnTitleChanged("Sign in");
        }
      }
    )
  }

  ngOnInit() {
  }

  logout() {
    this.messageService.sendOnTitleChanged('newbie');
    this.messageService.sendOnUserLoggedIn(false);
    this.ngMessageService.add({severity:'success', summary: 'Log out successful', detail:`Log in again to change your personal data or see if new newbies want to meet you.`, life: 6000});
  }

  onEdit() {
    // this.messageService.sendOnEditMentor(this.mentor);
    this.router.navigateByUrl("/becomementor");
  }

  onSendReminders() {
    // debugger;
    console.log(this.mentor);
    let contacts = '';

    for (const email of this.mentor.newbies.emails) {
      contacts = contacts + email + ", ";
    }

    const data = {
      meeting_time: this.mentor.meeting_time,
      name: this.mentor.name,
      email: this.mentor.email,
      contacts
    }

    console.log(data);

    this.backendService.post('mentors/sendReminder', data).then(
      (res: any) => {
        this.ngMessageService.add({severity:'success', summary: 'Success', detail:`Your reminder(s) were sent. You will meet your newbie(s) at the public display on ${this.mentor.meeting_time}.`, life: 6000});
      }
    )
    .catch(
      (error: any) => {
        this.ngMessageService.add({severity:'warn', summary: 'Sorry', detail:`We weren't able to send reminder(s). Please try again later.`, life: 6000});
      }
    )
  }

  onChangePin() {
    //todo
  }
}
