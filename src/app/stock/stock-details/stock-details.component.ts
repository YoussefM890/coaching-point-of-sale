import { Component } from '@angular/core';
import {MatTabsModule} from "@angular/material/tabs";

@Component({
  selector: 'app-stock-details',
  standalone: true,
    imports: [
        MatTabsModule
    ],
  templateUrl: './stock-details.component.html',
  styleUrl: './stock-details.component.scss'
})
export class StockDetailsComponent {

}
