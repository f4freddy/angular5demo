import { Component, OnInit } from '@angular/core';
import {trigger,transition,style,animate,keyframes,query,stagger} from '@angular/animations';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [
  trigger('studentList',[
    transition('* => *',[
      query(':enter',style({opacity:0}),{optional:true}),
      query(':enter',stagger('300ms',[
        animate('.6s ease-in', keyframes([
          style({opacity:0,transform:'translateY(-75%)',offset:0}),
          style({opacity:.5,transform:'translateY(35%)',offset:.3}),
          style({opacity:1,transform:'translateY(0%)',offset:1}),
        ]))
      ]),{optional:true}),
      query(':leave',stagger('300ms',[
        animate('.6s ease-in', keyframes([
          style({opacity:0,transform:'translateY(0%)',offset:0}),
          style({opacity:.5,transform:'translateY(35%)',offset:.3}),
          style({opacity:1,transform:'translateY(-75%)',offset:1}),
        ]))
      ]),{optional:true})
    ])
  ])
  ]
})
export class AboutComponent implements OnInit {

  inputText: string
  studentNames = [];
  itemCount: number

  constructor(private http: Http) { }

  ngOnInit() {
    this.itemCount=this.studentNames.length;
  }

  addItem(){
    console.log(this.studentNames);
    if(this.inputText){
    this.studentNames.push(this.inputText);
    
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });
    const params = new URLSearchParams();
    params.set('firstName', this.inputText);

  let url = "http://localhost:8181/addname";
  console.log(params)
  //let search = new URLSearchParams();
  //let url = `${this.apiRoot}/get`;
  this.http.post(url, params, options).subscribe(res => console.log(res.text())); 
 // search.set('foo', 'moo');
 // search.set('limit', 25);
  //URLSearchParams.get(url, {}).subscribe(res => console.log(res.json())); 

    }
    this.inputText = '';
    this.itemCount=this.studentNames.length;
  }

  removeItem(i){
    this.studentNames.splice(i,1);
  }

}
