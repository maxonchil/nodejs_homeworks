import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteLoadComponent } from './delete-load.component';

describe('DeleteLoadComponent', () => {
  let component: DeleteLoadComponent;
  let fixture: ComponentFixture<DeleteLoadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteLoadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
