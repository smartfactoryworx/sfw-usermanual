import { TestBed } from '@angular/core/testing';

import { LineViewService } from './line-view.service';

describe('LineViewService', () => {
  let service: LineViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LineViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
