import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperatorAllocationComponent,Add } from './operator-allocation.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule} from '../shared/shared.module';
import { OperatorAllocationService} from '../../Service/app/operator-allocation.service';
const routes: Routes = [{ path: '', component: OperatorAllocationComponent }];

@NgModule({
  declarations: [OperatorAllocationComponent,Add],
  imports: [RouterModule.forChild(routes),
    CommonModule,SharedModule
  ],
  entryComponents:[Add],
  providers:[OperatorAllocationService]
  
})
export class OperatorAllocationModule { }
