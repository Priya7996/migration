import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PartDoucumentationRoutingModule } from './part-doucumentation-routing.module';
import { PartDoucumentationComponent } from './part-doucumentation.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: PartDoucumentationComponent }];


@NgModule({
  declarations: [PartDoucumentationComponent],
  imports: [RouterModule.forChild(routes),
    CommonModule,SharedModule,
    PartDoucumentationRoutingModule
  ]
})
export class PartDoucumentationModule { }
