import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {


  constructor() { }


  private onTitleChanged$ = new Subject<string>();

  sendOnTitleChanged(title: string) {
    this.onTitleChanged$.next(title);
  }

  onTitleChanged() {
    return this.onTitleChanged$.asObservable();
  }


  private onUserLoggedIn$ = new BehaviorSubject<boolean>(false);

  sendOnUserLoggedIn(loggedIn: boolean) {
    this.onUserLoggedIn$.next(loggedIn);
  }

  onUserLoggedIn() {
    return this.onUserLoggedIn$.asObservable();
  }

  private onCoursesReceived$ = new BehaviorSubject<any[]>([]);

  public sendOnCoursesReceived(courses: any[]) {
    this.onCoursesReceived$.next(courses);
  }

  public onCoursesReceived(): Observable<any[]> {
    return this.onCoursesReceived$.asObservable();
  }


  private onMentorsReceived$ = new BehaviorSubject<any[]>([]);

  public sendOnMentorsReceived(mentors: any[]) {
    this.onMentorsReceived$.next(mentors);
  }

  public onMentorsReceived(): Observable<any[]> {
    return this.onMentorsReceived$.asObservable();
  }


  private onClickedEventDetail$ = new BehaviorSubject<any>({});

  public sendOnClickedEventDetail(event: any) {
    this.onClickedEventDetail$.next(event);
  }

  public onClickedEventDetail(): Observable<any> {
    return this.onClickedEventDetail$.asObservable();
  }

  private onClickedMeetMentor$ = new BehaviorSubject<any>({});

  public sendOnClickedMeetMentor(mentor: any) {
    this.onClickedMeetMentor$.next(mentor);
  }

  public onClickedMeetMentor(): Observable<any> {
    return this.onClickedMeetMentor$.asObservable();
  }

  private onMentorLoggedIn$ = new BehaviorSubject<any>({});

  public sendOnMentorLoggedIn(mentor: any) {
    this.onMentorLoggedIn$.next(mentor);
  }

  public onMentorLoggedIn(): Observable<any> {
    return this.onMentorLoggedIn$.asObservable();
  }

  private onEditMentor$ = new BehaviorSubject<any>({});

  public sendOnEditMentor(mentor: any) {
    this.onEditMentor$.next(mentor);
  }

  public onEditMentor(): Observable<any> {
    return this.onEditMentor$.asObservable();
  }
}
