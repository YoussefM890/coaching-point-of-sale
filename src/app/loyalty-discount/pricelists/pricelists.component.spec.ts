import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricelistsComponent } from './pricelists.component';
import {SharedTestingModule} from "../../services/test/share-testing.module";

describe('StockPricelistsComponent', () => {
  let component: PricelistsComponent;
  let fixture: ComponentFixture<PricelistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PricelistsComponent,SharedTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PricelistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
