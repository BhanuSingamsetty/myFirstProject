import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormsModule }  from '@angular/forms';
import { FilterPipe} from './components/flight-pipe/flight-pipe.component';
import { FlightSearchComponent } from './components/flight-search/flight-search.component';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';


const appRoutes : Routes = [
 {path: '', component:FlightSearchComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    FlightSearchComponent,
    NavbarComponent,
    SidebarComponent,
  ],

  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule {}


