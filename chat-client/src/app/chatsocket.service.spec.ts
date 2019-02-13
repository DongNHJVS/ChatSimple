import { TestBed } from '@angular/core/testing';

import { ChatsocketService } from './chatsocket.service';

describe('ChatsocketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChatsocketService = TestBed.get(ChatsocketService);
    expect(service).toBeTruthy();
  });
});
