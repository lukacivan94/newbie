import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private BASE_URL: string = "http://localhost:3000/";

  constructor(private httpClient: HttpClient, private messageService: MessageService) { }

  public get(url: string) {
    return this.httpClient.get(this.BASE_URL + url).toPromise();
  }

  public post(url: string, data: any) {
    return this.httpClient.post(this.BASE_URL + url, data).toPromise();
  }

  public patch(url: string, data: any) {
    return this.httpClient.patch(this.BASE_URL + url, data).toPromise();
  }
}
