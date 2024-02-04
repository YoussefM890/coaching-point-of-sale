import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurTableComponent } from './our-table.component';
import {SharedTestingModule} from "../../services/test/share-testing.module";

describe('OurTableComponent', () => {
  let component: OurTableComponent;
  let fixture: ComponentFixture<OurTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurTableComponent,SharedTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
