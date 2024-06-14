import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwsCredentialComponent } from './aws-credential.component';

describe('AwsCredentialComponent', () => {
  let component: AwsCredentialComponent;
  let fixture: ComponentFixture<AwsCredentialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AwsCredentialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AwsCredentialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
