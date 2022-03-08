import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneradorFirmasComponent } from './generador-firmas.component';

describe('GeneradorFirmasComponent', () => {
  let component: GeneradorFirmasComponent;
  let fixture: ComponentFixture<GeneradorFirmasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneradorFirmasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneradorFirmasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
