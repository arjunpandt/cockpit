import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EksClusterredirectComponent } from './eksClusterredirect.component';

describe('EksClusterredirectComponent', () => {
  let component: EksClusterredirectComponent;
  let fixture: ComponentFixture<EksClusterredirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EksClusterredirectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EksClusterredirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
