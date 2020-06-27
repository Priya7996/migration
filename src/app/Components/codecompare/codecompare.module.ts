import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CodecompareComponent } from './codecompare.component';
import { SharedModule} from '../shared/shared.module';
import { CompareService} from '../../Service/app/compare.service';
const routes: Routes = [{ path: '', component: CodecompareComponent }];


@NgModule({
  declarations: [CodecompareComponent],
  imports: [RouterModule.forChild(routes),CommonModule,SharedModule,],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers:[CompareService]
})
export class CodecompareModule { }
