import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EksClusterComponent } from './eks-cluster.component';

describe('EksClusterComponent', () => {
  let component: EksClusterComponent;
  let fixture: ComponentFixture<EksClusterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EksClusterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EksClusterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
