import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AnothercodeComponent } from './anothercode.component';
import { SharedModule} from '../shared/shared.module';

const routes: Routes = [{ path: '', component: AnothercodeComponent }];


@NgModule({
  declarations: [AnothercodeComponent],
  imports: [RouterModule.forChild(routes),
    CommonModule,SharedModule
    
  ]
})
export class AnothercodeModule { }
