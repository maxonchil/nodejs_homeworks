import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedLoadsComponent } from './assigned-loads.component';

describe('AssignedLoadsComponent', () => {
  let component: AssignedLoadsComponent;
  let fixture: ComponentFixture<AssignedLoadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignedLoadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedLoadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
