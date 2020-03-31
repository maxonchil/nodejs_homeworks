import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTruckComponent } from './update-truck.component';

describe('UpdateTruckComponent', () => {
  let component: UpdateTruckComponent;
  let fixture: ComponentFixture<UpdateTruckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTruckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTruckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
