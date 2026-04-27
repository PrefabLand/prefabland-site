import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataImportsService {

	// https://socialasturias.asturias.es/documents/38532/0/Acreditados+para+el+portal+enero2025+%281%29.pdf/c5f9c2d5-df84-2003-df96-487007abb500?t=1738916712073
	loadData (country: string, city: string) {
		return import('../../assets/data/' + country + '_' + city + '.json').then(m=> m)
	} 

}