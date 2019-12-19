import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coverpage',
  templateUrl: './coverpage.component.html',
  styleUrls: ['./coverpage.component.css']
})
export class CoverpageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onRoute() {
    this.router.navigateByUrl("/home");
  }
}
