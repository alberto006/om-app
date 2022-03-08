import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapiwhaBlasterComponent } from './rapiwha-blaster.component';

describe('RapiwhaBlasterComponent', () => {
  let component: RapiwhaBlasterComponent;
  let fixture: ComponentFixture<RapiwhaBlasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RapiwhaBlasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RapiwhaBlasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
