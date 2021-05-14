import { TestBed } from '@angular/core/testing';

import { BitacoraReporteService } from './bitacora-reporte.service';

describe('BitacoraReporteService', () => {
  let service: BitacoraReporteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BitacoraReporteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
