import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})

export class SidebarComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<object>();

     originCity: string;
     destinationCity: string;
     passengersCount: number

     departureDate: string;
     returnDate: string;
     filterBy: string;
     sideBarObject = {};
     refineRange = 5000;
     citiesLists = [];
     roundTrip = false;
     showOriginCity = false;
     showDestinationCity = false;

  constructor(private httpService: HttpClient ) {
     this.originCity = '';
         this.destinationCity = '';
         this.passengersCount = 0;
         this.departureDate = '';
         this.returnDate = '';
         this.filterBy = '';
  }

  ngOnInit() {
   this.httpService.get('./assets/app.citiesdata.json').subscribe(
      data => {
        this.citiesLists = data as string [];
      }
    );
  }

  showDropdown( text, code ) {
    if( code == 'origin' ) {
      if( text.length != 0 ) {
         this.showOriginCity = true;
       } else {
         this.showOriginCity = false;
       }
    } else if( code == 'destination' ) {
       if( text.length != 0 ) {
         this.showDestinationCity = true;
       } else {
         this.showDestinationCity = false;
       }
    }
  }

  onListSelect( object, code ) {
     if( code == 'origin' ) {
       this.originCity = object.code;
       this.showOriginCity = !this.showOriginCity;
     } else if( code == 'destination' ){
        this.destinationCity = object.code;
        this.showDestinationCity = !this.showDestinationCity;
     }
  }

  tripType ( type ) {
       if( type == 'oneWay' ) {
         this.roundTrip = false;
         this.returnDate = '';
       } else {
         this.roundTrip = true;
       }
    }

  filterFlightData(filterBy) {
    this.filterBy = filterBy;
    this.messageEvent.emit(this);
  }
}
