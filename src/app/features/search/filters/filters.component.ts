import { Component } from "@angular/core";
import { ToggleButton } from 'primeng/togglebutton';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'filters-panel',
  standalone: true,
  imports: [
		FormsModule,
		ToggleButton
	],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent {

	healthWheelchair: boolean = false;
	healthDementia: boolean = false;
	leisureBrain: boolean = false;
	leisureGarden: boolean = false;
	leisureGym: boolean = false;
	leisureShops: boolean = false;

}