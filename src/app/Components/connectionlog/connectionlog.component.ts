import { Component, OnInit } from '@angular/core';
import { NavbarService} from '../../Nav/navbar.service';
import {LogService} from '../../Service/app/log.service';
import { MatTableDataSource } from '@angular/material';
import { untilDestroyed } from 'ngx-take-until-destroy';
@Component({
  selector: 'app-connectionlog',
  templateUrl: './connectionlog.component.html',
  styleUrls: ['./connectionlog.component.scss']
})
export class ConnectionlogComponent implements OnInit {
  displayedColumns: string[] = ['position','date','time','status'];
  displayedColumns1: string[] = ['position','date','time','machinename','status'];
  powerconnected:string[] = ['position','date','time','status']

  dataSource = new MatTableDataSource();
  dataSource1 = new MatTableDataSource();
  power = new MatTableDataSource();
  
  public dolly = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  
  public dongly = (value: string) => {
    this.dataSource1.filter = value.trim().toLocaleLowerCase();
  }

  public doblly = (value: string) => {
    this.power.filter = value.trim().toLocaleLowerCase();
  }
tenant:any;
myLoader = false;
myLoader1 = false;
searchText:any
ploh:any;

connectionStatus:any[]=[];
powerStatus:any[]=[];
data:any;
connectionlog: any;
  log: unknown[];
  logfh: any;
  logjvh: any;
  constructor(private nav:NavbarService,private service:LogService) {
    this.nav.show();
    this.tenant=localStorage.getItem('tenant_id')

   }
   

  ngOnInit() {
    this.myLoader=true;
    this.service.internet(this.tenant).pipe(untilDestroyed(this)).subscribe(res =>{
      this.myLoader=false
      this.connectionlog=res;
      console.log(res)
      this.dataSource=new MatTableDataSource(this.connectionlog)
      for(let i = 0; i <= res.length; i++){ 
        if(this.connectionlog.status != 'Connected'){
        this.connectionStatus.push(res[i]);
        console.log(this.connectionStatus)
        this.logfh = this.connectionStatus
        console.log(this.logfh)
        this.power=new MatTableDataSource(this.logfh)
        }else{
         this.powerStatus.push(res[i])
         }
        
    }
    })
  

    this.myLoader1=true;
     this.service.ethernet(this.tenant).pipe(untilDestroyed(this)).subscribe(res =>{
      this.myLoader1=false
      this.log=res;
      this.dataSource1=new MatTableDataSource(this.log)
    })
  }
    // search(term) {
      // const filterValue = (event.target as HTMLInputElement).value;
      // this.dataSource.filter = term.trim().toLowerCase();
    //   console.log(term)
    //   if(term){
    //   this.dataSource.filter = term.trim().toLowerCase();
    //   }
    //   else{
    //     this.data = "No data Found";
    //   }
    // }
    
    ngOnDestroy(){

    }

}

