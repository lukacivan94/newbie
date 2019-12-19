import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title: string = "newbie";

  constructor(private _location: Location, private messageService: MessageService) {
    this.messageService.onTitleChanged().subscribe(
      (title: string) => {
        this.title = title;
      }

      );

    // let test = [{area: "ALG"}, {area:"MLI"}];
    // test.find(function(element){
    //   return element.area === "ALG" || element.area === "MLI";
    // });
   }

  ngOnInit() {
  }

  onRouteBack() {
    if (this._location.isCurrentPathEqualTo("/home")) {
      return;
    } else {
      if (this._location.isCurrentPathEqualTo("/recommendation") || this._location.isCurrentPathEqualTo("/findmentor") || this._location.isCurrentPathEqualTo("/becomementor") || this._location.isCurrentPathEqualTo("/events")) {
        this.messageService.sendOnTitleChanged("newbie");
      }
      if (this._location.isCurrentPathEqualTo("/recommendation/results")) {
        this.messageService.sendOnTitleChanged("Quick recommendation");
      }
      if (this._location.isCurrentPathEqualTo("/findmentor/recommendation")) {
        this.messageService.sendOnTitleChanged("Find your mentor");
      }
      if (this._location.isCurrentPathEqualTo("/findmentor/recommendation/meet") || this._location.isCurrentPathEqualTo("/findmentor/recommendation/contact")) {
        this.messageService.sendOnTitleChanged("Mentor recommendation");
      }
      if (this._location.isCurrentPathEqualTo("/becomementor/successful")) {
        this.messageService.sendOnTitleChanged("Become a mentor")
      }
      if (this._location.isCurrentPathEqualTo("events/eventinfo")) {
        this.messageService.sendOnTitleChanged("Upcoming events")
      }

      this._location.back();
    }
  }

  onRoute(title: string) {
    this.messageService.sendOnTitleChanged(title);
  }
}
