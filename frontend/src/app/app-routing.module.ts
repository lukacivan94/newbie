import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { CourseRecommendationComponent } from './course-recommendation/course-recommendation.component';
import { FindMentorComponent } from './find-mentor/find-mentor.component';
import { BecomeMentorComponent } from './become-mentor/become-mentor.component';
import { EventsComponent } from './events/events.component';
import { MentorRecommendationComponent } from './mentor-recommendation/mentor-recommendation.component';
import { MeetComponent } from './meet/meet.component';
import { QuickRecommendationComponent } from './quick-recommendation/quick-recommendation.component';
import { SignUpSuccessfulComponent } from './sign-up-successful/sign-up-successful.component';
import { EventInfoComponent } from './event-info/event-info.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { MentorPageComponent } from './mentor-page/mentor-page.component';
import { CoverpageComponent } from './coverpage/coverpage.component';
import { ExternelLinkPageComponent } from './externel-link-page/externel-link-page.component';
import { JoinSuccessfulComponent } from './join-successful/join-successful.component';
// import * as FileSaver from 'file-saver';


const appRoutes: Routes = [
  {path: 'home', component: HomepageComponent},
  {path: 'recommendation', component: QuickRecommendationComponent},
  {path: 'findmentor', component: FindMentorComponent},
  {path: 'becomementor', component: BecomeMentorComponent},
  {path: 'events', component: EventsComponent},
  {path: 'recommendation/results', component: CourseRecommendationComponent},
  {path: 'findmentor/recommendation', component: MentorRecommendationComponent},
  {path: 'findmentor/recommendation/meet', component: MeetComponent},
  {path: 'becomementor/successful', component: SignUpSuccessfulComponent},
  {path: 'events/eventinfo', component: EventInfoComponent},
  {path: 'signin', component: SignInComponent},
  {path: 'signin/mentor', component: MentorPageComponent},
  {path: 'coverpage', component: CoverpageComponent},
  {path: 'externallinkpage', component: ExternelLinkPageComponent},
  {path: '**', component: CoverpageComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
