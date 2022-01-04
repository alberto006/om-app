import { TestBed } from '@angular/core/testing';

import { ReclutamientoService } from './reclutamiento.service';

describe('ReclutamientoService', () => {
  let service: ReclutamientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReclutamientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
