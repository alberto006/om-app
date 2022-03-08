import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertficiadosRacComponent } from './certficiados-rac.component';

describe('CertficiadosRacComponent', () => {
  let component: CertficiadosRacComponent;
  let fixture: ComponentFixture<CertficiadosRacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertficiadosRacComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertficiadosRacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
