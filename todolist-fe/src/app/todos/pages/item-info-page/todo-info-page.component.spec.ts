import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoInfoPageComponent } from './todo-info-page.component';

describe('TodoInfoPageComponent', () => {
  let component: TodoInfoPageComponent;
  let fixture: ComponentFixture<TodoInfoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoInfoPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
