import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BackendService } from '../backend.service';
import { MessageService as NgMessageService } from 'primeng/api';
import { MessageService } from '../message.service';
import Keyboard from 'simple-keyboard';

@Component({
  selector: 'app-meet',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './meet.component.html',
  styleUrls: [
    '../../../node_modules/simple-keyboard/build/css/index.css',
    './meet.component.css'
  ]
})
export class MeetComponent implements OnInit {

  selectedEmail = ['@mytum.de'];
  mentor;

  name = "";
  placeholderName = "Please enter your name";
  keyboardNameMeet: Keyboard;

  email = "";
  placeholderEmail = "Please enter your email address";
  keyboardEmailMeet: Keyboard;

  constructor(private backendService: BackendService, private messageService: MessageService, private ngMessageService: NgMessageService) {
    this.messageService.onClickedMeetMentor().subscribe(mentor => this.mentor = mentor);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.keyboardNameMeet = new Keyboard(".simple-keyboard-meet", {
      onChange: input => this.onChangeMeet(input),
      onKeyPress: button => this.onKeyPressMeet(button),
      theme: "simple-keyboard hg-theme-default hg-layout-default",
      layout: {
        default: [
        "q w e r t y u i o p {bksp}",
        "a s d f g h j k l {enter}",
        "z x c v b n m"
        ]
      },
      display: {
        "{bksp}": "⌫",
        "{enter}": "enter ↵"
      }
    });

    this.keyboardEmailMeet = new Keyboard(".email-keyboard-meet", {
      onChange: input => this.onChangeEmailMeet(input),
      onKeyPress: button => this.onKeyPressEmailMeet(button),
      theme: "simple-keyboard hg-theme-default hg-layout-default",
      layout: {
        default: [
        "0 1 2 3 4 5 6 7 8 9",
        "q w e r t y u i o p {bksp}",
        "a s d f g h j k l {enter}",
        "z x c v b n m ."
        ]
      },
      display: {
        "{bksp}": "⌫",
        "{enter}": "enter ↵"
      }
    });
  }

  onChangeMeet(input: string) {
    if (input === "") {
      this.placeholderName = "Please enter your name";
    } else {
      this.placeholderName = "";
    }
    this.name = input.charAt(0).toUpperCase() + input.slice(1);
  }

  onKeyPressMeet(button: string) {
    if (button === "{enter}") {
    }
  }

  onChangeEmailMeet(input: string) {
    if (input === "") {
      this.placeholderEmail= "Please enter your email address";
    } else {
      this.placeholderEmail = "";
    }
    this.email = input;
  }

  onKeyPressEmailMeet(button: string) {
    if (button === "{enter}") {
    }
  }

  onEmailChange(email: string) {
    if (this.selectedEmail.length !== 0) {
      this.selectedEmail = [];
    }
    this.selectedEmail.push(email);
  }



  onMeet() {
    let names = this.mentor.newbies.names;
    names.push(this.name);
    let emails = this.mentor.newbies.emails;
    emails.push(this.email + this.selectedEmail);
    const data = {
      newbies : {
        names,
        emails
      }
    };

    console.log(data);

    this.backendService.patch(`mentors/${this.mentor._id}`, data).then(
      (res: any) => {
        this.ngMessageService.add({severity:'success', summary: 'Success', detail:`Your mentor will get notified about meeting you. You will meet him/her at the display.`, life: 6000});
      }
    )
    .catch(
      (error: any) => {
        this.ngMessageService.add({severity:'error', summary: 'Internal Server Error', detail:'Sorry, there was an error while matching you and your mentor. Please try again later.', life: 6000});
      }
    )
  }
}
