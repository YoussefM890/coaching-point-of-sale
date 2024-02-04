import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {CurrencyPipe, NgStyle} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {TranslateModule} from "@ngx-translate/core";
import {debounceTime, Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ConfigService} from "../../services/config.service";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Product} from "../../models/classes/product";
import {dummyProducts} from "../../models/dummyData";
import {
  ProductFilter,
  ProductFilterFormField, productFilterFormFields,
} from "../../models/filters/productFilter";
import {MatIcon} from "@angular/material/icon";
import {AddProductComponent} from "./add-product/add-product.component";

@Component({
  selector: 'app-stock-products',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    CurrencyPipe,
    FormsModule,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    TranslateModule,
    NgStyle,
    MatIcon,
    MatLabel,
    MatPaginator
  ],
  templateUrl: './stock-products.component.html',
  styleUrl: './stock-products.component.scss'
})
export class StockProductsComponent implements OnInit{
  private valueChangesSubscription: Subscription;
  filterForm: FormGroup;
  filter: ProductFilter;
  formFields: ProductFilterFormField[];
  length: number;
  baseData = dummyProducts;
  products: Product[] ;
  pageSizeOptions: number[] = [5, 10, 25, 100];



  constructor(private fb: FormBuilder,
              private dialog: MatDialog,
              private configService: ConfigService,
              // private toastr: ToastrService,
              // private route: ActivatedRoute
  ) {
    this.filter = new ProductFilter();
    this.formFields = productFilterFormFields;
  }

  ngOnInit(): void {
    console.log(dummyProducts)
    this.length = this.baseData.length;
    this.products = this.baseData.slice(0, this.filter.page_size);
    this.createForm();
  }

  createForm() {
    this.filterForm = this.configService.createForm(this.formFields);
    this.valueChangesSubscription = this.filterForm.valueChanges.pipe(
      debounceTime(500),
    ).subscribe((data) => {
      this.frontFilter()
    });
  }
  loadProducts() {
  }
  openAddProduct(){
    this.dialog.open(AddProductComponent, {
      width: '600px',
      height: '500px',
    }).afterClosed().subscribe(result => {
      if (result) {
        this.baseData.push(result);
        // this.datasource = [...this.datasource]
      }
    });
    }
  openImportProducts() {
  }
  getPaginationData(event: PageEvent): void {
    this.length = event.length;
    this.filter.page_number = event.pageIndex + 1;
    this.filter.page_size = event.pageSize;
    this.loadProducts();
  }
  frontFilter(event?: PageEvent) {
    const name = this.filterForm.value.name_substr
    const category = this.filterForm.value.category_substr
    const price_min = parseInt(this.filterForm.value.price_min)
    const price_max = parseInt(this.filterForm.value.price_max)
    const quantity_min = parseInt(this.filterForm.value.quantity_min)
    const quantity_max = parseInt(this.filterForm.value.quantity_max)
    let data = [...this.baseData]
    if (name) {
      data = data.filter((item) => item.name.toLowerCase().includes(name.toLowerCase()))
    }
    if (category) {
      data = data.filter((item) => item.category.toLowerCase().includes(category.toLowerCase()))
    }
    if (price_min) {
      data = data.filter((item) => item.price >= price_min)
    }
    if (price_max) {
      data = data.filter((item) => item.price <= price_max)
    }
    if (quantity_min) {
      data = data.filter((item) => item.quantity >= quantity_min)
    }
    if (quantity_max) {
      data = data.filter((item) => item.quantity <= quantity_max)
    }
    this.length = data.length

    if (event) {
      this.products = data.slice(event.pageIndex * event.pageSize, event.pageIndex * event.pageSize + event.pageSize);
    }
    else {
      this.products = data.slice(0, this.filter.page_size)
    }
  }
}
