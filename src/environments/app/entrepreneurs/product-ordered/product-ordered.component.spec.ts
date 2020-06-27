import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOrderedComponent } from './product-ordered.component';

describe('ProductOrderedComponent', () => {
  let component: ProductOrderedComponent;
  let fixture: ComponentFixture<ProductOrderedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductOrderedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductOrderedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
