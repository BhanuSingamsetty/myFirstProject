import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css'],
 })

export class FlightSearchComponent implements OnInit {
   data: string[];
   flightData: string[];
   refineFlightData: string[];
   filterdFlightData: string[];
   refineFlightDataCopy = [];
   originCity = '';
   destinationCity = '';
   roundTrip = false;

  constructor (private httpService: HttpClient) {
     this.data = [];
     this.flightData = [];
     this.refineFlightData = [];
     this.filterdFlightData = [];
  }

  ngOnInit () {
    this.httpService.get('./assets/app.flightdata.json').subscribe(
      data => {
        this.flightData = data as string [];
        this.refineFlightDataCopy = Object.assign([], this.flightData);
      }
    );
  }

   dateComparer(firstDate, secondDate) {
      let x = new Date(secondDate);;

      let dateString = x.getFullYear() + "-" +(x.getMonth() + 1) + "-" + x.getDate();

      return (firstDate == dateString);
    };

   flightSearch( sideBarObject ) {
        if( sideBarObject.originCity.length == 0 &&
              sideBarObject.destinationCity.length == 0 ) {

              if( sideBarObject.filterBy == 'fromRefine' ) {
                this.refineFlightSearch(sideBarObject.refineRange);
              }
          return;
        }

        this.filterdFlightData.splice(0, this.filterdFlightData.length);

        for (let i = 0; i < this.refineFlightDataCopy.length; i++) {
            let curFlight = this.refineFlightDataCopy[i];

            if (sideBarObject.originCity.includes(curFlight.from) && sideBarObject.destinationCity.includes(curFlight.to)) {
                if ( this.dateComparer(curFlight.date, sideBarObject.departureDate) &&
                        parseInt(curFlight.seats) >= sideBarObject.passengersCount &&
                          parseInt(curFlight.price) <= sideBarObject.refineRange ) {
                          this.filterdFlightData.push(curFlight);
                }

            } else if (sideBarObject.roundTrip && (sideBarObject.originCity.includes(curFlight.to) && sideBarObject.destinationCity.includes(curFlight.from))) {
                if ( this.dateComparer(curFlight.date, sideBarObject.returnDate) &&
                        parseInt(curFlight.seats) >= sideBarObject.passengersCount &&
                          parseInt(curFlight.price) <= sideBarObject.refineRange) {
                          this.filterdFlightData.push(curFlight);
                }
            }
          }
          this.flightData = this.filterdFlightData;
   }

    refineFlightSearch(range) {
      this.refineFlightData.splice(0, this.refineFlightData.length);
      for (var i = 0; i < this.refineFlightDataCopy.length; i++) {
        var curFlight = this.refineFlightDataCopy[i];
        if( curFlight.price <= range ) {
          this.refineFlightData.push(curFlight);
        }
      }

      this.flightData = this.refineFlightData;
    }

    recivedMessage(event) {
      this.flightSearch( event );

      this.originCity = event.originCity;
      this.destinationCity = event.destinationCity;
      this.roundTrip = event.roundTrip;
    }
}
