import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableValuesComponent } from './table-values.component';

describe('TableValuesComponent', () => {
  let component: TableValuesComponent;
  let fixture: ComponentFixture<TableValuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableValuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
