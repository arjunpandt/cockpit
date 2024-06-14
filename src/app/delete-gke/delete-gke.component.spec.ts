import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteGkeComponent } from './delete-gke.component';

describe('DeleteGkeComponent', () => {
  let component: DeleteGkeComponent;
  let fixture: ComponentFixture<DeleteGkeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteGkeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteGkeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
