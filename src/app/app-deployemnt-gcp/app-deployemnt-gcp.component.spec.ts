import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDeployemntGcpComponent } from './app-deployemnt-gcp.component';

describe('AppDeployemntGcpComponent', () => {
  let component: AppDeployemntGcpComponent;
  let fixture: ComponentFixture<AppDeployemntGcpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppDeployemntGcpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppDeployemntGcpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
