import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { Router } from '@angular/router';
import { BackendService } from '../backend.service';
import { MessageService as ngMessageService } from 'primeng/api';

@Component({
  selector: 'app-quick-recommendation',
  templateUrl: './quick-recommendation.component.html',
  styleUrls: ['./quick-recommendation.component.css']
})
export class QuickRecommendationComponent implements OnInit {

  ws: boolean = false;
  ss: boolean = false;
  ba: boolean = false;
  ma: boolean = false;
  de: boolean = false;
  en: boolean = false;
  // semester: number = 3;
  // maxSemester = 9;
  ects: number = 0;
  formActive = 0;
  programActive;

  semester = "";
  baMa = "";
  language = "";

  numberOfFields = 5;

  canRequest = true;

  areaActive;

  programs = [
    {label: 'Informatics', value: {id: 0, name: 'Informatics', code: 'IN'}},
    {label: 'Games Engineering', value: {id: 1, name: 'Games Engineering', code: 'GE'}},
    {label: 'Information Systems', value: {id: 2, name: 'Information Systems', code: 'IS'}},
    {label: 'Bioinformatics', value: {id: 3, name: 'Bioinformatics', code: 'B'}},
    {label: 'Biomedical Computing', value: {id: 4, name: 'Biomedical Computing', code: 'BC'}},
    {label: 'Data Engineering and Analytics', value: {id: 5, name: 'Data Engineering and Analytics', code: 'DEA'}},
    {label: 'Robotics', value: {id: 6, name: 'Robotics', code: 'R'}},
    {label: 'Computational Science and Engineering', value: {id: 8, name: 'Computational Science and Engineering', code: 'CSE'}}
  ];


  areas = [
    {label: 'Algorithms (ALG)', value: 'Algorithms'},
    {label: 'Computer Graphics and Vision (CGV)', value: 'Computer Graphics and Vision'},
    {label: 'Databases and Information Systems (DBI)', value: 'Databases and Information Systems'},
    {label: 'Digital Biology and Digital Medicine (DBM)', value: 'Digital Biology and Digital Medicine'},
    {label: 'Engineering Software-Intensive Systems (SE)', value: 'Engineering Software-Intensive Systems'},
    {label: 'Formal Methods and their Applications (FMA)', value: 'Formal Methods and their Applications'},
    {label: 'Machine Learning and Analytics (MLA)', value: 'Machine Learning and Analytics'},
    {label: 'Computer Architecture, Computer Networks and Distributed Systems',
    value: 'Computer Architecture, Computer Networks and Distributed Systems'},
    {label: 'Robotics (ROB)', value: 'Robotics'},
    {label: 'Security and Privacy (SP)', value: 'Security and Privacy'},
    {label: 'Scientific Computing and High Performance Computing (HPC)', value: 'Scientific Computing and High Performance Computing'}
  ];

  selectedAreas = [];


  constructor(private messageService: MessageService, private router: Router, private backendService: BackendService, private ngMessageService: ngMessageService) { }

  ngOnInit() {
  }

  onSemester(ws: boolean) {
    if (ws) {
      this.ws = this.ws ? false :  true;
    } else {
      this.ss = this.ss ? false : true;
    }
    this.semester = this.ws ? this.ss ? "Winter and summer semester" : "Winter semester" : this.ss ? "Summer semester" : "Winter and summer semester";
  }

  onBaMa(bachelor: boolean) {
    if (bachelor) {
      this.ba = this.ba ? false : true;
      this.ma = this.ba ? false : this.ma;
    } else {
      this.ma = this.ma ? false : true;
      this.ba = this.ma ? false : this.ba;
    }
    this.baMa = this.ba ? this.ma ? "Bachelor and master courses" : "Only bachelor courses" : this.ma ? "Only master courses" : "Bachelor and master courses";
  }

  onLanguage(german: boolean) {
    if (german) {
      this.de = this.de ? false : true;
    } else {
      this.en = this.en ? false : true;
    }
    this.language = this.de ? this.en ? "German and english courses" : "Only german courses" : this.en ? "Only english courses" : "German and english courses";
  }

  onProgram(program: any) {
    if (program.label === this.programActive) {
      this.formActive = 1;
      return;
    } else {
      this.programActive = program.label;
    }
    this.onNext();
  }

  onMoreEcts() {
    this.ects++;
  }

  onLessEcts() {
    this.ects = (this.ects > 0) ? this.ects - 1 : this.ects;
  }

  onNext() {
    if (this.ba === true) {
      this.formActive = 5;
    }
    if (this.programActive === 'Informatics') {
      this.formActive = 4;
      this.numberOfFields = 6;
    } else {
      this.formActive = 5;
      this.numberOfFields = 5;
    }
  }

  onBack() {
    if (this.programActive === 'Informatics') {
      this.formActive = 4;
      this.numberOfFields = 6;
    } else {
      this.formActive = 3;
      this.numberOfFields = 5;
    }
  }

  onSubmit() {
    this.canRequest = false;
    let ba_ma = this.ba ? 'BA' : this.ma ? 'MA' : undefined;
    let programme = this.ba ? 'Informatics' : this.programActive;
    let area = this.areaActive;

    let data = {
      semesters: this.ws ? this.ss ? ['WS', 'SS'] : ['WS'] : this.ss ? ['SS'] : undefined,
      languages: this.de ? this.en ? ['German', 'English'] : ['German'] : this.en ? ['English'] : undefined,
      ects: this.ects === 0 ? undefined : this.ects
    };

    if (ba_ma !== undefined) {
      data['ba_ma'] = ba_ma;
    }

    if (programme !== undefined) {
      data['programme'] = programme;
    }

    if (area !== undefined) {
      data['area'] = this.ba === true ? '' : area;
    }


    console.log(data);
    this.backendService.post('courses/recommendation', data).then(
      (res: any) => {
        if (res.count === 0) {
          this.ngMessageService.add({severity:'warn', summary: 'Sorry', detail:`We couldn't find any courses for your selection.`, life: 6000});
        } else {
          this.ngMessageService.add({severity:'success', summary: 'Congratulations', detail:`We found ${res.count} possible course(s) for you. Add a course to your choice, by clicking on it.`, life: 6000});
          this.messageService.sendOnCoursesReceived(res.courses);
          this.router.navigateByUrl('/recommendation/results');
        }
        this.canRequest = true;
      }
    )
    .catch(
      (error: any) => {
        this.ngMessageService.add({severity:'error', summary: 'Internal Server Error', detail:'Sorry, there was an error while loading your course recommendation. Please try again later.', life: 6000});
        this.canRequest = true;
      }
    );
    
  }

  
}
