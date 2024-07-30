import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringManagemnetComponent } from './monitoring-managemnet.component';

describe('MonitoringManagemnetComponent', () => {
  let component: MonitoringManagemnetComponent;
  let fixture: ComponentFixture<MonitoringManagemnetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitoringManagemnetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonitoringManagemnetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
