import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrepreneurHistoryComponent } from './entrepreneur-history.component';

describe('EntrepreneurHistoryComponent', () => {
  let component: EntrepreneurHistoryComponent;
  let fixture: ComponentFixture<EntrepreneurHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntrepreneurHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrepreneurHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
