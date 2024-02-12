import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatListModule} from "@angular/material/list";
import {CurrencyPipe, DecimalPipe} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {TranslateModule} from "@ngx-translate/core";
import {MatIconModule} from "@angular/material/icon";
import {
  dummyCategories, dummyCustomers,
  dummyOrders,
  dummyOrdersLines,
  dummyPricelists,
  dummyProducts,
  dummyPrograms, dummySessions
} from "../models/dummyData";
import {OrderLine} from "../models/classes/orderLine";
import {Product} from "../models/classes/product";
import {Order} from "../models/classes/order";
import {MatButton, MatMiniFabButton} from "@angular/material/button";
import {Pricelist} from "../models/classes/pricelist";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatDialog} from "@angular/material/dialog";
import {ReceiptComponent} from "./receipt/receipt.component";
import {Coupon} from "../models/classes/coupon";
import {BuyXGetY} from "../models/classes/buyXGetY";
import {ProgramType} from "../models/enums/programType";
import {BuyXGetYStatus} from "../models/enums/buyXGetYStatus";
import {CouponStatus} from "../models/enums/couponStatus";
import {Program} from "../models/classes/program";
import {Router, RouterLink} from "@angular/router";
import {Session} from "../models/classes/Session";
import {SessionStatus} from "../models/enums/sessionStatus";
import {PageEvent} from "@angular/material/paginator";
import {debounceTime, Subscription} from "rxjs";
import {ProductFilter} from "../models/filters/productFilter";
import {Customer} from "../models/classes/customer";
import {MatOption, MatSelect} from "@angular/material/select";
import {deep_copy} from "../models/functions";

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  class?: string;
}

@Component({
  selector: 'app-session',
  standalone: true,
  imports: [
    MatGridListModule,
    MatListModule,
    DecimalPipe,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    TranslateModule,
    MatIconModule,
    CurrencyPipe,
    MatButton,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    RouterLink,
    MatSelect,
    MatOption,
    MatMiniFabButton
  ],
  templateUrl: './session.component.html',
  styleUrl: './session.component.scss'
})
export class SessionComponent implements OnInit, OnDestroy {
  valueChangedSubscription: Subscription;
  filter: ProductFilter;
  filterForm: FormGroup;

  sessions: Session[] = dummySessions;
  categories = dummyCategories;
  products: Product[] = deep_copy(dummyProducts);
  pricelists: Pricelist[] = dummyPricelists;
  customers: Customer[] = dummyCustomers;
  orders: Order[] = dummyOrders;
  programs: Program[] = dummyPrograms;
  orderLines: OrderLine[] = [];
  isSelectedLine: number = null;
  selectedPricelist: Pricelist = null;
  selectedCustomer: Customer = null;
  appliedProgramLines: (Coupon | BuyXGetY)[] = []
  discountCode: string;
  currentOrder: Order;
  currentSession: Session;


  constructor(
    private dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.filter = new ProductFilter()
  }

  ngOnInit() {
    this.initSession()
    this.createForm();
    console.log(this.customers)

  }
  createForm() {
    this.filterForm = this.fb.group({
      name_substr: [''],
      category_id: [0],
    });
    this.valueChangedSubscription  = this.filterForm.valueChanges
      .pipe(debounceTime(0))
      .subscribe((data) => this.frontFilter());
  }
  initSession() {
    this.currentSession = this.sessions.find(item => item.status === SessionStatus.Open);
    if (!this.currentSession) {
      this.currentSession = {
        id: this.sessions.length + 1,
        opened_by: 1,
        employee_name: 'Youssef Maaouia',
        opened_at: new Date(),
        closed_at: null,
        status: SessionStatus.Open
      }
      this.sessions.push(this.currentSession)
    }
    this.createOrder()
  }
  createOrder() {
    this.currentOrder = {
      order_ref: this.orders.length + 1,
      session_id: this.currentSession.id,
      date: new Date(),
      receipt_number: 'Rec001',
      employee_id: 1,
      customer_id: 0,
      pricelist_id: 0,
      total: 0,
      total_after_discount: 0,
    };
  }

  calculateTotalPrice() {
    // Calculate the initial total before any discounts
    this.currentOrder.total = this.orderLines.reduce((acc, item) => {
      const pricePerUnit = item.unit_price_after_discount !== null ? item.unit_price_after_discount : item.unit_price;
      return acc + item.quantity * pricePerUnit;
    }, 0);
    // Initialize total_after_discount with the original total
    this.currentOrder.total_after_discount = this.currentOrder.total;

    // First apply "Buy X Get Y" promotions
    const usedProducts: { [key: number]: number } = {};
    this.appliedProgramLines.forEach(programLine => {
      if ('buy' in programLine && 'get' in programLine) {
        const buyItemLine = this.orderLines.find(line => line.product_id === programLine.buy);
        const getItemLine = this.orderLines.find(line => line.product_id === programLine.get);

        if (buyItemLine && getItemLine) {
          // Initialize used quantities in the dictionary
          this.addToDictionary(usedProducts, programLine.buy, 0);
          this.addToDictionary(usedProducts, programLine.get, 0);

          // Calculate available quantities for promotion
          const availableBuyQuantity = buyItemLine.quantity - usedProducts[programLine.buy];
          const availableGetYQuantity = getItemLine.quantity - usedProducts[programLine.get];

          // Determine the number of times the offer can be redeemed
          const timesOfferCanBeRedeemed = Math.min(
            availableBuyQuantity,
            availableGetYQuantity
          );

          // Apply the promotion if possible
          if (timesOfferCanBeRedeemed > 0) {
            this.addToDictionary(usedProducts, programLine.buy, 1);
            this.addToDictionary(usedProducts, programLine.get, 1);
            this.currentOrder.total_after_discount -= getItemLine.unit_price_after_discount ?? getItemLine.unit_price;
            programLine.amount = getItemLine.unit_price_after_discount ?? getItemLine.unit_price;
          }
        }
      }
    });

    // Sequentially apply each coupon type discount to the total_after_discount
    this.appliedProgramLines.forEach(programLine => {
      if ('discount' in programLine) {
        // Assuming discount is a percentage value
        this.currentOrder.total_after_discount *= (1 - (programLine.discount / 100));
        programLine.amount = this.currentOrder.total_after_discount * (programLine.discount / 100);
      }
    });

    // Ensure total_after_discount is not less than zero
    this.currentOrder.total_after_discount = Math.max(this.currentOrder.total_after_discount, 0);

    // Round to two decimal places if needed
    this.currentOrder.total_after_discount = Math.round(this.currentOrder.total_after_discount * 100) / 100;
  }


  filterProducts(id: number) {
    this.products = dummyProducts.filter(product => product.category_id === id);
    this.categoryControl.setValue(id);
  }

  addOrderLine(product: Product) {
    const existingLine = this.orderLines.find(line => line.product_id === product.id);

    if (existingLine) {
      existingLine.quantity += 1;
      // existingLine.unit_price = product.price;
    } else {
      const newLine: OrderLine = {
        id: this.orderLines.length + 1,
        order_id: this.orders.length + 1,
        product_id: product.id,
        quantity: 1,
        unit_price: product.price,
        unit_price_after_discount: product.price_after_discount ? product.price_after_discount : null,
        product_name: product.name,
        is_reward: false
      };

      this.orderLines.push(newLine);
    }
    this.calculateTotalPrice()
  }

  selectLine(lineId: number) {
    if (this.isSelectedLine === lineId) {
      this.isSelectedLine = null;
      return;
    }
    this.isSelectedLine = lineId;
  }

  addQuantity() {
    if (this.isSelectedLine != null) {
      const line = this.orderLines.find(line => line.id === this.isSelectedLine);
      if (line) {
        line.quantity += 1;
      }
    }
    this.calculateTotalPrice()
  }

  subtractQuantity() {
    if (this.isSelectedLine != null) {
      const index = this.orderLines.findIndex(line => line.id === this.isSelectedLine);
      if (index > -1) {
        if (this.orderLines[index].quantity > 1) {
          this.orderLines[index].quantity -= 1;
        } else {
          // Remove the line if quantity is 0
          this.orderLines.splice(index, 1);
          this.isSelectedLine = null; // Reset the selected line as it is removed
        }
      }
    }
    this.calculateTotalPrice()
  }

  selectCustomer() {
    this.selectedCustomer = this.selectedCustomer?? null;
    this.currentOrder.customer_id = this.selectedCustomer.id;
    this.currentOrder.pricelist_id = this.selectedCustomer.pricelist_id;
    this.applyPricelist(this.selectedCustomer ? this.pricelists.find(pricelist => pricelist.id === this.selectedCustomer.pricelist_id) : null);
  }
  applyPricelist(pricelist?: Pricelist) {
    // First, reset all prices to null
    this.products.forEach(product => {
      product.price_after_discount = null;
    });
    this.orderLines.forEach(line => {
      line.unit_price_after_discount = null;
    });
    // Then, apply new pricelist if provided
    if (pricelist) {
      this.selectedPricelist = pricelist;
      this.products.forEach(product => {
        const pricelistItem = pricelist.lines.find(item => item.id === product.id);
        if (pricelistItem) {
          product.price_after_discount = pricelistItem.price;
        }
      });

      this.orderLines.forEach(line => {
        const pricelistItem = pricelist.lines.find(item => item.id === line.id);
        if (pricelistItem) {
          line.unit_price_after_discount = pricelistItem.price;
        }
      });
    } else {
      this.selectedPricelist = null;
    }
    this.calculateTotalPrice()
  }


  applyDiscount() {
    // Assume this.discountCode is the code entered by the user
    // And this.programs contains all programs available
    const appliedProgram = this.programs.find(
      program => program.lines.some(line => line.code === this.discountCode)
    );

    if (appliedProgram) {
      const appliedLine = appliedProgram.lines.find(
        line => line.code === this.discountCode
      );

      if (appliedLine) {
        //assign the product to the line
        appliedLine.getProduct = this.products.find(product => product.id === appliedLine.product_id);
        if (appliedProgram.type === ProgramType.Coupon && appliedLine.status === CouponStatus.Active) {
          appliedLine.status = CouponStatus.Inactive;
          this.appliedProgramLines.push(appliedLine);
        } else if (appliedProgram.type === ProgramType.BuyXGetY && appliedLine.status === BuyXGetYStatus.Active) {
          appliedLine.status = BuyXGetYStatus.Inactive;
          this.appliedProgramLines.push(appliedLine);
        }

      }
    }
    console.log(this.appliedProgramLines)
    this.calculateTotalPrice()
    this.discountCode = '';
  }


  resetDiscount() {
    this.appliedProgramLines.forEach(line => {
      if ('discount' in line) {
        line.status = CouponStatus.Active;
      } else if ('buy' in line && 'get' in line) {
        line.status = BuyXGetYStatus.Active;
      }
    });
    this.appliedProgramLines = [];
  }

  pay() {
    this.calculateTotalPrice()
    this.currentOrder.pricelist_id = this.selectedPricelist ? this.selectedPricelist.id : 0
    this.currentOrder.lines = [...this.orderLines]

    const dialogRef = this.dialog.open(ReceiptComponent, {
      width: '450px',
      data: {
        order: this.currentOrder,
        pricelist: this.selectedPricelist ?? null,
        discounts: this.appliedProgramLines,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // if (result) {
        dummyOrdersLines.push(...this.orderLines);
        this.orders.push(this.currentOrder);
        this.orderLines = [];
        this.appliedProgramLines = [];
        this.isSelectedLine = null;
        this.selectedCustomer = null;
        this.selectedPricelist = null;
        this.products = deep_copy(dummyProducts);
        this.createOrder()
      // }
    });
  }
  endSession() {
    this.currentSession.status = SessionStatus.Closed;
    this.currentSession.closed_at = new Date();
    this.pauseSession()
  }
  pauseSession() {
    this.router.navigate(['/sessions']);
  }

  private addToDictionary(dict: { [key: number]: number }, key: number, value: number) {
    if (key in dict) {
      dict[key] += value;
    } else {
      dict[key] = value;
    }
  }
  frontFilter(event?: PageEvent) {
    const name = this.filterForm.value.name_substr
    const category_id = this.filterForm.value.category_id
    let data = [...dummyProducts]
    if (name) {
      data = data.filter((item) => item.name.toLowerCase().includes(name.toLowerCase()))
    }
    if (category_id !== 0) {
      data = data.filter((item) => item.category_id === category_id)
    }
    if (event) {
      this.products = data.slice(event.pageIndex * event.pageSize, event.pageIndex * event.pageSize + event.pageSize);
    }
    else {
      this.products = data.slice(0, dummyProducts.length)
    }
  }
  get nameControl() : FormControl  {
    return this.filterForm.get('name_substr') as FormControl;
  }
  get categoryControl() {
    return this.filterForm.get('category_id');
  }
  get isPayable() {
    return this.orderLines.length > 0 && this.selectedCustomer !== null;
  }
  ngOnDestroy() {
    this.valueChangedSubscription.unsubscribe();
    //TODO: Unsubscribe from all subscriptions
  }
  getProgramType(line: Coupon | BuyXGetY) {
    //check if it has the buy property
    if ('buy' in line) {
      return 'Buy X Get Y';
    }
    return 'Coupon';

  }

}
