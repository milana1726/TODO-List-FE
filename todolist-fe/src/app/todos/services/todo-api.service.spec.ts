import { TestBed } from '@angular/core/testing';

import { TodoApiService } from './todo-api.service';

describe('TodoService', () => {
  let service: TodoApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
