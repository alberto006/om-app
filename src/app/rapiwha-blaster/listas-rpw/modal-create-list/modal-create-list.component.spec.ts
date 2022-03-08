import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateListComponent } from './modal-create-list.component';

describe('ModalCreateListComponent', () => {
  let component: ModalCreateListComponent;
  let fixture: ComponentFixture<ModalCreateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCreateListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCreateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
