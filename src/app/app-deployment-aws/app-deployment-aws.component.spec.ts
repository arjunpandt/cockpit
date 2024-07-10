import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDeploymentAwsComponent } from './app-deployment-aws.component';

describe('AppDeploymentAwsComponent', () => {
  let component: AppDeploymentAwsComponent;
  let fixture: ComponentFixture<AppDeploymentAwsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppDeploymentAwsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppDeploymentAwsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
