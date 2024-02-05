import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoComponent } from './todo.component';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    component = null!;
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct uncompleted todos count after adding a todo', () => {
    component.addTodo('New Todo');
    fixture.detectChanges();
    expect(component.uncompletedTodos()).toEqual(1);
  });

  it('should toggle all todos to completed', () => {
    component.addTodo('Todo 1');
    component.addTodo('Todo 2');
    fixture.detectChanges();
    component.toggleAll(true);
    fixture.detectChanges();
    expect(component.uncompletedTodos()).toEqual(0);
  });

  it('should add a new todo', () => {
    component.addTodo('New Todo');
    fixture.detectChanges();
    expect(component.todoList().length).toEqual(2);
    expect(component.todoList()[0].text).toEqual('Create the app');
    expect(component.todoList()[1].text).toEqual('New Todo');
  });

  it('should remove a todo', () => {
    component.addTodo('Todo to be removed');
    fixture.detectChanges();
    const todos = component.todoList();
    const lastItemId = todos[todos.length - 1].id;
    component.removeTodo(lastItemId);
    fixture.detectChanges();
    expect(component.todoList().length).toEqual(1);
  });

  it('should complete a todo', () => {
    component.addTodo('Incomplete Todo');
    fixture.detectChanges();

    const todos = component.todoList();
    const lastItemId = todos[todos.length - 1].id;
    component.completeTodo(lastItemId);
    fixture.detectChanges();

    expect(component.uncompletedTodos()).toEqual(0);
  });

  it('should toggle all todos to completed', () => {
    component.addTodo('Todo 1');
    component.addTodo('Todo 2');
    fixture.detectChanges();
    component.toggleAll(true);
    fixture.detectChanges();
    expect(component.uncompletedTodos()).toEqual(0);
  });
});
