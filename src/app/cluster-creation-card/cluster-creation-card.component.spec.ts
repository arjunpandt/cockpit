import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusterCreationCardComponent } from './cluster-creation-card.component';

describe('ClusterCreationCardComponent', () => {
  let component: ClusterCreationCardComponent;
  let fixture: ComponentFixture<ClusterCreationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClusterCreationCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClusterCreationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
