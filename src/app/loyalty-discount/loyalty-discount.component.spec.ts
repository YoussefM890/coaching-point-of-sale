import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltyDiscountComponent } from './loyalty-discount.component';
import {SharedTestingModule} from "../services/test/share-testing.module";

describe('LoyaltyDiscountComponent', () => {
  let component: LoyaltyDiscountComponent;
  let fixture: ComponentFixture<LoyaltyDiscountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoyaltyDiscountComponent,SharedTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoyaltyDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
