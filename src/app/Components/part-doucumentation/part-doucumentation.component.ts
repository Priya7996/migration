import { Component, OnInit } from '@angular/core';
import { NavbarService} from '../../Nav/navbar.service';

import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-part-doucumentation',
  templateUrl: './part-doucumentation.component.html',
  styleUrls: ['./part-doucumentation.component.scss']
})
export class PartDoucumentationComponent implements OnInit {
  dataSource  = new MatTableDataSource;
  constructor(private nav:NavbarService) {
    this.nav.show()

   }

  ngOnInit() {
  
  }

}
