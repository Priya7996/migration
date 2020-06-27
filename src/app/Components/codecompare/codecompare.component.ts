import { Component, OnInit } from '@angular/core';
import { NavbarService} from '../../Nav/navbar.service'
import { Observable, Subject, from } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompareService} from '../../Service/app/compare.service';
import Swal from 'sweetalert2';
import { untilDestroyed } from 'ngx-take-until-destroy';

export interface DiffResults {
  hasDiff: boolean;
  diffsCount: number;
  rowsWithDiff: {
    leftLineNumber?: number;
    rightLineNumber?: number;
    numDiffs: number;
  }[];
}

export interface DiffContent {
  leftContent: string;
  rightContent: string;
}

@Component({
  selector: 'app-codecompare',
  templateUrl: './codecompare.component.html',
  styleUrls: ['./codecompare.component.scss']
})
export class CodecompareComponent implements OnInit {
  reason_response: any;
  tenant: string;
  file_status: any;
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
  file2: any;
  slave_file: string;
  date= new Date().toString();

  constructor(private fb: FormBuilder, private nav:NavbarService,private service:CompareService) {
    this.tenant = localStorage.getItem('tenant_id')
    this.nav.show()
    this.login = this.fb.group({
      name:["",Validators.required],
      reason: ["", Validators.required],
      old_revision_no:["",Validators.required],
      new_revision_no:["",Validators.required],
    })
  }

  ngOnInit(): void {
    this.service.machine(this.tenant).pipe(untilDestroyed(this)).subscribe(res => {
      this.reason_response=res;
       this.code_compare(this.reason_response[0].id)
     
    });
    
  }
  code_compare(id) {
    this.service.display_reason(id).pipe(untilDestroyed(this)).subscribe(res =>{
      this.file_status =res;
      // this.dataSource=new MatTableDataSource(this.backup)
      if (res['status'] != null) {
        Swal.fire(res['status'])
      }
    })  
   
  }
 
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
    }
   }
   onSelect(machine_id) {
    this.machineid = machine_id
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
    if (this.Compare)
      this.buttonName = "Compare";
   
    // this.ngOnInit();

    // this.Compare = false;
    console.log(this.Compare);
 
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
    // console.log(this.file.name)
  }

  fileUpload(event) {
    var reader = new FileReader();
    let file = event.target.files[0];
    let file_name = file.name;
    this.filName = file_name;
    // console.log(this.filName)
    reader.readAsText(event.srcElement.files[0]);
    var me = this;
    reader.onload = function () {
      me.FileText = reader.result;
      // console.log(me)
      // me.content.leftContent = (reader.result).toString()
      me.handleChange('left', me.FileText)
    }
    //this.handleChange('left',me.FileText)
    this.Text = me.FileText;

  }

  fileUpload1(event) {
    var reader = new FileReader();
    // console.log(event) 
    this.file2 = event.target.files[0];
    // console.log(this.file2);
    let fileName = this.file2.name;
    this.filName1 = fileName
    reader.readAsText(event.srcElement.files[0]);
    var me = this;
    reader.onload = function () {
      me.filetext1 = reader.result;
      // console.log(me)
      //me.content.rightContent = (reader.result).toString()
      me.handleChange('right', me.filetext1)
    }
    //this.handleChange('right',right)
    this.Text1 = me.filetext1
  }
  logintest(val) {
    this.Compare = false;
    this.submitted = false;
    this.login.reset();
    this.filName = "";
    this.Compare = false;
    this.slave_file="";
    this.filName1 = "";
    this.file_path = "";
    this.file_name = "";
    this.fileName1 = "";
    this.filetext1 = "";
    this.FileText = "";
    this.compareResults = "";
    this.machinesArray = "";

  }
  old(arg0: string, old: any) {
    throw new Error("Method not implemented.");
  }
  toggle() {
    this.Compare = !this.Compare;

    // CHANGE THE NAME OF THE BUTTON.
    if (this.Compare)
      this.buttonName = "Compare";
    else
      this.buttonName = "Compare";
  }
  change(event){
    this.date=event.value
  }

  ngOnDestroy(){

  }
}
