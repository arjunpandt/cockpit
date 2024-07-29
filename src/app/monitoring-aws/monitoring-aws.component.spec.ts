import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringAwsComponent } from './monitoring-aws.component';

describe('MonitoringAwsComponent', () => {
  let component: MonitoringAwsComponent;
  let fixture: ComponentFixture<MonitoringAwsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitoringAwsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonitoringAwsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
