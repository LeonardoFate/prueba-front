import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendamientoComponent } from './agendamiento.component';

describe('AgendamientoComponent', () => {
  let component: AgendamientoComponent;
  let fixture: ComponentFixture<AgendamientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgendamientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
