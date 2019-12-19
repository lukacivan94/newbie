import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { BackendService } from '../backend.service';
import { MessageService as NgMessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  canRequest = true;

  constructor(private messageService: MessageService,
              private backendService: BackendService,
              private router: Router,
              private ngMessageService: NgMessageService) {
    this.backendService.get('events').then(
      (res: any) => {
        this.events = res.events;
        for (let event of this.events) {
          if (event.count === null) {
            event.count = 0;
          }
        }
      }
    )
    .catch(
      (error: any) => {
        this.ngMessageService.add({severity: 'error',
         summary: 'Internal Server Error',
        detail: 'Sorry, there was an error while loading upcoming events. Please try again later.', life: 6000});
      }
    );
  }

  events = [];

  ngOnInit() {

  }

  onRoute(title: string) {
    this.messageService.sendOnTitleChanged(title);
  }

  onIncreaseEventCounter(event: any) {
    this.canRequest = false;
    this.backendService.patch(`events/${event._id}`, {counter: event.counter + 1})
    .then(
      () => {
        // this.messageService.sendOnClickedEventDetail(event);
        this.ngMessageService.add({severity: 'success',
        summary: 'Success',
        detail: 'You joined successfully.', life: 6000});
        event.counter = event.counter + 1;
        setTimeout(() => {
          this.canRequest = true;
        }, 700);
        // this.router.navigateByUrl('/events/eventinfo');
      })
    .catch(
      () => {
        this.ngMessageService.add({severity: 'error',
        summary: 'Internal Server Error',
        detail: 'Sorry, there was an error while joining the event. Please try again later.', life: 6000});
        setTimeout(() => {
          this.canRequest = true;
        }, 700);
      }
    );
  }

  onDecreaseEventCounter(event: any) {
    if (event.counter === 0) {
      return;
    }
    this.canRequest = false;
    this.backendService.patch(`events/${event._id}`, {counter: event.counter - 1})
    .then(
      () => {
        // this.messageService.sendOnClickedEventDetail(event);
        this.ngMessageService.add({severity: 'success',
        summary: 'Success',
        detail: 'You left successfully.', life: 6000});
        event.counter = event.counter -1;
        setTimeout(() => {
          this.canRequest = true;
        }, 700);
        // this.router.navigateByUrl('/events/eventinfo');
      })
    .catch(
      () => {
        this.ngMessageService.add({severity: 'error',
        summary: 'Internal Server Error',
        detail: 'Sorry, there was an error while joining the event. Please try again later.', life: 6000});
        setTimeout(() => {
          this.canRequest = true;
        }, 700);
      }
    )
  }
}
