import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobLogsCardComponent } from './job-logs-card.component';

describe('JobLogsCardComponent', () => {
  let component: JobLogsCardComponent;
  let fixture: ComponentFixture<JobLogsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobLogsCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobLogsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
