import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTodoComponent } from './add-todo.component';
import { TodoService } from '../../../../services/todo.service';
import { MatCheckboxChange } from '@angular/material/checkbox';

describe('AddTodoComponent', () => {
  let component: AddTodoComponent;
  let fixture: ComponentFixture<AddTodoComponent>;
  let todoService: TodoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTodoComponent],
      providers: [TodoService],
    }).compileComponents();

    fixture = TestBed.createComponent(AddTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    todoService = TestBed.inject(TodoService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit addTodoEvent when addTodo is called with a valid control', () => {
    spyOn(component.addTodoEvent, 'emit');

    component.control.setValue('Test Todo');
    component.addTodo();
    expect(component.addTodoEvent.emit).toHaveBeenCalledWith('Test Todo');
    expect(component.control.value).toBe('');
  });
  it('should not emit addTodoEvent when addTodo is called with an invalid control', () => {
    spyOn(component.addTodoEvent, 'emit');
    component.addTodo();
    expect(component.addTodoEvent.emit).not.toHaveBeenCalled();
  });

  it('should emit toggleAllEvent when toggleAll is called', () => {
    spyOn(component.toggleAllEvent, 'emit');
    const matCheckboxChange: MatCheckboxChange = {
      checked: true,
    } as MatCheckboxChange;
    component.toggleAll(matCheckboxChange);
    expect(component.toggleAllEvent.emit).toHaveBeenCalledWith(true);
  });

  it('should update isAllCompleted when todoList changes [false]', () => {
    spyOn(todoService, 'todoList').and.returnValue([
      { id: 1, text: 'Test Todo', completed: true },
      { id: 2, text: 'Another Todo', completed: false },
    ]);

    fixture.detectChanges();
    expect(component.isAllCompleted()).toBe(false);
  });
  it('should update isAllCompleted when todoList changes', () => {
    spyOn(todoService, 'todoList').and.returnValue([
      { id: 1, text: 'Test Todo', completed: true },
      { id: 2, text: 'Another Todo', completed: true },
    ]);
    fixture.detectChanges();
    expect(component.isAllCompleted()).toBe(true);
  });
});
