import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptComponent } from './receipt.component';
import {SharedTestingModule} from "../../services/test/share-testing.module";

describe('ReceiptComponent', () => {
  let component: ReceiptComponent;
  let fixture: ComponentFixture<ReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceiptComponent,SharedTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
