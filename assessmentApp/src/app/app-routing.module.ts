import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryDashboardComponent } from './public/library-dashboard/library-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: LibraryDashboardComponent,
  }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule]

})
export class AppRoutingModule { }
