import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutofillRoutingModule } from './autofill-routing.module';
import {AutofillDropdownComponent} from "./autofill-dropdown/autofill-dropdown.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";



@NgModule({
  declarations: [
    AutofillDropdownComponent,

  ],
  imports: [
    CommonModule,
    AutofillRoutingModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatInputModule
  ]
})
export class AutofillModule { }
