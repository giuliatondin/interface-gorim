import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgriculturistComponent } from './agriculturist.component';

describe('AgriculturistComponent', () => {
  let component: AgriculturistComponent;
  let fixture: ComponentFixture<AgriculturistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgriculturistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgriculturistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
