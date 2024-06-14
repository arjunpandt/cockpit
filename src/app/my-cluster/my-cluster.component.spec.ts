import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyClusterComponent } from './my-cluster.component';

describe('MyClusterComponent', () => {
  let component: MyClusterComponent;
  let fixture: ComponentFixture<MyClusterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyClusterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyClusterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
