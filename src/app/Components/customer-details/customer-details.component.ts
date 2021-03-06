import { Component, OnInit } from '@angular/core';
import { CustomerDetailsService } from '../../Service/app/customer-details.service';
import { MatTableDataSource } from '@angular/material';
import { NavbarService} from '../../Nav/navbar.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'phonenumber', 'address', 'createddate', ];
  dataSource  = new MatTableDataSource;
  back: any;
  constructor(private service:CustomerDetailsService,private nav:NavbarService) {
    this.nav.show();
   }

  ngOnInit() {
    this.service.fifth_api().subscribe(res =>{
      console.log(res);
      this.back = res;
      this.dataSource = new MatTableDataSource(this.back)

    })
  }

}
