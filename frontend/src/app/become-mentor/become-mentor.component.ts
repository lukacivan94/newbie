import { Component, OnInit, ElementRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { MessageService } from '../message.service';
import { BackendService } from '../backend.service';
import { Router } from '@angular/router';
import { MessageService as NgMessageService } from 'primeng/api';
import { NgForm } from '@angular/forms';
import Keyboard from 'simple-keyboard';
// import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-become-mentor',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './become-mentor.component.html',
  styleUrls: [
    '../../../node_modules/simple-keyboard/build/css/index.css',
    './become-mentor.component.css'
  ]
})
export class BecomeMentorComponent implements OnInit {


  // @ViewChild('f') becomeMentorForm: NgForm;
  // @ViewChild('canvas') canvas: ElementRef;
  // @ViewChild('video') video: ElementRef;

  public captures: Array<any> = [];
  cap;
  mentorImg;
  timer = 5;
  canSnapPhoto = true;

  showTakePicutreOverlay = false;
  localMediaStream;

  mentor;
  editMode;

  name = "";
  placeholderName = "Please enter your name";
  keyboardNameBecomeMentor: Keyboard;

  email = "";
  placeholderEmail = "Please enter your email address";
  keyboardEmailBecomeMentor: Keyboard;

  pin = "";
  secretPin = "";
  placeholderPin = "Please enter a 4 digits PIN";
  keyboardPinBecomeMentor: Keyboard;

  male: boolean = false;
  female: boolean = false;
  areasActive = [];
  pLanguageActive = [];
  // hobbiesActive = [];
  languagesActive = [];
  countryActive;
  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  dayActive = 'Monday';
  selectedEmail = ['@mytum.de'];
  hours: string = "12";
  minutes: string = "00";

  nameLabel = "";
  emailLabel = "";
  genderLabel = "";
  programLabel = "";
  areasLabel = "";
  programmingLanguageLabel = "";
  languagesLabel = "";
  countryLabel = "";
  meetingTimeLabel = "";

  canRequest = true;
  interval;

  formActive = 0;

  programs = [
    {label: 'Informatics', value: {id: 1, name: 'Informatics', code: 'IN'}},
    {label: 'Games Engineering', value: {id: 2, name: 'Games Engineering', code: 'GE'}},
    {label: 'Information Systems', value: {id: 3, name: 'Information Systems', code: 'IS'}},
    {label: 'Bioinformatics', value: {id: 4, name: 'Bioinformatics', code: 'B'}},
    {label: 'Biomedical Computing', value: {id: 5, name: 'Biomedical Computing', code: 'BC'}},
    {label: 'Data Engineering and Analytics', value: {id: 6, name: 'Data Engineering and Analytics', code: 'DEA'}},
    {label: 'Robotics', value: {id: 7, name: 'Robotics', code: 'R'}},
    {label: 'Computational Science and Engineering', value: {id: 9, name: 'Computational Science and Engineering', code: 'CSE'}}
  ];

  programActive = this.programs[0].label;

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

//   hobbies: string[] = ['adventure sports / rafting / paintball / paragliding', 'astronomy',
//    'athletics / gymnastics / calisthenics', 'badminton / tennis / table tennis / feather ball / squash / ping pong',
//   'board games / chess / card games', 'cinema / movies / series', 'classical concerts / jazz / opera',
// 'climbing / bouldering', 'collecting / numismatics / philately', 'comics / anime / manga',
// 'computer / video games', 'cooking / baking / food', 'dancing', 'fitness / gym / bodybuilding / circuit training / crossfit',
// 'football / soccer', 'hiking / trekking / backpacking / mountaineering / camping',
// 'knitting / crochet / fashion / sewing / crafts / DIY / origami',
// 'learning languages / cultures / intercultural / TalkTUM[i:] Language Café',
//  'listening to music / concerts', 'martial arts', 'museums / history / art / architecture',
// 'nature / picnics / botanics', 'other sports', 'painting / sketching / drawing / calligraphy',
// 'partying / going out / clubbing / nightlife / bars', 'photography'];


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



  public constructor(private messageService: MessageService, private backendService: BackendService, private router: Router, private ngMessageService: NgMessageService ) {
    // this.messageService.onEditMentor().subscribe(mentor => {
    //if(mentor!=={}) {
    //   this.mentor = mentor;
    //   this.editMode = true;
    //   this.becomeMentorForm.value.name = mentor.name;
    //   let email = mentor.email.slice(" ");
    //   this.becomeMentorForm.value.email = email[0];
    //   this.selectedEmail = email[1];
    //   if (mentor.gender === 'Male') {
    //     this.male = true;
    //   } else {
    //     this.female = true;
    //   }
    //}
    // });
  }


  ngOnInit() {
  }

  public ngAfterViewInit() {
    this.keyboardNameBecomeMentor = new Keyboard({
      onChange: input => this.onChangeBecomeMentor(input),
      onKeyPress: button => this.onKeyPressBecomeMentor(button),
      theme: "simple-keyboard hg-theme-default hg-layout-default",
      layout: {
        default: [
        "q w e r t y u i o p {bksp}",
        "a s d f g h j k l {enter}",
        "z x c v b n m"
        ]
      },
      display: {
        "{bksp}": "⌫",
        "{enter}": "enter ↵"
      }
    });

    this.keyboardEmailBecomeMentor = new Keyboard(".email-keyboard", {
      onChange: input => this.onChangeEmailBecomeMentor(input),
      onKeyPress: button => this.onKeyPressEmailBecomeMentor(button),
      theme: "simple-keyboard hg-theme-default hg-layout-default",
      layout: {
        default: [
        "0 1 2 3 4 5 6 7 8 9",
        "q w e r t y u i o p {bksp}",
        "a s d f g h j k l {enter}",
        "z x c v b n m ."
        ]
      },
      display: {
        "{bksp}": "⌫",
        "{enter}": "enter ↵"
      }
    });

    this.keyboardPinBecomeMentor = new Keyboard(".pin-keyboard", {
      onChange: input => this.onChangePinBecomeMentor(input),
      onKeyPress: button => this.onKeyPressPinBecomeMentor(button),
      theme: "simple-keyboard hg-theme-default hg-layout-default",
      inputPattern: /^[0-9]{1,4}$/,
      layout: {
        default: [
        "1 2 3",
        "4 5 6",
        "7 8 9",
        "{bksp} 0 {enter}"
        ]
      },
      display: {
        "{bksp}": "⌫",
        "{enter}": "enter ↵"
      }
    });

    // if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    //     navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
    //         this.video.nativeElement.srcObject = stream;
    //         this.video.nativeElement.play();
    //         // this.localMediaStream = stream.getTracks()[0];
    //         // .error(
    //         //   (error: any) => {
    //         //     this.ngMessageService.add({severity:'error', summary: 'Sorry', detail:'Something went wrong. Please try again.', life: 6000});
    //         //   }
    //         // );
    //     });
    // }
  }

  onChangeBecomeMentor(input: string) {
    if (input === "") {
      this.placeholderName = "Please enter your name";
    } else {
      this.placeholderName = "";
    }
    this.name = input.charAt(0).toUpperCase() + input.slice(1);
  }

  onKeyPressBecomeMentor(button: string) {
    if (button === "{enter}") {
      this.onNext(0);
    }
  }

  onChangeEmailBecomeMentor(input: string) {
    if (input === "") {
      this.placeholderEmail= "Please enter your email address";
    } else {
      this.placeholderEmail = "";
    }
    this.email = input;
  }

  onKeyPressEmailBecomeMentor(button: string) {
    if (button === "{enter}") {
      this.onNext(1);
    }
  }

  onChangePinBecomeMentor(input: string) {
    if (input === "") {
      this.placeholderPin = "Please enter a 4 digits PIN";
    } else {
      this.placeholderPin = "";
    }
    this.secretPin = input;
    this.pin = input.length === 1 ? "*" : input.length === 2 ? "**" : input.length === 3 ? "***" : input.length === 4 ? "****" : "";
  }

  onKeyPressPinBecomeMentor(button: string) {
    if (button === "{enter}") {
      this.onNext(2);
    }
  }


  // public capture() {
  //   this.showTakePicutreOverlay = true;
  // }

  // onCloseTakePictureOverlay() {
  //   this.showTakePicutreOverlay = false;
  //   // this.localMediaStream.stop();
  // }

  // public snapButton() {
  //   this.canSnapPhoto = false;
  //   let that = this;
  //   this.interval = setInterval(this.countDown, 1000, that);
  // }

  // countDown(that) {
  //   if (that.timer > 0) {
  //     that.timer = that.timer - 1;
  //   } else {
  //     clearInterval(that.interval);
  //     console.log("hhhhhhh");
  //     that.canvas.nativeElement.getContext('2d').drawImage(that.video.nativeElement, 0, 0, 640, 480);
  //     that.captures.push(that.canvas.nativeElement.toDataURL('png'));
  //           // let context = this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0, 640, 480);
  //           // this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));
  //     that.cap = that.captures[that.captures.length - 1];
  //     // console.log(that.cap);
  //     // const myFile = that.mentorImg = that.dataURLtoFile(that.cap);
  //     // console.log(that.mentorImg);

  //   that.timer = 3;
    // while(sec >= 0) {
    //   let n = Math.ceil(sec/1000);
    //   console.log(n);
    //   // this.timer = n;
    //   let timer = document.getElementById('timer') as HTMLInputElement;
    //   timer.value = String(n);
    //   sec--;
    // }
//   }
//     this.canSnapPhoto = true;
// }

  // base64ToFile(base64Data, tempfilename, contentType) {
  //   contentType = contentType || '';
  //   const sliceSize = 1024;
  //   const byteCharacters = atob(base64Data);
  //   const bytesLength = byteCharacters.length;
  //   const slicesCount = Math.ceil(bytesLength / sliceSize);
  //   const byteArrays = new Array(slicesCount);

  //   for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
  //     const begin = sliceIndex * sliceSize;
  //     const end = Math.min(begin + sliceSize, bytesLength);

  //     const bytes = new Array(end - begin);
  //     for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
  //       bytes[i] = byteCharacters[offset].charCodeAt(0);
  //     }
  //     byteArrays[sliceIndex] = new Uint8Array(bytes);
  //   }
  //   return new File(byteArrays, tempfilename, {type: contentType});
  // }

  // dataURLtoFile(dataurl, filename = 'mentorImg') {
  //   let arr = dataurl.split(',');
  //   let mime = arr[0].match(/:(.*?);/)[1];
  //   let suffix = mime.split('/')[1];
  //   let bstr = atob(arr[1]);
  //   let n = bstr.length;
  //   let u8arr = new Uint8Array(n);
  //   while (n--) {
  //     u8arr[n] = bstr.charCodeAt(n);
  //   }
  //   return new File([u8arr], `${filename}.${suffix}`, {
  //     type: mime
  //   });
  // }

  onEmailChange(email: string) {
    if (this.selectedEmail.length !== 0) {
      this.selectedEmail = [];
    }
    this.selectedEmail.push(email);
  }

  onMale() {
    if (this.male === true) {
      this.male = false;
    } else {
      this.female = false;
      this.male = true;
    }
    this.formActive = 4;
    this.genderLabel = this.male ? this.female ? this.genderLabel : "You identify as male." : this.female ? "You identify as female." : "You did not specify your gender.";
  }

  onFemale(){
    if (this.female === true) {
      this.female = false;
    } else {
      this.male = false;
      this.female = true;
    }
    this.formActive = 4;
    this.genderLabel = this.male ? this.female ? this.genderLabel : "You identify as male." : this.female ? "You identify as female." : "You did not specify your gender.";
  }

  onProgram(program: any) {
    if (program.label === this.programActive) {
      return;
    } else {
      this.programActive = program.label;
    }
    this.formActive = 5;
    this.programLabel = this.programActive ? "You study "+this.programActive : "You did not specify your program";
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
      this.formActive = 6;
    }
    if (this.areasActive.length > 1) {
      this.areasLabel = "You specialized in "
      for (let area of this.getAreas()) {
        this.areasLabel = this.areasLabel + area + " and ";
      }
      this.areasLabel = this.areasLabel.substr(0, this.areasLabel.length - 5) + ".";
    } else {
      this.areasLabel = this.areasActive.length !== 0 ? "You specialized in "+ this.areas[this.areasActive[0]].value + "." : "You did not specify an area."
    }
  }

  onLanguage(language: any) {
    if (this.languagesActive.includes(language)) {
      this.languagesActive.splice(this.languagesActive.indexOf(language),1);
    } else {
      this.languagesActive.push(language);
    }
    if (this.languagesActive.length > 1) {
      this.languagesLabel = "You speak the following languages: "
      for (let language of this.getLanguages()) {
        this.languagesLabel = this.languagesLabel + language + ", ";
      }
      this.languagesLabel = this.languagesLabel.substr(0, this.languagesLabel.length - 2) + ".";
    } else {
      this.languagesLabel = this.languagesActive.length !== 0 ? "You speak " + this.languagesActive[0].value + "." : "You did not specify the language(s) you speak."
    }
  }

  // onHobby(index: number) {
  //   if (this.hobbiesActive.includes(index)) {
  //     this.hobbiesActive.splice(this.hobbiesActive.indexOf(index), 1);
  //   } else {
  //     this.hobbiesActive.push(index);
  //   }
  // }

  onDay(index: number){
    if (this.days[index] === this.dayActive) {
      return;
    } else {
      this.dayActive = this.days[index];
    }
    this.meetingTimeLabel = this.dayActive ? "Your meeting time: " + this.dayActive + " " + this.hours + ":" + this.minutes : "";
  }

  scrollIntoView() {
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 300);
  }

  onNext(type: number) {
    switch(type){
      case 0:
        if (this.name === "") {
          this.ngMessageService.add({severity:'warn', summary: 'Please enter a name', detail: 'Name is a required field.', life: 4000});
        } else {
          this.formActive = 1;
          this.nameLabel = this.name;
        }
        break;
      case 1:
        if (this.email === "") {
          this.ngMessageService.add({severity:'warn', summary: 'Please enter an email', detail: 'Email is a required field.', life: 4000});
        } else {
          this.formActive = 2;
          this.emailLabel = this.email + this.selectedEmail;
        }
        break;
      case 2:
        if (this.pin.length < 4) {
          this.ngMessageService.add({severity:'warn', summary: 'Please enter a pin', detail: 'Pin is a required field.', life: 4000});
        } else {
          this.formActive = 3;
        }
        break;
      case 3:
        this.formActive = 4;
        this.genderLabel = this.male ? this.female ? this.genderLabel : "You identify as male." : this.female ? "You identify as female." : "You did not specify your gender.";
        break;
      case 4:
        this.formActive = 5;
        this.programLabel = this.programActive ? "You study "+this.programActive + ".": "You did not specify your program.";
        break;
      case 5:
        if (this.areasActive.length === 0) {
          this.ngMessageService.add({severity:'warn', summary: 'Please enter an area', detail: 'At least one area is required.', life: 4000});
        } else {
          this.formActive = 6;
          if (this.areasActive.length > 1) {
            this.areasLabel = "You specialized in "
            for (let area of this.getAreas()) {
              this.areasLabel = this.areasLabel + area + " and ";
            }
            this.areasLabel = this.areasLabel.substr(0, this.areasLabel.length - 5) + ".";
          } else {
            this.areasLabel = this.areasActive.length !== 0 ? "You specialized in "+ this.areas[this.areasActive[0]].value + "." : "You did not specify an area."
          }
        }
        break;
      case 6:
        if (this.pLanguageActive.length === 0) {
          this.ngMessageService.add({severity:'warn', summary: 'Please enter a programming language', detail: 'Your favourite programming language is required.', life: 4000});
        } else {
          this.formActive = 7;
          this.programmingLanguageLabel = this.pLanguageActive ? this.pLanguageActive + " is your favourite programming language." : "You did not specify your favourite programming language.";
        }
        break;
      case 7:
        if (this.languagesActive.length === 0) {
          this.ngMessageService.add({severity:'warn', summary: 'Please enter a language', detail: 'At least one language you speak is required.', life: 4000});
        } else {
          this.formActive = 8;
          if (this.languagesActive.length > 1) {
            this.languagesLabel = "You speak the following languages: "
            for (let language of this.getLanguages()) {
              this.languagesLabel = this.languagesLabel + language + ", ";
            }
            this.languagesLabel = this.languagesLabel.substr(0, this.languagesLabel.length - 2) + ".";
          } else {
            this.languagesLabel = this.languagesActive.length !== 0 ? "You speak " + this.languagesActive[0].value + "." : "You did not specify the language(s) you speak."
          }
        }
        break;
      case 8:
        if (this.countryActive === undefined) {
          this.ngMessageService.add({severity:'warn', summary: 'Please enter a country', detail: 'The country you are from is required.', life: 4000});
        } else {
          this.formActive = 9;
          this.countryLabel = this.countryActive ? "You are from " + this.countryActive + "." : "You did not specify where you are from.";
        }
        break;
    }
  }

  onSignUp() {
    this.canRequest = false;
    const data = {
      name: this.name,
      gender: this.male ? 'Male' : 'Female',
      email: this.email + this.selectedEmail,
      password: this.secretPin,
      programme: this.programActive,
      areas: this.getAreas(),
      // hobbies: this.getHobbies(),
      proglanguage: this.pLanguageActive,
      languages: this.getLanguages(),
      country: this.countryActive,
      meeting_time: this.dayActive + ' ' + this.hours + ':' + this.minutes,
      newbies: {
        names: [],
        emails: []
      },
      mentorImage: this.cap
    };
    console.log(data);
    this.backendService.post('mentors', data).then(
      (res: any) => {
        this.ngMessageService.add({severity:'success', summary: 'Success', detail: 'Signup successful!', life: 6000});
        this.messageService.sendOnMentorLoggedIn(res.mentor);
        this.messageService.sendOnUserLoggedIn(true);
        this.router.navigateByUrl('/signin/mentor');
        this.canRequest = true;
      }
    )
    .catch(
      (error: any) => {
        this.ngMessageService.add({severity:'error', summary: 'Internal Server Error', detail:'Sorry, there was an error signing you up. Please try again later.', life: 6000});
        this.canRequest = true;
      }
    );
  }

  onEditData() {

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

  onHoursClicked(increase: boolean) {
    if (increase) {
      if (parseInt(this.hours) < 24 ) {
        this.hours = parseInt(this.hours) < 23 ? (parseInt(this.hours) + 1).toString() : "00";
      } else {
        this.hours = "00";
      }
    } else {
      if (parseInt(this.hours) > 0 ) {
        this.hours = (parseInt(this.hours) - 1).toString();
      } else {
        this.hours = "00";
      }
    }
    this.meetingTimeLabel = this.dayActive ? "Your meeting time: " + this.dayActive + " " + this.hours + ":" + this.minutes : "";
  }

  onMinutesClicked(increase: boolean) {
    if (parseInt(this.minutes) === 0) {
      if (parseInt(this.hours) === 24) {
        this.hours = "00";
        this.minutes = "30";
        this.meetingTimeLabel = this.dayActive ? "Your meeting time: " + this.dayActive + " " + this.hours + ":" + this.minutes : "";
        return;
      }
      if (parseInt(this.hours) === 0 && !increase) {
        this.hours = "23";
        this.minutes = "30";
        this.meetingTimeLabel = this.dayActive ? "Your meeting time: " + this.dayActive + " " + this.hours + ":" + this.minutes : "";
        return;
      }
      this.minutes = "30";
      if (!increase) {
        this.onHoursClicked(increase);
      }
    } else {
      this.minutes = "00";
      if (increase) {
        this.onHoursClicked(increase);
      }
    }
    this.meetingTimeLabel = this.dayActive ? "Your meeting time: " + this.dayActive + " " + this.hours + ":" + this.minutes : "";
  }
}
