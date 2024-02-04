import { Component } from '@angular/core';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelDescription, MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {TranslateModule} from "@ngx-translate/core";
import {getDisplayedColumns, mapMethods, TableColumn} from "../../models/classes/tableColumn";
import {pricelistProductColumns} from "../../models/displayed-columns/pricelistProductColumns";
import {dummyPricelists} from "../../models/dummyData";
import {TableColumnType} from "../../models/enums/tableColumnType";
import {DatePipe} from "@angular/common";
import {Pricelist} from "../../models/classes/pricelist";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {OurTableComponent} from "../../_reusable-components/our-table/our-table.component";

@Component({
  selector: 'app-pricelists',
  standalone: true,
  imports: [
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    MatExpansionPanelHeader,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    TranslateModule,
    MatHeaderCellDef,
    DatePipe,
    MatButton,
    MatIcon,
    OurTableComponent,
  ],
  templateUrl: './pricelists.component.html',
  styleUrl: './pricelists.component.scss'
})
export class PricelistsComponent {
  columns: TableColumn[] = pricelistProductColumns
  baseData:Pricelist[] = dummyPricelists
  displayedColumns : string[]
  tableColumnType = TableColumnType
constructor() {
    mapMethods(this);
}
  openEditPricelist(pricelist: Pricelist) {
    console.log("edit", pricelist)
  }
  openDeletePricelist(pricelist: Pricelist) {
    console.log("delete", pricelist)
  }
}
