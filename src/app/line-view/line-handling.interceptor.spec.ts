import { TestBed } from '@angular/core/testing';

import { LineHandlingInterceptor } from './line-handling.interceptor';

describe('LineHandlingInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      LineHandlingInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: LineHandlingInterceptor = TestBed.inject(LineHandlingInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
