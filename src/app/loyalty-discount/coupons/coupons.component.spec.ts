import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponsComponent } from './coupons.component';
import {SharedTestingModule} from "../../services/test/share-testing.module";

describe('StockCuponsComponent', () => {
  let component: CouponsComponent;
  let fixture: ComponentFixture<CouponsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CouponsComponent,SharedTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
