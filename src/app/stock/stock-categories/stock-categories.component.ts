import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {MatFormField} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {TranslateModule} from "@ngx-translate/core";
import {debounceTime, Subscription} from "rxjs";
import {EmployeeFilter} from "../../models/filters/employeeFilter";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {ConfigService} from "../../services/config.service";
import {Category} from "../../models/classes/category";
import {CategoryFilter} from "../../models/filters/categoryFilter";
import {dummyCategories} from "../../models/dummyData";
import {NgStyle} from "@angular/common";
import {AddCategoryComponent} from "./add-category/add-category.component";
import {mapMethods, TableColumn} from "../../models/classes/tableColumn";
import {categoryColumns} from "../../models/displayed-columns/categoryColumns";
import {OurTableComponent} from "../../_reusable-components/our-table/our-table.component";

@Component({
  selector: 'app-stock-categories',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatFormField,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatInput,
    MatPaginator,
    MatProgressSpinner,
    MatRow,
    MatRowDef,
    MatTable,
    ReactiveFormsModule,
    TranslateModule,
    NgStyle,
    MatHeaderCellDef,
    OurTableComponent
  ],
  templateUrl: './stock-categories.component.html',
  styleUrl: './stock-categories.component.scss'
})
export class StockCategoriesComponent implements OnInit{

  columns: TableColumn[] = categoryColumns;
  private valueChangeSubscription: Subscription;
  baseData = dummyCategories
  datasource:Category[] ;


  pageSizeOptions: number[] = [5, 10, 25, 100];
  filterForm: FormGroup;
  filter: CategoryFilter;
  length: number;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private configService: ConfigService,
    // private toastr: ToastrService
  ) {
    this.filter = new EmployeeFilter()
    mapMethods(this);
  }
  ngOnInit(): void {
    this.length = this.baseData.length;
    this.datasource = this.baseData.slice(0,this.filter.page_size);
    this.createForm();
  }
  createForm() {
    this.filterForm = this.fb.group({
      name_substr: [''],
      // description_substr: [''],
    });
    this.valueChangeSubscription = this.filterForm.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(data => {
      // this.configService.onFilterValueChanged(this.filterForm, this.filter, this.loadCategories);
      this.frontFilter();
    });
  }

  openAddCategory() {
    this.dialog.open(AddCategoryComponent, {
      width: '600px',
      height: '300px',
    }).afterClosed().subscribe(result => {
      if (result) {
        this.datasource.push(result);
        this.datasource = [...this.datasource]
      }
    });
  }
  loadCategories() {
  }


  //TODO: Check if it is possible to add this method to the ConfigService
  getPaginationData(event: PageEvent) {
    this.length = event.length;
    this.filter.page_number = event.pageIndex + 1;
    this.filter.page_size = event.pageSize;
    this.loadCategories();
  }
  openEditCategory(category: Category) {
    console.log('edit', category)
  }
  openDeleteCategory(category: Category) {
    console.log('delete', category)
  }

  frontFilter(event?: PageEvent) {
    const name = this.filterForm.value.name_substr
    const description = this.filterForm.value.description_substr
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
