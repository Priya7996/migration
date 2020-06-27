import { Component, OnInit,Inject,ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NavbarService} from '../../Nav/navbar.service';
import Swal from 'sweetalert2'
import {ProgramListService} from '../../Service/app/programlist.service';
import { MatTableDataSource } from '@angular/material';
import { untilDestroyed } from 'ngx-take-until-destroy';
@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class MasterComponent implements OnInit {
  date: any;
  myLoader = false;
  public today: Date = new Date(new Date().toDateString());
  public weekStart: Date = new Date(new Date(new Date().setDate(new Date().getDate() - (new Date().getDay() + 7) % 7)).toDateString());
  public weekEnd: Date = new Date(new Date(new Date().setDate(new Date(new Date().setDate((new Date().getDate()
      - (new Date().getDay() + 7) % 7))).getDate() + 6)).toDateString())
      ;
  public monthStart: Date = new Date(new Date(new Date().setDate(1)).toDateString());
  public monthEnd: Date = this.today;
  public lastStart: Date = new Date(new Date(new Date(new Date().setMonth(new Date().getMonth() - 1)).setDate(1)).toDateString());
  public lastEnd: Date = this.today;
  public yearStart: Date = new Date(new Date(new Date().setDate(new Date().getDate() - 365)).toDateString());
  public yearEnd: Date = this.today;
  public currentYear: number = this.today.getFullYear();
  public currentMonth: number = this.today.getMonth();
  public maxDate: Object = new Date();
  public minDate: Object = new Date(new Date().setMonth(new Date().getMonth() - 1));
  data:string;   
  machine_response: any;
  tenant: any;
  reason: any;
  constructor(private fb:FormBuilder,public dialog: MatDialog,private nav:NavbarService,private service:ProgramListService) {
    this.nav.show();
    this.tenant = localStorage.getItem('tenant_id')
   }
   displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','action'];
   dataSource=new MatTableDataSource
   slave=new MatTableDataSource

   slavelist: string[] = ['position', 'name', 'weight', 'symbol','action'];
  
  openDialog(): void {
    const dialogRef = this.dialog.open(Dialog, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  ngOnInit() {
    this.service.machine( this.tenant).pipe(untilDestroyed(this)).subscribe(res => {
      console.log(res);
      this.machine_response=res;
      // this.service.filelist( this.machine_response.id).subscribe(res =>{
        console.log(res);
        this.getmachine(this.machine_response[0].id)
      });
   
  }
  getmachine(id) {
    this.myLoader = true;
     this.service.display_reason(id).pipe(untilDestroyed(this)).subscribe(res =>{
      console.log(res)
      this.myLoader = false;

      this.reason=res;
      this.dataSource=new MatTableDataSource(this.reason)
      this.slave=new MatTableDataSource(this.reason)
      if (res['status'] != null) {
        Swal.fire(res['status'])
      }
    })  
  }
  masterpath_delete():void {
    const dialogRef = this.dialog.open(Delete, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

    
  slavepath_delete(){
    Swal.fire('Are you sure want to delete?')
  }
  ngOnDestroy(){

  }
}

@Component({
  selector: 'dialog-page',
  templateUrl: 'dialog.html',
})
export class Dialog {
  test:FormGroup;
  fileName1:any;
  machine_response: any;
  tenant: string;
  constructor(public dialogRef: MatDialogRef<Dialog>,@Inject(MAT_DIALOG_DATA) public data: any,private fb:FormBuilder,private service:ProgramListService) {
  this.tenant = localStorage.getItem('tenant_id')  
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit()
  {
    this.test=this.fb.group ({
      machine_id:["",],
      user_name:["",],
      revision_no:["",],
      date:["",],

    })

    this.service.machine( this.tenant).pipe(untilDestroyed(this)).subscribe(res => {
      console.log(res);
      this.machine_response=res;
      
    });

  }
  
  testform(val)
  {
    console.log(this.test.value);
    this.test.reset();
  }
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
    }
   }
   ngOnDestroy(){

  }

}
@Component({
  selector: 'delete-page',
  templateUrl: 'delete.html',
})
export class Delete {
  date: any;
  public today: Date = new Date(new Date().toDateString());
  public weekStart: Date = new Date(new Date(new Date().setDate(new Date().getDate() - (new Date().getDay() + 7) % 7)).toDateString());
  public weekEnd: Date = new Date(new Date(new Date().setDate(new Date(new Date().setDate((new Date().getDate()
      - (new Date().getDay() + 7) % 7))).getDate() + 6)).toDateString())
      ;
  public monthStart: Date = new Date(new Date(new Date().setDate(1)).toDateString());
  public monthEnd: Date = this.today;
  public lastStart: Date = new Date(new Date(new Date(new Date().setMonth(new Date().getMonth() - 1)).setDate(1)).toDateString());
  public lastEnd: Date = this.today;
  public yearStart: Date = new Date(new Date(new Date().setDate(new Date().getDate() - 365)).toDateString());
  public yearEnd: Date = this.today;
  public currentYear: number = this.today.getFullYear();
  public currentMonth: number = this.today.getMonth();
  public maxDate: Object = new Date();
  public minDate: Object = new Date(new Date().setMonth(new Date().getMonth() - 1));
  login:FormGroup;
  constructor(public dialogRef: MatDialogRef<Delete>,@Inject(MAT_DIALOG_DATA) public data: any,private fb:FormBuilder) {
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit()
  {
    this.login =this.fb.group({
      user_name:["",],
      reason:["",],
    })
  }
  logintest(val)
  {
      console.log(val)
  }
  
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
    }
   }
   ngOnDestroy(){

  }

}