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
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {dummyPrograms} from "../../models/dummyData";
import {ProgramType, programTypes} from "../../models/enums/programType";
import {programCouponColumns} from "../../models/displayed-columns/programCouponColumns";
import {programBuyXGetYColumns} from "../../models/displayed-columns/buyXGetYColumns";
import {mapMethods, TableColumn} from "../../models/classes/tableColumn";
import {TranslateModule} from "@ngx-translate/core";
import {TableColumnType} from "../../models/enums/tableColumnType";
import {DatePipe} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {AddProgramComponent} from "./add-program/add-program.component";
import {MatDialog} from "@angular/material/dialog";
import {OurTableComponent} from "../../_reusable-components/our-table/our-table.component";
import {Coupon} from "../../models/classes/coupon";
import {BuyXGetY} from "../../models/classes/buyXGetY";

@Component({
  selector: 'app-coupons',
  standalone: true,
  imports: [
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    MatExpansionPanelHeader,
    MatTable,
    MatColumnDef,
    TranslateModule,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    DatePipe,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatButton,
    MatIcon,
    OurTableComponent
  ],
  templateUrl: './coupons.component.html',
  styleUrl: './coupons.component.scss'
})
export class CouponsComponent {
  protected readonly programType = ProgramType;
  couponColumns: TableColumn[] = programCouponColumns;
  buyXGetYColumns: TableColumn[] = programBuyXGetYColumns;
  displayedColumns : { [key in ProgramType]?: string[] } = {};
  baseData = dummyPrograms
  tableColumnType = TableColumnType
  constructor(
    private dialog: MatDialog,
  ) {
    mapMethods(this,this.couponColumns);
    mapMethods(this,this.buyXGetYColumns);
  }
  openAddProgram(){
    let dialogRef = this.dialog.open(AddProgramComponent, {
      width: '650px',
      height: '600px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      this.baseData.push(result);
    });
  }
  openEditProgramLine(programLine : Coupon | BuyXGetY){
    console.log('edit', programLine)
  }
  openDeleteProgramLine(programLine : Coupon | BuyXGetY){
    console.log('delete', programLine)
  }

}
