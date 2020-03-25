import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegestrationPageComponent } from './regestration-page.component';

describe('RegestrationPageComponent', () => {
  let component: RegestrationPageComponent;
  let fixture: ComponentFixture<RegestrationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegestrationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegestrationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
