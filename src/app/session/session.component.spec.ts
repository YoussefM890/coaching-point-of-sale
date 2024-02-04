import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionComponent } from './session.component';
import {SharedTestingModule} from "../services/test/share-testing.module";

describe('SessionComponent', () => {
  let component: SessionComponent;
  let fixture: ComponentFixture<SessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionComponent,SharedTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
