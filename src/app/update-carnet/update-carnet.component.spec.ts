import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCarnetComponent } from './update-carnet.component';

describe('UpdateCarnetComponent', () => {
  let component: UpdateCarnetComponent;
  let fixture: ComponentFixture<UpdateCarnetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCarnetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCarnetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
