import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { Router } from '@angular/router';
import { BackendService } from '../backend.service';
import { MessageService as NgMessageService } from 'primeng/api';

@Component({
  selector: 'app-find-mentor',
  templateUrl: './find-mentor.component.html',
  styleUrls: ['./find-mentor.component.css']
})
export class FindMentorComponent implements OnInit {

  male: boolean = false;
  female: boolean = false;
  areasActive = [];
  programActive;
  pLanguageActive;
  // hobbiesActive = [];
  languagesActive = [];
  countryActive;

  genderLabel = "";
  programLabel = "";
  areasLabel = "";
  programmingLanguageLabel = "";
  languagesLabel = "";
  countryLabel = "";

  canRequest = true;

  formActive = 0;

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

  languages = [
    {label: 'Chinese', value: 'Chinese'},
    {label: 'Dutch', value: 'Dutch'},
    {label: 'English', value: 'English'},
    {label: 'French', value: 'French'},
    {label: 'German', value: 'German'},
    {label: 'Italian', value: 'Italian'},
    {label: 'Japanese', value: 'Japanese'},
    {label: 'Korean', value: 'Korean'},
    {label: 'Hindi', value: 'Hindi'},
    {label: 'Polish', value: 'Polish'},
    {label: 'Portuguese', value: 'Portuguese'},
    {label: 'Russian', value: 'Russian'},
    {label: 'Spanish', value: 'Spanish'},
    {label: 'Serbian', value: 'Serbian'},
    {label: 'Thai', value: 'Thai'},
    {label: 'Urdu', value: 'Urdu'},
  ];

  hobbies: string[] = ['adventure sports / rafting / paintball / paragliding', 'astronomy',
   'athletics / gymnastics / calisthenics', 'badminton / tennis / table tennis / feather ball / squash / ping pong',
  'board games / chess / card games', 'cinema / movies / series', 'classical concerts / jazz / opera',
'climbing / bouldering', 'collecting / numismatics / philately', 'comics / anime / manga',
'computer / video games', 'cooking / baking / food', 'dancing', 'fitness / gym / bodybuilding / circuit training / crossfit',
'football / soccer', 'hiking / trekking / backpacking / mountaineering / camping',
'knitting / crochet / fashion / sewing / crafts / DIY / origami',
'learning languages / cultures / intercultural / TalkTUM[i:] Language Café',
 'listening to music / concerts', 'martial arts', 'museums / history / art / architecture',
'nature / picnics / botanics', 'other sports', 'painting / sketching / drawing / calligraphy',
'partying / going out / clubbing / nightlife / bars', 'photography'];

countries = [
  {label: "Argentina", value: "Argentina"},
  {label: "Australia", value: "Australia"},
  {label: "Austria", value: "Austria"},
  {label: "Belgium", value: "Belgium"},
  {label: "Brazil", value: "Brazil"},
  {label: "Canada", value: "Canada"},
  {label: "China", value: "China"},
  {label: "Croatia", value: "Croatia"},
  {label: "Czech Republic", value: "Czech Republic"},
  {label: "Denmark", value: "Denmark"},
  {label: "Finland", value: "Finland"},
  {label: "France", value: "France"},
  {label: "Germany", value: "Germany"},
  {label: "Greece", value: "Greece"},
  {label: "Hong Kong", value: "Hong Kong"},
  {label: "Hungary", value: "Hungary"},
  {label: "India", value: "India"},
  {label: "Indonesia", value: "Indonesia"},
  {label: "Italy", value: "Italy"},
  {label: "Japan", value: "Japan"},
  {label: "Mexico", value: "Mexico"},
  {label: "Netherlands", value: "Netherlands"},
  {label: "New Zealand", value: "New Zealand"},
  {label: "Norway", value: "Norway"},
  {label: "Poland", value: "Poland"},
  {label: "Portugal", value: "Portugal"},
  {label: "Romania", value: "Romania"},
  {label: "Russian Federation", value: "Russian Federation"},
  {label: "Serbia and Montenegro", value: "Serbia and Montenegro"},
  {label: "Singapore", value: "Singapore"},
  {label: "South Africa", value: "South Africa"},
  {label: "South Korea", value: "South Korea"},
  {label: "Spain", value: "Spain"},
  {label: "Sweden", value: "Sweden"},
  {label: "Switzerland", value: "Switzerland"},
  {label: "Thailand", value: "Thailand"},
  {label: "Turkey", value: "Turkey"},
  {label: "Ukraine", value: "Ukraine"},
  {label: "United Kingdom", value: "United Kingdom"},
  {label: "United States", value: "United States"},
  {label: "Viet Nam", value: "Viet Nam"},
]

  pLanguages = [
    {label: 'C', value: 'C'},
    {label: 'C++', value: 'C++'},
    {label: 'C#', value: 'C#'},
    {label: 'Delphi', value: 'Delphi'},
    {label: 'Fortran', value: 'Fortran'},
    {label: 'F#', value: 'F#'},
    {label: 'Haskell', value: 'Haskell'},
    {label: 'Java', value: 'Java'},
    {label: 'JavaScript', value: 'JavaScript'},
    {label: 'Kotlin', value: 'Kotlin'},
    {label: 'Lua', value: 'Lua'},
    {label: 'MatLab', value: 'MatLab'},
    {label: 'Ocaml', value: 'Ocaml'},
    {label: 'Pascal', value: 'Pascal'},
    {label: 'Perl', value: 'Perl'},
    {label: 'PHP', value: 'PHP'},
    {label: 'Python', value: 'Python'},
    {label: 'R', value: 'R'},
    {label: 'Ruby', value: 'Ruby'},
    {label: 'Scala', value: 'Scala'},
    {label: 'Swift', value: 'Swift'},
    {label: 'Visual Basic', value: 'Visual Basic'}
  ];

  constructor(private messageService: MessageService, private router: Router, private backendService: BackendService, private ngMessageService: NgMessageService) { }

  ngOnInit() {
  }

  onMale() {
    if (this.male === true) {
      this.male = false;
    } else {
      this.female = false;
      this.male = true;
    }
    this.formActive = 1;
    this.genderLabel = this.male ? this.female ? "Your mentor can be male or female." : "Your mentor should be male." : this.female ? "Your mentor should be female." : "Your mentor can be of any gender.";
  }

  onFemale() {
    if (this.female === true) {
      this.female = false;
    } else {
      this.male = false;
      this.female = true;
    }
    this.formActive = 1;
    this.genderLabel = this.male ? this.female ? "Your mentor can be male or female." : "Your mentor should be male." : this.female ? "Your mentor should be female." : "Your mentor can be of any gender.";
  }

  onProgram(program: any) {
    if (program.label === this.programActive) {
      return;
    } else {
      this.programActive = program.label;
    }
    this.formActive = 2;
    this.programLabel = this.programActive ? "Your mentor should study "+this.programActive + "." : "The program of your mentor does not matter.";
  }

  onArea(index: number) {
    if (this.areasActive.includes(index)){
      this.areasActive.splice(this.areasActive.indexOf(index), 1);
    } else {
      if (this.areasActive.length === 2) {
        this.areasActive.splice(0, 1);
      }
      this.areasActive.push(index);
    }
    if (this.areasActive.length === 2) {
      this.formActive = 3;
    }
    if (this.areasActive.length > 1) {
      this.areasLabel = "Your mentor should specialize in "
      for (let area of this.getAreas()) {
        this.areasLabel = this.areasLabel + area + " and ";
      }
      this.areasLabel = this.areasLabel.substr(0, this.areasLabel.length - 5) + ".";
    } else {
      this.areasLabel = this.areasActive.length !== 0 ? "Your mentor should specialize in "+ this.areas[this.areasActive[0]].value + "." : "The area(s) of your mentor do(es) not matter."
    }
  }

  // onHobby(index: number) {
  //   if (this.hobbiesActive.includes(index)) {
  //     this.hobbiesActive.splice(this.hobbiesActive.indexOf(index), 1);
  //   } else {
  //     this.hobbiesActive.push(index);
  //   }
  //   this.formActive = 5;
  // }

  onLanguage(language: any) {
    if (this.languagesActive.includes(language)) {
      this.languagesActive.splice(this.languagesActive.indexOf(language),1);
    } else {
      this.languagesActive.push(language);
    }
    if (this.languagesActive.length > 1) {
      this.languagesLabel = "Your mentor should speak at least one of the following languages: "
      for (let language of this.getLanguages()) {
        this.languagesLabel = this.languagesLabel + language + ", ";
      }
      this.languagesLabel = this.languagesLabel.substr(0, this.languagesLabel.length - 2) + ".";
    } else {
      this.languagesLabel = this.languagesActive.length !== 0 ? "Your mentor should speak " + this.languagesActive[0].value + "." : "The language(s) your mentor speaks do(es) not matter."
    }
  }

  onNext(type: number) {
    switch (type) {
      case 0:
        this.formActive = 1;
        this.genderLabel = this.male ? this.female ? "Your mentor can be male or female." : "Your mentor should be male." : this.female ? "Your mentor should be female." : "Your mentor can be of any gender.";
        break;
      case 1: 
        this.formActive = 2;
        this.programLabel = this.programActive ? "Your mentor should study "+this.programActive.value + "." : "The program of your mentor does not matter.";
        break;
      case 2:
        this.formActive = 3;
        if (this.areasActive.length > 1) {
          this.areasLabel = "Your mentor should specialize in "
          for (let area of this.getAreas()) {
            this.areasLabel = this.areasLabel + area + " and ";
          }
          this.areasLabel = this.areasLabel.substr(0, this.areasLabel.length - 5) + ".";
        } else {
          this.areasLabel = this.areasActive.length !== 0 ? "Your mentor should specialize in "+ this.areas[this.areasActive[0]].value + "." : "The area(s) of your mentor do(es) not matter."
        }
        break;
      case 3:
        this.formActive = 4;
        this.programmingLanguageLabel = this.pLanguageActive ? "Your mentor should like "+this.pLanguageActive + "." : "The favourite programming language of you mentor does not matter.";
        break;
      case 4:
        this.formActive = 5;
        if (this.languagesActive.length > 1) {
          this.languagesLabel = "Your mentor should speak at least one of the following languages: "
          for (let language of this.getLanguages()) {
            this.languagesLabel = this.languagesLabel + language + ", ";
          }
          this.languagesLabel = this.languagesLabel.substr(0, this.languagesLabel.length - 2) + ".";
        } else {
          this.languagesLabel = this.languagesActive.length !== 0 ? "Your mentor should speak " + this.languagesActive[0].value + "." : "The language(s) your mentor speaks do(es) not matter."
        }
        break;
      case 5:
        this.countryLabel = this.countryActive ? "You are from " + this.countryActive.value + "." : "You did not specify where you are from.";
        this.onSubmit();
    }
  }

  scrollIntoView() {
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 300);
  }

  onSubmit() {
    this.canRequest = false;
    let gender = this.male ? 'Male' : this.female ? 'Female' : undefined;
    let programme = this.programActive ? this.programActive : undefined;
    // hobbies: this.getHobbies(),
    let proglanguage = this.pLanguageActive;
    let country = this.countryActive ? this.countryActive.label : undefined;
    
    let data = {
      areas: this.getAreas(),
      languages: this.getLanguages()
    };

    if (gender !== undefined) {
      data["gender"] = this.male ? 'Male' : this.female ? 'Female' : undefined;
    }
    if (programme !== undefined) {
      data["programme"] = this.programActive ? this.programActive : undefined;
    }
    if (proglanguage !== undefined) {
      data["proglanguage"] = this.pLanguageActive.label;
    }
    if (country !== undefined) {
      data["country"] = this.countryActive ? this.countryActive.label : undefined;
    }

    console.log(data);
    this.backendService.post('mentors/findmentor', data).then(
      (res: any) => {
        if (res.count === 0) {
          this.ngMessageService.add({severity:'warn', summary: 'Sorry', detail:`Unfortunately we couldn't find any mentor for you.`, life: 6000});
        } else {
          this.ngMessageService.add({severity:'success', summary: 'Congratulations', detail:`We found ${res.count} mentor(s) for you.`, life: 6000});
          this.messageService.sendOnTitleChanged("Your recommendation");
          this.messageService.sendOnMentorsReceived(res.mentors);
          this.router.navigateByUrl('/findmentor/recommendation');
        }
        this.canRequest = true;
      }
    )
    .catch(
      (error: any) => {
        this.ngMessageService.add({severity:'error', summary: 'Internal Server Error', detail:'Sorry, there was an error while loading your mentor recommendation. Please try again later.', life: 6000});
        this.canRequest = true;
      }
    );
  }

  private getAreas() {
    let areas = [];
    this.areasActive.forEach(element => {
      areas.push(this.areas[element].value);
    });
    if (areas.length === 0) {
      return undefined;
    } else {
      return areas;
    }
  }

  // private getHobbies() {
  //   let hobbies = [];
  //   this.hobbiesActive.forEach(element => {
  //     hobbies.push(this.hobbies[element]);
  //   });
  //   return hobbies;
  // }

  private getLanguages() {
    let languages = [];
    this.languagesActive.forEach(element => {
      languages.push(element.label);
    });
    if (languages.length === 0) {
      return undefined;
    } else {
      return languages;
    }
  }
}
