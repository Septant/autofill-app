import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AutofillDropdownComponent} from "./autofill-dropdown/autofill-dropdown.component";
import {RoutingPaths} from "../../common/modulePaths";

const routes: Routes = [
  {
    path: RoutingPaths.autofill,
    component: AutofillDropdownComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutofillRoutingModule { }
