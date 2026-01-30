import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelecommandeComponent } from './telecommande.component';

describe('TelecommandeComponent', () => {
  let component: TelecommandeComponent;
  let fixture: ComponentFixture<TelecommandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelecommandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelecommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
