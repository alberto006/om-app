import { TestBed } from '@angular/core/testing';

import { RapiwhaService } from './rapiwha.service';

describe('RapiwhaService', () => {
  let service: RapiwhaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RapiwhaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
