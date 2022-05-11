import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListpricesComponent } from './listprices.component';

describe('ListpricesComponent', () => {
  let component: ListpricesComponent;
  let fixture: ComponentFixture<ListpricesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListpricesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListpricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
