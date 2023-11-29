import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDetailFormComponent } from './book-detail-form.component';

describe('BookDetailFormComponent', () => {
  let component: BookDetailFormComponent;
  let fixture: ComponentFixture<BookDetailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookDetailFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
