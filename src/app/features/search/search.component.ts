import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { AngularGoogleMapsComponent } from './maps/maps.component';
import { ListboxModule } from 'primeng/listbox';
import { SplitterModule } from 'primeng/splitter';
import { MenubarModule } from 'primeng/menubar';

import merchants_ES_AS from '../../../assets/data/ES_AS.json';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { PanelModule } from 'primeng/panel';
import { DataImportsService } from '../../services/dataImportsService';
import { FiltersComponent } from './filters/filters.component';
import { SelectorsComponent } from './selectors/selectors.component';
import { MapMarker } from '@angular/google-maps';
import { SvgIconComponent } from '../../shared/svg-icon/svg-icon.component';

interface Coords {
	lat: number;
  lng: number;
	zoom: number;
}

@Component({
  selector: 'search-page',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
	standalone: true,
  imports: [CommonModule, RouterOutlet, InputTextModule, AngularGoogleMapsComponent, ListboxModule, SplitterModule, MenubarModule, ScrollPanelModule, PanelModule, FiltersComponent, SelectorsComponent, SvgIconComponent],
})
export class SearchPage {

	Math = Math; //explicitly bind the Math library so it's usable in template

	@ViewChild(SelectorsComponent) selectors!: SelectorsComponent;

  merchants: any[];
  coords: Coords;

	desktop: boolean = true;

  constructor(private dataImportsService: DataImportsService) {

		if (document.documentElement.clientWidth < 400) {
			this.desktop = false;
		}

		// https://cuernavaca.infoisinfo.com.mx/busqueda/asilo
		this.merchants = merchants_ES_AS.RES.sort((a,b) => a.score && b.score ? (Number(b.score) - Number(a.score)) : -1)
		this.coords = merchants_ES_AS.coords;
	}

	onChange(change: boolean) {
    console.log(this.selectors.selectedCountryCode);
    console.log(this.selectors.selectedCityCode);

		this.dataImportsService
				.loadData(this.selectors.selectedCountryCode, this.selectors.selectedCityCode)
				.then(result => {

					if (this.selectors.selectedServiceCode === 'RE')
						this.merchants = result.RES.sort((a: any,b: any) => a.score && b.score ? ((b.score as number) - (a.score as number)) : -1)
					else if (this.selectors.selectedServiceCode === 'CD')
						this.merchants = result.CD;
					else if (this.selectors.selectedServiceCode === 'AD')
						this.merchants = result.AD;

					this.coords = result.coords;
					console.log(result.coords);
					
				})
	}

	// list hover events
	overListItem(){
    console.log("Mouseover ListItem called");
  }
	outListItem(){
    console.log("Mouseout ListItem called");
  }

	// marker over events
	onMarkerOver(marker: MapMarker) {
    console.log("Mouseover Marker Over", marker);
	}
	onMarkerOut(marker: MapMarker) {
    console.log("Mouseover Marker Out", marker);
	}


}
