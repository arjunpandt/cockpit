import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GcpCredentialComponent } from './gcp-credential.component';

describe('GcpCredentialComponent', () => {
  let component: GcpCredentialComponent;
  let fixture: ComponentFixture<GcpCredentialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GcpCredentialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GcpCredentialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
