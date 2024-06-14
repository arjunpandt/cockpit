import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AksClusterredirectComponent } from './aksClusterredirect.component';

describe('AksClusterredirectComponent', () => {
  let component: AksClusterredirectComponent;
  let fixture: ComponentFixture<AksClusterredirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AksClusterredirectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AksClusterredirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
