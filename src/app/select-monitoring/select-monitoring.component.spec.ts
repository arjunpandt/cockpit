import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMonitoringComponent } from './select-monitoring.component';

describe('SelectMonitoringComponent', () => {
  let component: SelectMonitoringComponent;
  let fixture: ComponentFixture<SelectMonitoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectMonitoringComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
