import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturacionLayoutComponent } from './facturacion-layout.component';

describe('FacturacionLayoutComponent', () => {
  let component: FacturacionLayoutComponent;
  let fixture: ComponentFixture<FacturacionLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturacionLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturacionLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
