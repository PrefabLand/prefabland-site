import { Component, EventEmitter, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SelectChangeEvent, SelectModule } from "primeng/select";

import countries from '../../../../assets/data/countries.json'

interface Service {
  name: string;
  code: string;
	inactive: boolean;
}
interface City {
  name: string;
  code: string;
	inactive: boolean;
}
interface Country {
  name: string;
  code: string;
	inactive: boolean;
}

@Component({
  selector: 'selectors-panel',
  standalone: true,
  imports: [FormsModule, SelectModule, SelectorsComponent],
  templateUrl: './selectors.component.html',
  styleUrl: './selectors.component.scss'
})
export class SelectorsComponent {

	@Output() onChangeEvent = new EventEmitter<boolean>();

	services: Service[];
	selectedServiceCode = 'RE';

  cities: City[];
	selectedCityCode = 'AM';

  countries: Country[];
	selectedCountryCode = 'ES';

	constructor() {

		this.services = [
      { name: "Casas Modulares", code: "RE", inactive: false },
      { name: "Casas Prefabricadas", code: "CD", inactive: false },
    ];
    
		this.countries = countries;
		
		this.cities = this.preselectCountry('ES').filter(function(item){ return item.visible; });
	}

	preselectCountry(code: string) {
		return countries.filter(function(item){ return item.code == code; })[0].cities;
	}

	selectCountry(event: SelectChangeEvent) {
		this.cities = countries.filter(function(item){ return item.code == event.value; })[0].cities.filter(function(item){ return item.visible; });
		this.selectedCountryCode = event.value;
		this.selectedCityCode = this.cities.filter(function(item){ return item.inactive == false; })[0].code;

		this.onChange(event);
	}

	onChange(event: SelectChangeEvent) {
    console.log("on change in child");
    console.log("on change in child", event);
    console.log('selectedCountryCode', this.selectedCountryCode);
    console.log('selectedCityCode', this.selectedCityCode);

		this.onChangeEvent.emit(true);
	}
}
