import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCloudSelectionComponent } from './delete-cloud-selection.component';

describe('DeleteCloudSelectionComponent', () => {
  let component: DeleteCloudSelectionComponent;
  let fixture: ComponentFixture<DeleteCloudSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCloudSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCloudSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
