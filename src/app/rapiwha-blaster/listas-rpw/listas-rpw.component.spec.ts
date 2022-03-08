import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListasRpwComponent } from './listas-rpw.component';

describe('ListasRpwComponent', () => {
  let component: ListasRpwComponent;
  let fixture: ComponentFixture<ListasRpwComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListasRpwComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListasRpwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
