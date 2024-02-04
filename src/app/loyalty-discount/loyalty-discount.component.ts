import { Component } from '@angular/core';
import {MatTab, MatTabContent, MatTabGroup} from "@angular/material/tabs";
import {CouponsComponent} from "./coupons/coupons.component";
import {PricelistsComponent} from "./pricelists/pricelists.component";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-loyalty-discount',
  standalone: true,
  imports: [
    MatTab,
    MatTabContent,
    MatTabGroup,
    CouponsComponent,
    PricelistsComponent,
    TranslateModule
  ],
  templateUrl: './loyalty-discount.component.html',
  styleUrl: './loyalty-discount.component.scss'
})
export class LoyaltyDiscountComponent {

}
