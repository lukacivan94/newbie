import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { BackendService } from '../backend.service';
import { NgForm } from '@angular/forms';
import { MessageService as NgMessageService} from 'primeng/api';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';
import Keyboard from 'simple-keyboard';

@Component({
  selector: 'app-sign-in',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './sign-in.component.html',
  styleUrls: [
    '../../../node_modules/simple-keyboard/build/css/index.css',
    './sign-in.component.css'
  ]
})
export class SignInComponent implements OnInit {

  @ViewChild('f') signinForm: NgForm;
  selectedEmail = ['@mytum.de'];

  email = "";
  placeholderEmail = "Please enter your email address";
  keyboardEmailSignIn: Keyboard;

  pin = "";
  secretPin = "";
  placeholderPin = "Please enter a 4 digits PIN";
  keyboardPinSignIn: Keyboard;

  constructor(private backendService: BackendService, private ngMessageService: NgMessageService, private messageService: MessageService, private router: Router) {
    this.messageService.onUserLoggedIn().subscribe(
      loggedIn => {
        if (loggedIn === true) {
          this.router.navigateByUrl("/signin/mentor");
        }
      });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.keyboardEmailSignIn = new Keyboard(".email-keyboard-signin", {
      onChange: input => this.onChangeEmailSignIn(input),
      onKeyPress: button => this.onKeyPressEmailSignIn(button),
      theme: "simple-keyboard hg-theme-default hg-layout-default",
      layout: {
        default: [
        "0 1 2 3 4 5 6 7 8 9 {bksp}",
        "q w e r t y u i o p",
        "a s d f g h j k l",
        "z x c v b n m ."
        ]
      },
      display: {
        "{bksp}": "⌫",
        "{enter}": "enter ↵"
      }
    });

    this.keyboardPinSignIn = new Keyboard(".pin-keyboard-signin", {
      onChange: input => this.onChangePinSignIn(input),
      onKeyPress: button => this.onKeyPressPinSignIn(button),
      theme: "simple-keyboard hg-theme-default hg-layout-default",
      inputPattern: /^[0-9]{1,4}$/,
      layout: {
        default: [
        "1 2 3",
        "4 5 6",
        "7 8 9",
        "{bksp} 0"
        ]
      },
      display: {
        "{bksp}": "⌫",
        "{enter}": "enter ↵"
      }
    });
  }

  onChangeEmailSignIn(input: string) {
    if (input === "") {
      this.placeholderEmail= "Please enter your email address";
    } else {
      this.placeholderEmail = "";
    }
    this.email = input;
  }

  onKeyPressEmailSignIn(button: string) {
    if (button === "{enter}") {
    }
  }

  onChangePinSignIn(input: string) {
    if (input === "") {
      this.placeholderPin = "Please enter a 4 digits PIN";
    } else {
      this.placeholderPin = "";
    }
    this.secretPin = input;
    this.pin = input.length === 1 ? "*" : input.length === 2 ? "**" : input.length === 3 ? "***" : input.length === 4 ? "****" : "";
  }

  onKeyPressPinSignIn(button: string) {
    if (button === "{enter}") {
    }
  }


  onEmailChange(email: string) {
    if (this.selectedEmail.length !== 0) {
      this.selectedEmail = [];
    }
    this.selectedEmail.push(email);
  }

  onLogIn() {
    const data = {
      email: this.email + this.selectedEmail,
      password: this.secretPin
    };

    console.log(data);

    this.backendService.post("mentors/login", data).then(
      (res: any) => {
        this.ngMessageService.add({severity:'success', summary: 'Log in successful', detail:'You were logged in successful.', life: 6000});
        this.messageService.sendOnMentorLoggedIn(res.mentor);
        this.messageService.sendOnUserLoggedIn(true);
        this.router.navigateByUrl("/signin/mentor");
      }
    )
    .catch(
      (error: any) => {
        this.ngMessageService.add({severity:'error', summary: 'Internal Server Error', detail:'Sorry, there was an error while logging you in. Please try again later.', life: 6000});
      }
    );
  }
}
