import {Component, OnInit} from '@angular/core';
import {MatTableModule} from "@angular/material/table";
import {TranslateModule} from "@ngx-translate/core";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {DatePipe, NgStyle} from "@angular/common";
import {Order} from "../models/classes/order";
import {dummyOrders} from "../models/dummyData";
import {OrderFilter} from "../models/filters/orderFilter";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {debounceTime} from "rxjs";
import {mapMethods, TableColumn} from "../models/classes/tableColumn";
import {orderColumns} from "../models/displayed-columns/orderColumns";
import {OurTableComponent} from "../_reusable-components/our-table/our-table.component";

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    MatTableModule,
    TranslateModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgStyle,
    MatPaginator,
    MatProgressSpinner,
    DatePipe,
    OurTableComponent
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  columns:TableColumn[] = orderColumns;
  baseData = dummyOrders;
  datasource: Order[];

  pageSizeOptions: number[] = [5, 10, 25, 100];
  filterForm: FormGroup;
  filter: OrderFilter;
  length: number ;
  constructor(
  ) {
    this.filter = new OrderFilter();
    mapMethods(this);
  }
  ngOnInit(): void {
    this.length = this.baseData.length
    this.datasource = this.baseData.slice(0,this.filter.page_size);
    this.createForm();
  }


  //TODO : clean the filter
  createForm() {
    this.filterForm = new FormGroup({
      orderRef: new FormControl(this.filter.orderRef),
      sessionId: new FormControl(this.filter.sessionId),
      receiptNumber: new FormControl(this.filter.receiptNumber),
      employee: new FormControl(this.filter.employee),
    });
   this.filterForm.valueChanges.pipe(debounceTime(500)).subscribe(() => {
      this.frontFilter();
    });
  }
  openEditOrder(order: Order) {
    console.log('edit order', order)
  }
  openDeleteOrder(order: Order) {
    console.log('delete order', order)
  }
  frontFilter(event?: PageEvent) {
    const orderRef = this.filterForm.value.orderRef
    const sessionId = this.filterForm.value.sessionId
    const receiptNumber = this.filterForm.value.receiptNumber
    const employee = this.filterForm.value.employee
    let data = [...this.baseData]
    if (orderRef) {
      data = data.filter((item) => item.order_ref.toString().includes(orderRef.toLowerCase()))
    }
    if (sessionId) {
      data = data.filter((item) => item.session_id.toString().includes(sessionId.toLowerCase()))
    }
    if (receiptNumber) {
      data = data.filter((item) => item.receipt_number.toString().includes(receiptNumber.toLowerCase()))
    }
    if (employee) {
      data = data.filter((item) => item.employee_name.toLowerCase().includes(employee.toLowerCase()))
    }
    this.length = data.length
    if (event) {
      this.datasource = data.slice(event.pageIndex * event.pageSize, event.pageIndex * event.pageSize + event.pageSize);
    }
    else {
      this.datasource = data.slice(0, this.filter.page_size)
    }
  }
}
