import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransaccionesEpagoComponent } from './transacciones-epago.component';

describe('TransaccionesEpagoComponent', () => {
  let component: TransaccionesEpagoComponent;
  let fixture: ComponentFixture<TransaccionesEpagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransaccionesEpagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransaccionesEpagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
