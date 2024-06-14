import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteEksComponent } from './delete-eks.component';

describe('DeleteEksComponent', () => {
  let component: DeleteEksComponent;
  let fixture: ComponentFixture<DeleteEksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteEksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteEksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
