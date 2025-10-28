import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpagoModalComponent } from './epago-modal.component';

describe('EpagoModalComponent', () => {
  let component: EpagoModalComponent;
  let fixture: ComponentFixture<EpagoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpagoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpagoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
