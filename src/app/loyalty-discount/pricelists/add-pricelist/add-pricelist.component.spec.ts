import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPricelistComponent } from './add-pricelist.component';
import {SharedTestingModule} from "../../../services/test/share-testing.module";

describe('AddPricelistComponent', () => {
  let component: AddPricelistComponent;
  let fixture: ComponentFixture<AddPricelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPricelistComponent,SharedTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPricelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
