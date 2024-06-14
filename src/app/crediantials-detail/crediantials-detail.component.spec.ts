import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrediantialsDetailComponent } from './crediantials-detail.component';

describe('CrediantialsDetailComponent', () => {
  let component: CrediantialsDetailComponent;
  let fixture: ComponentFixture<CrediantialsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrediantialsDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrediantialsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
