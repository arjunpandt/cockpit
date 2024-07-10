import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDeploymentComponent } from './app-deployment.component';

describe('AppDeploymentComponent', () => {
  let component: AppDeploymentComponent;
  let fixture: ComponentFixture<AppDeploymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppDeploymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppDeploymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
