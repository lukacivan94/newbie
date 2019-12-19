import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private messageService: MessageService) { }

  ngOnInit() {
  }

  onRoute(title: string) {
    this.messageService.sendOnTitleChanged(title);
  }

}
