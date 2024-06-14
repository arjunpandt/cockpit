import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusterJobsComponent } from './cluster-jobs.component';

describe('ClusterJobsComponent', () => {
  let component: ClusterJobsComponent;
  let fixture: ComponentFixture<ClusterJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClusterJobsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClusterJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
