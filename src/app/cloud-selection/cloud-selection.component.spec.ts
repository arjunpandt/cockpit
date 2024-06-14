import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudSelectionComponent } from './cloud-selection.component';

describe('CloudSelectionComponent', () => {
  let component: CloudSelectionComponent;
  let fixture: ComponentFixture<CloudSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloudSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CloudSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
