import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GkeClusterComponent } from './gke-cluster.component';

describe('GkeClusterComponent', () => {
  let component: GkeClusterComponent;
  let fixture: ComponentFixture<GkeClusterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GkeClusterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GkeClusterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
