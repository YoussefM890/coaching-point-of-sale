import {Component, OnInit} from '@angular/core';
import {TableColumnType} from "../models/enums/tableColumnType";
import {DatePipe, NgClass, NgStyle} from "@angular/common";
import {
  MatCell,
  MatCellDef, MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef, MatTable
} from "@angular/material/table";
import {TranslateModule} from "@ngx-translate/core";
import {getDisplayedColumns, mapMethods, TableColumn} from "../models/classes/tableColumn";
import {customerColumns} from "../models/displayed-columns/customerColumns";
import {dummyCustomers} from "../models/dummyData";
import {Customer} from "../models/classes/customer";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {CustomerFilter, CustomerFilterFormField, customerFilterFormFields} from "../models/filters/customerFilter";
import {debounceTime, Subscription} from "rxjs";
import {ConfigService} from "../services/config.service";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatIcon} from "@angular/material/icon";
import {OurTableComponent} from "../_reusable-components/our-table/our-table.component";
import {MatDialog} from "@angular/material/dialog";
import {AddCustomerComponent} from "./add-customer/add-customer.component";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    DatePipe,
    MatCell,
    MatCellDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    TranslateModule,
    MatColumnDef,
    MatHeaderCellDef,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    NgStyle,
    MatPaginator,
    MatProgressSpinner,
    NgClass,
    MatIcon,
    OurTableComponent,
    MatButton
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent implements OnInit {
  private valueChangesSubscription: Subscription;
  protected readonly tableColumnType = TableColumnType;

  columns: TableColumn[] = customerColumns
  baseData = dummyCustomers;
  datasource: Customer[];

  pageSizeOptions: number[] = [5, 10, 25, 100];
  filterForm: FormGroup;
  filter: CustomerFilter;
  length: number;

  formFields: CustomerFilterFormField[] = customerFilterFormFields;


  constructor(
    private configService: ConfigService,
    private dialog: MatDialog,
  ) {
    this.filter = new CustomerFilter()
    mapMethods(this);
  }
  ngOnInit(): void {
    this.createForm()
    this.length = this.baseData.length
    this.datasource = this.baseData.slice(0,this.filter.page_size)
  }

  createForm(): void {
    this.filterForm = this.configService.createForm(this.formFields);
    this.valueChangesSubscription = this.filterForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe(() => {
        this.configService.onFilterValueChanged(this.filterForm, this.filter, () => {
          this.frontFilter();
        });
      });
  }
  frontFilter(event?: PageEvent) {
    const name = this.filterForm.value.name_substr
    let data = [...this.baseData]
    if (name) {
      data = data.filter((item) => item.name.toLowerCase().includes(name.toLowerCase()))
    }
    this.length = data.length
    if (event) {
      this.datasource = data.slice(event.pageIndex * event.pageSize, event.pageIndex * event.pageSize + event.pageSize);
    }
    else {
      this.datasource = data.slice(0, this.baseData.length)
    }
  }
  openAddCustomer(){
    let dialogRef = this.dialog.open(AddCustomerComponent, {
      width: '650px',
    })
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('result', result)
        this.baseData.push(result)
      }
    });
  }
  openEditCustomer(customer:Customer){
    console.log('edit', customer)
  }
  openDeleteCustomer(customer:Customer){
    console.log('delete', customer)
  }
}
