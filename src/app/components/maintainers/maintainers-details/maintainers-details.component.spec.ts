import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintainersDetailsComponent } from './maintainers-details.component';

describe('MaintainersDetailsComponent', () => {
  let component: MaintainersDetailsComponent;
  let fixture: ComponentFixture<MaintainersDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintainersDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintainersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
