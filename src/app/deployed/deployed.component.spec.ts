import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeployedComponent } from './deployed.component';

describe('DeployedComponent', () => {
  let component: DeployedComponent;
  let fixture: ComponentFixture<DeployedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeployedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeployedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
