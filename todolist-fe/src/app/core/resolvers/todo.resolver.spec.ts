import { TestBed } from '@angular/core/testing';

import { TodoResolver } from './todo.resolver';

describe('TodoResolver', () => {
  let resolver: TodoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(TodoResolver);
  });

  it('should create', () => {
    expect(resolver).toBeTruthy();
  });
});
