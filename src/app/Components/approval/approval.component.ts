import { MatTableDataSource } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { ApprovalService } from '../../Service/app/approval.service';
@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.scss']
})
export class ApprovalComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'action'];
  
  dataSource = new MatTableDataSource;
  approval: any;
  

  constructor(private service:ApprovalService) { }

  ngOnInit() {

    this.service.second_api().subscribe(res =>{
      console.log(res)
      this.approval=res;

      this.dataSource=new MatTableDataSource(this.approval)

    })
  }

}
