import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoDetailedInfoComponent } from './todo-detailed-info.component';

describe('TodoDetailedInfoComponent', () => {
  let component: TodoDetailedInfoComponent;
  let fixture: ComponentFixture<TodoDetailedInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoDetailedInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoDetailedInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
