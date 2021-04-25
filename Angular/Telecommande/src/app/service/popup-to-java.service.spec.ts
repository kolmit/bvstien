import { TestBed } from '@angular/core/testing';

import { PopupToJavaService } from './popup-to-java.service';

describe('PopupToJavaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PopupToJavaService = TestBed.get(PopupToJavaService);
    expect(service).toBeTruthy();
  });
});
