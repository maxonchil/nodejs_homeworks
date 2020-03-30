import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLoadComponent } from './update-load.component';

describe('UpdateLoadComponent', () => {
  let component: UpdateLoadComponent;
  let fixture: ComponentFixture<UpdateLoadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateLoadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
