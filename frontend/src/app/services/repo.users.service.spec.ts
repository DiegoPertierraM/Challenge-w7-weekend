import { TestBed } from '@angular/core/testing';

import { RepoUsersService } from './repo.users.service';

describe('RepoUsersService', () => {
  let service: RepoUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepoUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
