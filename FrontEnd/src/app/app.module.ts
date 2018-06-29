import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { AppRoutingModule }     from './app-routing.module';

import { AppComponent }         from './app.component';
import { ProfileComponent }  from './profile/profile.component';
import { OverviewComponent }      from './overview/overview.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    OverviewComponent,
    ProfileComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor(){}
}
