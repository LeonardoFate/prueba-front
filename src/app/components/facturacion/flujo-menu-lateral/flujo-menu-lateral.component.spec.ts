import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlujoMenuLateralComponent } from './flujo-menu-lateral.component';

describe('FlujoMenuLateralComponent', () => {
  let component: FlujoMenuLateralComponent;
  let fixture: ComponentFixture<FlujoMenuLateralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlujoMenuLateralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlujoMenuLateralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
