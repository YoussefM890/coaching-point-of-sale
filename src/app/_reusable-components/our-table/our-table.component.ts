import {Component, Input, OnInit} from '@angular/core';
import {TableColumnType} from "../../models/enums/tableColumnType";
import {customerColumns} from "../../models/displayed-columns/customerColumns";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {TranslateModule} from "@ngx-translate/core";
import {DatePipe, NgClass} from "@angular/common";
import {ConfigService} from "../../services/config.service";
import {CustomerFilter} from "../../models/filters/customerFilter";
import {getDisplayedColumns, TableColumn} from "../../models/classes/tableColumn";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-our-table',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    TranslateModule,
    NgClass,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCellDef,
    MatCell,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRow,
    DatePipe,
    MatRowDef,
    MatIcon
  ],
  templateUrl: './our-table.component.html',
  styleUrl: './our-table.component.scss'
})
export class OurTableComponent implements OnInit {

  @Input() dataSource: any[];
  @Input() columns: TableColumn[];
  displayedColumns: string[];
  protected readonly tableColumnType = TableColumnType;
  ngOnInit(): void {
    this.displayedColumns = getDisplayedColumns(this.columns)

  }
}
