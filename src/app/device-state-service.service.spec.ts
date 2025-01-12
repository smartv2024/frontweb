import { TestBed } from '@angular/core/testing';

import { DeviceStateServiceService } from './device-state-service.service';

describe('DeviceStateServiceService', () => {
  let service: DeviceStateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceStateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
