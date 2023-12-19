import { TestBed } from '@angular/core/testing';

import { CalculationValuesHistoryService } from './calculation-values-history.service';

describe('CalculationValuesHistoryService', () => {
  let service: CalculationValuesHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculationValuesHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
