import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringGcpComponent } from './monitoring-gcp.component';

describe('MonitoringGcpComponent', () => {
  let component: MonitoringGcpComponent;
  let fixture: ComponentFixture<MonitoringGcpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitoringGcpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonitoringGcpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
