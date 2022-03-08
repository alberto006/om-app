import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BitacoraEventosComponent } from './bitacora-eventos.component';

describe('BitacoraEventosComponent', () => {
  let component: BitacoraEventosComponent;
  let fixture: ComponentFixture<BitacoraEventosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BitacoraEventosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BitacoraEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
