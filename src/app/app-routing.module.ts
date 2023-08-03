import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AutofillRoutingModule} from "./modules/autofill/autofill-routing.module";
import {ModulePaths} from "./common/modulePaths";



const routes: Routes = [
  {
    path: ModulePaths.autofill, loadChildren: () => import('./modules/autofill/autofill.module').then(m => m.AutofillModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AutofillRoutingModule],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
