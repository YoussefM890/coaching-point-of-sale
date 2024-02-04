import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockProductsComponent } from './stock-products.component';
import {SharedTestingModule} from "../../services/test/share-testing.module";

describe('StockProductsComponent', () => {
  let component: StockProductsComponent;
  let fixture: ComponentFixture<StockProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockProductsComponent,SharedTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
