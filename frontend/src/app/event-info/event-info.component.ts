import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { BackendService } from '../backend.service';
import { MessageService as NgMessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.css']
})
export class EventInfoComponent implements OnInit {

  event: any;

  constructor(private messageService: MessageService,
              private backendService: BackendService,
              private router: Router, private ngMessageService: NgMessageService) {
    this.messageService.onClickedEventDetail().subscribe((event: any) => this.event = event);
   }

  ngOnInit() {
  }

  onRoute(title: string) {
    this.messageService.sendOnTitleChanged(title);
  }

  onDecreaseEventCounter() {
    this.backendService.patch(`events/${this.event._id}`, {counter: this.event.counter}).then(
      () => {
        this.router.navigateByUrl('/events');
      });
  }

  onGoBackToUpcomingEvents() {
    this.router.navigateByUrl('/');
  }


}
