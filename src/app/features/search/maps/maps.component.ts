import {Component, EventEmitter, Input, Output, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {GoogleMap, MapCircle, MapInfoWindow, MapMarker} from "@angular/google-maps";
import { SelectorsComponent } from '../selectors/selectors.component';

interface Coords {
	lat: number;
  lng: number;
	zoom: number;
}
interface IMapCircleOptions{
  fillColor: string;
  fillOpacity: number;
  strokeWeight: number;
  strokeColor: string;
  clickable: boolean;
  editable: boolean;
  zIndex: number;
  radius: number;
}
export interface IMapCircle{
  id: number;
  lat: number;
  lng: number;
  circleOptions: IMapCircleOptions;
  markerOptions: IMapMarker;
  markerWindowInfo: {
    html: string;
  }
}
interface IMapMarker{
  lat: number;
  lng: number;
  label?: {
    text: string;
    className: string;
    fontSize: string;
  };
	id: string,
}

@Component({
  selector: 'app-angular-google-maps',
  standalone: true,
  imports: [
    GoogleMap,
    MapCircle,
    MapMarker,
    MapInfoWindow
  ],
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.scss'
})
export class AngularGoogleMapsComponent {

	@Input('coordsCopy') coordsCopy!: Coords;
	@Input('merchantsCopy') merchantsCopy!: any[];
	@Input('selectorsCopy') selectorsCopy!: SelectorsComponent;

	@Output() onMakerOverEvent = new EventEmitter<MapMarker>();
	@Output() onMakerOutEvent = new EventEmitter<MapMarker>();

	@ViewChild(GoogleMap) googleMap!: GoogleMap;
  @ViewChildren(MapInfoWindow) infoWindows!: QueryList<MapInfoWindow>;

	bounds: any;
	options: google.maps.MapOptions = {};
  circles: IMapCircle[] = [];

	ngOnInit() {
		this.reloadData();
  }
	ngOnChanges(changes: any) {
		this.reloadData();
	}
	reloadData() {

		let north: number = 99999;
		let south: number = 0;
		let east: number = 0;
		let west: number = 99999;

		this.circles = [];
		this.merchantsCopy.forEach(merchant => {
			// add marker
			const coords = merchant.coords.split(',');
			const lng = parseFloat(coords[0]);
			const lat = parseFloat(coords[1]);
			this.addMarker(lng, lat, merchant);

			// recalculate bounds
			north = north !== undefined ? Math.max(north, lat) : lat;
			south = south !== undefined ? Math.min(south, lat) : lat;
			east = east !== undefined ? Math.max(east, lng) : lng;
			west = west !== undefined ? Math.min(west, lng) : lng;
		});

		this.options = {
			center: {lat: this.coordsCopy.lat, lng: this.coordsCopy.lng},
			zoom: this.coordsCopy.zoom,
		};

		this.bounds = { north, south, east, west };
	}
	// https://spatialized.io/advanced-google-maps-markers-definitive-guide-94c5a070615e436ab0a255b9f5100a88
  addMarker(lat: any, lng: any, merchant: any) {
    this.circles.push({
      id: this.circles.length + 1,
      lat: lat,
      lng: lng,
      circleOptions: {
        fillColor: '#ff0000',
        fillOpacity: 0.5,
        strokeWeight: 1,
        strokeColor: '#ff0000',
        clickable: false,
        editable: false,
        zIndex: 1,
        radius: 10 // in meters
      },
      markerOptions: {
				id: "MK_" + merchant.id,
        lat: lat,
        lng: lng,
				icon: {
					path: this.selectorsCopy === undefined ? "M2 2H0V14H2V12H14V14H16V9C16 7.34315 14.6569 6 13 6H6C6 4.89543 5.10457 4 4 4H2V2Z" :
								this.selectorsCopy.selectedServiceCode == 'RE' ? "M2 2H0V14H2V12H14V14H16V9C16 7.34315 14.6569 6 13 6H6C6 4.89543 5.10457 4 4 4H2V2Z" :
								this.selectorsCopy.selectedServiceCode == 'CD' ? ( merchant.gob == 'yes' ? 
																																 "M8.031 16.5c0 4.143 3.358 7.5 7.5 7.5s7.5-3.357 7.5-7.5-3.357-7.5-7.5-7.5c-4.142 0-7.5 3.357-7.5 7.5zM15.531 3.75l-2.109 4.219h4.219l-2.11-4.219zM24.543 7.457l-4.475 1.491 2.982 2.983 1.493-4.474zM10.994 8.948l-4.474-1.491 1.491 4.475 2.983-2.984zM6.969 14.359l-4.219 2.11 4.219 2.109v-4.219zM24.031 18.641l4.219-2.109-4.219-2.109v4.218zM15.531 29.25l2.109-4.219h-4.219l2.11 4.219zM20.068 24.052l4.475 1.491-1.492-4.475-2.983 2.984zM6.52 25.543l4.475-1.491-2.983-2.983-1.492 4.474z" : 
																																 "M8.031 16.5c0 4.143 3.358 7.5 7.5 7.5s7.5-3.357 7.5-7.5-3.357-7.5-7.5-7.5c-4.142 0-7.5 3.357-7.5 7.5zM15.531 3.75l-2.109 4.219h4.219l-2.11-4.219zM24.543 7.457l-4.475 1.491 2.982 2.983 1.493-4.474zM10.994 8.948l-4.474-1.491 1.491 4.475 2.983-2.984zM6.969 14.359l-4.219 2.11 4.219 2.109v-4.219zM24.031 18.641l4.219-2.109-4.219-2.109v4.218zM15.531 29.25l2.109-4.219h-4.219l2.11 4.219zM20.068 24.052l4.475 1.491-1.492-4.475-2.983 2.984zM6.52 25.543l4.475-1.491-2.983-2.983-1.492 4.474z" ) :
								this.selectorsCopy.selectedServiceCode == 'AM' ? "M2 2H0V14H2V12H14V14H16V9C16 7.34315 14.6569 6 13 6H6C6 4.89543 5.10457 4 4 4H2V2Z" :
								this.selectorsCopy.selectedServiceCode == 'AD' ? "M1 6V15H6V11C6 9.89543 6.89543 9 8 9C9.10457 9 10 9.89543 10 11V15H15V6L8 0L1 6Z" :
								"",
					strokeColor: "#000000",
					fillColor:  merchant.score > 4.4 ? "#0F4D0F" : 
											merchant.score > 3.9 ? "#5CE65C" : 
											merchant.score > 3.6 ? "#FFCCCC" : 
											merchant.score > 3 ? "#F08080" : 
											merchant.score > 0 ? "#8B0000" : 
											"#ffffff",
					fillOpacity: 1.0,
					scale: 1
				},
        /*label: {
          //text: merchant.num.length > 0 ? merchant.num : '-',
          text: merchant.name,
          className: 'circle-label',
          fontSize: '12px'
        },*/
      },
      markerWindowInfo: {
        html: '<div>' + (merchant.web ? '<a href=\"' + merchant.web + '\" target=\"_blank\">' + merchant.name + '</a>' : merchant.name) + " (" + merchant.score + ")" + '</div>'
							+ '<div>' + merchant.address + '</div>'
							+ '<p>'
								+ (merchant.gob ? '<span>Público</span>' :  '')
								+ (merchant.gob && merchant.num ? '<span> • </span>' : '')
								+ (merchant.num ? '<span>' + merchant.num + ' Plazas</span>' :  '')
								+ (merchant.num && merchant.price ? '<span> • </span>' : '')
								+ (merchant.price && merchant.price ? '<span>Desde ' + merchant.price + '</span>' : '')
								+ (merchant.gob && merchant.num && merchant.price ? '<span> • </span>' : '')
								+ '<span> • <a href="https://www.google.com/maps/search/?api=1&query=' + merchant.coords + '" target="_blank">Mapa</a></span>'
							+ '</p>'
      }
    } as IMapCircle);

  }
	ngAfterViewInit() {
		// map available on ngAfterViewInit
		console.log("googleMap bounds", this.bounds);
		this.googleMap.googleMap?.fitBounds(this.bounds);
	}

  clickMap(event: google.maps.MapMouseEvent) {
		// do nothing
  }
  openMarkerInfoWindow(marker: MapMarker, markerIndex: number) {
    this.infoWindows.forEach((infoWindow: MapInfoWindow, index: number ) => {
      if (index === markerIndex) {
        infoWindow.open(marker);
      } else {
        infoWindow.close();
      }
    });
  }

	// emit marker events
	mouseOverMarker(marker: MapMarker) {
		this.onMakerOverEvent.emit(marker);
  }
	mouseOutMarker(marker: MapMarker) {
		this.onMakerOutEvent.emit(marker);
  }

}
