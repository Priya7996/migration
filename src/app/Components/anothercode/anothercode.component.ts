import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';
import { Observable, Subject, from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { DiffResults } from '../../../projects/ngx-text-diff/src/lib/ngx-text-diff.model';
import { DiffResults} from '../../../../projects/ngx-text-diff/src/lib/ngx-text-diff.model';

export interface DiffContent {
  leftContent: string;
  rightContent: string;
}

@Component({
  selector: 'app-anothercode',
  templateUrl: './anothercode.component.html',
  styleUrls: ['./anothercode.component.scss']
})
// export class AnothercodeComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }




export class AnothercodeComponent implements OnInit {
  submitted = false;
  filName: any = "";
  filName1: any = "";
  status: any;
  content: DiffContent = {
    leftContent: '',
    rightContent: ''
  };

  options: any = {
    lineNumbers: true,
    mode: 'xml'
  };

  contentObservable: Subject<DiffContent> = new Subject<DiffContent>();
  contentObservable$: Observable<DiffContent> = this.contentObservable.asObservable();
  fileText: string | ArrayBuffer;
  FileText;
  filetext1;
  result: any;
  public show: boolean = false;
  public buttonName: any = 'Compare';
  login: FormGroup;
  Compare: any;
  // path:any;
  machinesArray: any;
  machineid: any;
  fileName: any;
  file_path: any;
  fileName1: any;
  // test: Object;
  sample_test: any;
  file: any;
  file_Name: any;
  file_name: any;
  machine: any;
  compare: any;

  Text1: any;
  me: any;
  Text: any;
  compareResults: string;
  constructor(private fb: FormBuilder, private http: HttpClient) {


    this.login = this.fb.group({
      // name:["",Validators.required],
      reason: ["", Validators.required]
    })


  }
  // this.httpClient.post('http://192.168.1.160:3000/users/create',{user: this.user.value}).subscribe(result =>{

  ngOnInit() {
    this.sample_test = JSON.parse(localStorage.getItem('test'));
    let headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + localStorage.getItem("token")
      })
    }
    //headers.set("Authorization", "Bearer " +localStorage.getItem("token"));
    this.http.get("http://192.168.0.237:4000/api/v1/machines?tenant_id=" + this.sample_test.tenant_id, headers).subscribe(res => {
      console.log(res);
      // console.log(filName);
      this.machinesArray = res;
      this.onSelect(this.machinesArray[0].id);
      localStorage.getItem("tenant_id");
      console.log(localStorage.getItem('tenant_id'));

      // this.http.get("http://192.168.0.237:4000/api/v1/machines?tenant_id=' + $scope.tenant_id",).subscribe(res=>{
      //   console.log(res);


    });
  }

  onSelect(machine_id) {
    this.machineid = machine_id
    console.log(this.machineid)
    this.filName = "";
    this.filName1 = "";
    this.submitted = false;
    this.compareResults = "";

    this.login.reset();
    this.Compare = false;
    this.file_path = "";
    this.file_name = "";
    this.fileName1 = "";
    this.filetext1 = "";
    // this.me.FileText = "";

    // CHANGE THE NAME OF THE BUTTON.
    console.log(this.Compare)
    if (this.Compare)
      this.buttonName = "Compare";
   
    // this.ngOnInit();

    // this.Compare = false;
    console.log(this.Compare);
    let headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + localStorage.getItem("token")
      })
    }
    console.log(machine_id)
    this.http.get("http://183.82.250.137:4000/api/v1/file_path?id=" + machine_id, headers).subscribe(res => {
      //console.log(res);
      //alert(res.status);
      // alert(res.file_path);
      if (res['status'] != null) {
        alert(res['status'])
      }
      this.file_path = res;

    },
      error => {
        console.log(error)
        this.file_path = error.error;
      })
  }

  submitComparison() {
    this.submitted = false;
    this.contentObservable.next(this.content);
    this.submitted = true;
  }

  handleChange(side: 'left' | 'right', value: string) {
    switch (side) {
      case 'left':
        this.content.leftContent = value;
        break;
      case 'right':
        this.content.rightContent = value;
        break;
      default:
        break;
    }
  }

  onCompareResults(diffResults: DiffResults) {
    console.log('diffResults', diffResults);
    // console.log(this.file.name)
  }

  fileUpload(event) {
    var reader = new FileReader();
    let file = event.target.files[0];
    let file_name = file.name;
    this.filName = file_name
    console.log(this.filName)
    reader.readAsText(event.srcElement.files[0]);
    var me = this;
    reader.onload = function () {
      me.FileText = reader.result;
      console.log(me)
      // me.content.leftContent = (reader.result).toString()
      me.handleChange('left', me.FileText)
    }
    //this.handleChange('left',me.FileText)
    this.Text = me.FileText;

  }

  fileUpload1(event) {
    var reader = new FileReader();
    console.log(event)
    let file = event.target.files[0];
    let fileName = file.name;
    this.filName1 = fileName
    reader.readAsText(event.srcElement.files[0]);
    var me = this;
    reader.onload = function () {
      me.filetext1 = reader.result;
      console.log(me)
      //me.content.rightContent = (reader.result).toString()
      me.handleChange('right', me.filetext1)
    }
    //this.handleChange('right',right)
    this.Text1 = me.filetext1
  }
  logintest(val) {
    console.log(this.login.value.reason)
    this.Compare = false;

    console.log(this.Compare)
    let data = {
      "id": this.machineid,
      "user_id": this.sample_test.user_id,
      "reason": this.login.value.reason,
      "file_name": this.filName

    }
    console.log(data);
    this.http.post('http://183.82.250.137:4000/api/v1/compare_reason', data, { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }).subscribe(res => {
      console.log(res);
    })
    this.submitted = false;
    this.ngOnInit();
    this.login.reset();
    this.filName = "";
    this.Compare = false;

    this.filName1 = "";
    this.file_path = "";
    this.file_name = "";
    this.fileName1 = "";
    this.filetext1 = "";
    this.me.FileText = "";
    this.compareResults = "";
    this.machinesArray = "";



  }
  toggle() {
    this.Compare = !this.Compare;

    // CHANGE THE NAME OF THE BUTTON.
    console.log(this.Compare)
    if (this.Compare)
      this.buttonName = "Compare";
    else
      this.buttonName = "Compare";
  }


}


