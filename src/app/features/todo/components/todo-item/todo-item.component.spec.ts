import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoItemComponent } from './todo-item.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Todo } from '../../interfaces';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [MatButtonModule, MatIconModule, MatCheckboxModule],
    });

    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
  });

  it('should create the TodoItemComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should emit removeTodoEvent when removeTodo is called', () => {
    spyOn(component.removeTodoEvent, 'emit');

    const todoId = 1;
    component.removeTodo(todoId);

    expect(component.removeTodoEvent.emit).toHaveBeenCalledWith(todoId);
  });

  it('should emit completeTodoEvent when onChange is called', () => {
    spyOn(component.completeTodoEvent, 'emit');

    const todo: Todo = { id: 1, text: 'Test Todo', completed: false };
    component.todo = todo;

    component.onChange();

    expect(component.completeTodoEvent.emit).toHaveBeenCalledWith(todo.id);
  });
});
