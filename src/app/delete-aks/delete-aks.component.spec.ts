import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAksComponent } from './delete-aks.component';

describe('DeleteAksComponent', () => {
  let component: DeleteAksComponent;
  let fixture: ComponentFixture<DeleteAksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteAksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteAksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
