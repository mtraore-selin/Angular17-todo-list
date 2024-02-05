import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  waitForAsync,
} from '@angular/core/testing';

import { ListFooterComponent } from './list-footer.component';
import { TodoService } from '../../../../services/todo.service';
import { FilterCategories } from '../../interfaces';
import { By } from '@angular/platform-browser';

describe('ListFooterComponent', () => {
  let component: ListFooterComponent;
  let fixture: ComponentFixture<ListFooterComponent>;
  let todoService: TodoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListFooterComponent],
      providers: [
        TodoService,
        {
          provide: TodoService,
          useValue: {
            activeFilter: jasmine.createSpy().and.returnValue('Active'),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListFooterComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit setActiveFilterEvent when setFilter is called', () => {
    const filterIndex = 1;
    spyOn(component.setActiveFilterEvent, 'emit');
    component.setFilter(filterIndex);
    expect(component.setActiveFilterEvent.emit).toHaveBeenCalledWith(
      'Active' as FilterCategories
    );
  });

  it('should emit setActiveFilterEvent when setFilter is called', () => {
    const filterIndex = 1;
    spyOn(component.setActiveFilterEvent, 'emit');
    component.setFilter(filterIndex);
    expect(component.setActiveFilterEvent.emit).toHaveBeenCalledWith(
      'Active' as FilterCategories
    );
  });

  it('should display the correct number of uncompleted todos', () => {
    fixture.detectChanges();
    const uncompletedTodosElement = fixture.debugElement.query(
      By.css('.uncompleted')
    );
    expect(uncompletedTodosElement.nativeElement.textContent).toContain(
      '0 item left'
    );
  });

  it('should display the active filter information', () => {
    fixture.detectChanges();
    const activeFilterElement = fixture.debugElement.query(
      By.css('.filter__item--active')
    );
    expect(activeFilterElement.nativeElement.textContent.trim()).toBe('Active');
  });
});
