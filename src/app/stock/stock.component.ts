import { Component } from '@angular/core';
import {MatTabsModule} from "@angular/material/tabs";
import {StockProductsComponent} from "./stock-products/stock-products.component";
import {StockCategoriesComponent} from "./stock-categories/stock-categories.component";
import {TranslateModule} from "@ngx-translate/core";
import {PricelistsComponent} from "../loyalty-discount/pricelists/pricelists.component";

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [
    MatTabsModule,
    StockProductsComponent,
    StockCategoriesComponent,
    TranslateModule
  ],
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.scss'
})
export class StockComponent {

}
