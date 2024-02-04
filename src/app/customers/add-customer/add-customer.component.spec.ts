import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustomerComponent } from './add-customer.component';
import {SharedTestingModule} from "../../services/test/share-testing.module";

describe('AddCustomerComponent', () => {
  let component: AddCustomerComponent;
  let fixture: ComponentFixture<AddCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCustomerComponent,SharedTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
