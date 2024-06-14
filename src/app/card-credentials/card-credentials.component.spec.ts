import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCredentialsComponent } from './card-credentials.component';

describe('CardCredentialsComponent', () => {
  let component: CardCredentialsComponent;
  let fixture: ComponentFixture<CardCredentialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardCredentialsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
