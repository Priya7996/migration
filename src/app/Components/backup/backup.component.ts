import { Component, OnInit,Inject } from '@angular/core';
import { FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NavbarService} from '../../Nav/navbar.service';
import { BackupService} from '../../Service/app/backup.service';
import { MatTableDataSource } from '@angular/material';
import Swal from 'sweetalert2';
import { untilDestroyed } from 'ngx-take-until-destroy';
@Component({
  selector: 'app-backup',
  templateUrl: './backup.component.html',
  styleUrls: ['./backup.component.scss']
})
export class BackupComponent implements OnInit {
  test:FormGroup;
  machine_response: any;
  tenant: any;
  reason_response: any;
  backup: any;
  myLoader = false;
  constructor(public dialog: MatDialog,private fb :FormBuilder,private nav:NavbarService,private service :BackupService) { 
    this.tenant=localStorage.getItem('tenant_id')

    this.nav.show();
  }
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','action'];
  dataSource = new MatTableDataSource();
  openDialog(): void {
    const dialogRef = this.dialog.open(Backup, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  ngOnInit() {
    this.test=this.fb.group({
      
      
    })
    this. myLoader = true;
    this.service.machine(this.tenant).pipe(untilDestroyed(this)).subscribe(res => {
      console.log(res);
      this. myLoader = false;
      this.reason_response=res;
      console.log(this.reason_response)
      this.code_compare(this.reason_response[0].id)
     
    });
  }
  
  code_compare(id) {
    this.myLoader = true;
    this.service.display_reason(id).pipe(untilDestroyed(this)).subscribe(res =>{
      console.log(res)
     this. myLoader = false;
      this.backup=res;
      this.dataSource=new MatTableDataSource(this.backup)
      // if (res['status'] != null) {
      //   Swal.fire(res['status'])
      // }
    })   
  }
  testform(val)
  {
    console.log(this.test.value)
  }
  ngOnDestroy(){

  }
}
@Component({
  selector: 'backup-page',
  templateUrl: 'backup.html',
})
export class Backup {
  test:FormGroup;
  machine_response:any;
  constructor(public dialogRef: MatDialogRef<Backup>,@Inject(MAT_DIALOG_DATA) public data: string,private fb:FormBuilder) {
    // this.tenant = localStorage.getItem('tenant_id')    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit()
  {
    this.test=this.fb.group ({
      reason:[""],

    })

    // this.service.machine_lock( this.tenant).pipe(untilDestroyed(this)).subscribe(res => {
    //   console.log(res);
    //   this.machine_response=res;
      
    // });
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
   upload(event){
     console.log(event.target.value)

   }
   ngOnDestroy(){

  }
}