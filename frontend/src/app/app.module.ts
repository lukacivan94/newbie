import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { QuickRecommendationComponent } from './quick-recommendation/quick-recommendation.component';
import { CourseRecommendationComponent } from './course-recommendation/course-recommendation.component';
import { FindMentorComponent } from './find-mentor/find-mentor.component';
import { MentorRecommendationComponent } from './mentor-recommendation/mentor-recommendation.component';
import { BecomeMentorComponent } from './become-mentor/become-mentor.component';
import { SignUpSuccessfulComponent } from './sign-up-successful/sign-up-successful.component';
import { EventsComponent } from './events/events.component';
import { JoinSuccessfulComponent } from './join-successful/join-successful.component';
import { EventInfoComponent } from './event-info/event-info.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { MentorPageComponent } from './mentor-page/mentor-page.component';
import { MeetComponent } from './meet/meet.component';
import { AppRoutingModule } from './app-routing.module';
import { CoverpageComponent } from './coverpage/coverpage.component';
import { MultiSelectModule } from 'primeng/multiselect';
import {DropdownModule} from 'primeng/dropdown';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {SpinnerModule} from 'primeng/spinner';
import {CalendarModule} from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import {ToastModule} from 'primeng/toast';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageService } from './message.service';
import { MessageService as ngMessageService } from 'primeng/api';
import { BackendService } from './backend.service';
import { HttpClientModule } from '@angular/common/http';
import { ExternelLinkPageComponent } from './externel-link-page/externel-link-page.component';
import {AccordionModule} from 'primeng/accordion';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    QuickRecommendationComponent,
    CourseRecommendationComponent,
    FindMentorComponent,
    MentorRecommendationComponent,
    BecomeMentorComponent,
    SignUpSuccessfulComponent,
    EventsComponent,
    JoinSuccessfulComponent,
    EventInfoComponent,
    SignInComponent,
    MentorPageComponent,
    MeetComponent,
    CoverpageComponent,
    ExternelLinkPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    CheckboxModule,
    FormsModule,
    AppRoutingModule,
    MultiSelectModule,
    DropdownModule,
    ToggleButtonModule,
    SpinnerModule,
    ToastModule,
    CalendarModule,
    HttpClientModule,
    AccordionModule
  ],
  providers: [MessageService, BackendService, ngMessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
