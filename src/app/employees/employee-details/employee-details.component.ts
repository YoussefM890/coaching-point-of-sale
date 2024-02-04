import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {Router, RouterLink} from "@angular/router";
import {debounceTime, filter} from "rxjs";
import {MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {Employee} from "../../models/classes/employee";
import {MatTabsModule} from "@angular/material/tabs";
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {NgStyle} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {EmployeeFilter} from "../../models/filters/employeeFilter";
import {TranslateModule} from "@ngx-translate/core";
import {dummyEmployees} from "../../models/dummyData";
import {AddEmployeeComponent} from "../add-employee/add-employee.component";
import {TableColumnType} from "../../models/enums/tableColumnType";
import {employeeColumns} from "../../models/displayed-columns/employeeColumns";
import {getDisplayedColumns, mapMethods, TableColumn} from "../../models/classes/tableColumn";
import {OurTableComponent} from "../../_reusable-components/our-table/our-table.component";
import {ImportComponent} from "../../_reusable-components/import/import.component";
import {employeePossibleFields} from "../../models/possible-fields/ImportEmployeeFields";


@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [
    MatTabsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    NgStyle,
    RouterLink,
    TranslateModule,
    OurTableComponent
  ],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss'
})
export class EmployeeDetailsComponent implements OnInit,AfterViewInit {
  protected readonly tableColumnType = TableColumnType;
  columns: TableColumn[] = employeeColumns;
  baseData = dummyEmployees
  datasource: Employee[];

  pageSizeOptions: number[] = [5, 10, 25, 100];
  filterForm: FormGroup;
  filter: EmployeeFilter;
  length: number;


  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    // private toastr: ToastrService
  ) {
    this.filter = new EmployeeFilter();
    mapMethods(this);
  }

  ngOnInit(): void {
    this.length = this.baseData.length
    this.datasource = this.baseData.slice(0,this.filter.page_size);
    this.createForm();
  }
  ngAfterViewInit() {
    this.loadEmployees();
  }

  createForm() {
    this.filterForm = this.fb.group({
      name_substr: [''],
      cin_substr: [''],
    });
    this.filterForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe((data) => this.frontFilter());
  }
  loadEmployees() {
    return ;
    // this.userService.getUsers(this.userFilter).subscribe(
    //   (res: any) => {
    //     this.datasource = res.list;
    //     this.isEmptyList = res.list.length === 0;
    //     this.length = res.total_records;
    //   },
    //   errMess => {
    //     this.errMess = <any>errMess;
    //     this.logout();
    //   }
    // );
  }

  openAddEmployee() {
    let dialogRef = this.dialog.open(AddEmployeeComponent, {
      width: '650px',
      height: '600px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      this.baseData.push(result);
    });
  }

  openEditEmployee(employee:Employee){
    console.log('edit', employee)
  }
  openDeleteEmployee(employee:Employee){
    console.log('delete', employee)
  }

  openImportEmployees() {
    let dialogRef = this.dialog.open(ImportComponent, {
      width: '100vw',
      height: '100vh',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: {
        possibleFields: employeePossibleFields,
      }
    });
  }
  changeActivationStatus(employee: Employee) {
    return;
    //   let dialogRef = this.dialog.open(DeleteUserComponent, {
    //     width: '300px',
    //     height: '150px',
    //     data: {
    //       user: user,
    //     },
    //   });
    //   dialogRef.afterClosed().subscribe((result) => {
    //     this.loadUsers();
    //   });
  }

  public getPaginationData(event: PageEvent): void {
    this.length = event.length;
    this.filter.page_number = event.pageIndex + 1;
    this.filter.page_size = event.pageSize;
    this.loadEmployees();
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
      this.datasource = data.slice(0, this.filter.page_size)
    }
  }
}
