import { TestBed } from '@angular/core/testing';

import { ServerUpdateService } from './server-update.service';

describe('ServerUpdateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServerUpdateService = TestBed.get(ServerUpdateService);
    expect(service).toBeTruthy();
  });
});
