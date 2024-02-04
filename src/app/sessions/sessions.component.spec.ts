import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionsComponent } from './sessions.component';
import {SharedTestingModule} from "../services/test/share-testing.module";

describe('SessionsComponent', () => {
  let component: SessionsComponent;
  let fixture: ComponentFixture<SessionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionsComponent,SharedTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
