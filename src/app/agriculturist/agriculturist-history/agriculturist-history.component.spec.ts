import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgriculturistHistoryComponent } from './agriculturist-history.component';

describe('AgriculturistHistoryComponent', () => {
  let component: AgriculturistHistoryComponent;
  let fixture: ComponentFixture<AgriculturistHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgriculturistHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgriculturistHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
