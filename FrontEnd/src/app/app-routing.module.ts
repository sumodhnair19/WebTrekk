import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent }      from './overview/overview.component';
import { ProfileComponent }  from './profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/overview', pathMatch: 'full' },
  { path: 'overview', component: OverviewComponent },
  { path: 'profile/:id', component: ProfileComponent },
];

@NgModule({
  imports:  [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
