import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaingInTimeComponent } from './campaing-in-time.component';

describe('CampaingInTimeComponent', () => {
  let component: CampaingInTimeComponent;
  let fixture: ComponentFixture<CampaingInTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaingInTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaingInTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
