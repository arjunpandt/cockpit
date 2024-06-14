import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AksClusterComponent } from './aks-cluster.component';

describe('AksClusterComponent', () => {
  let component: AksClusterComponent;
  let fixture: ComponentFixture<AksClusterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AksClusterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AksClusterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
