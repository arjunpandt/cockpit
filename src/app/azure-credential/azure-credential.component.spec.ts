import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzureCredentialComponent } from './azure-credential.component';

describe('AzureCredentialComponent', () => {
  let component: AzureCredentialComponent;
  let fixture: ComponentFixture<AzureCredentialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AzureCredentialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AzureCredentialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
