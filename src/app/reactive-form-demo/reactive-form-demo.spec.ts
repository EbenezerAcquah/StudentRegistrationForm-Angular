import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormDemo } from './reactive-form-demo';

describe('ReactiveFormDemo', () => {
  let component: ReactiveFormDemo;
  let fixture: ComponentFixture<ReactiveFormDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormDemo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactiveFormDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
