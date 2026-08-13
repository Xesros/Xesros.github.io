import { TestBed } from '@angular/core/testing';

import { AnimalData } from './animal-data';

describe('AnimalData', () => {
  let service: AnimalData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimalData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
