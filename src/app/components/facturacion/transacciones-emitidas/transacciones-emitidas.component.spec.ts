import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransaccionesEmitidasComponent } from './transacciones-emitidas.component';

describe('TransaccionesEmitidasComponent', () => {
  let component: TransaccionesEmitidasComponent;
  let fixture: ComponentFixture<TransaccionesEmitidasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransaccionesEmitidasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransaccionesEmitidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
