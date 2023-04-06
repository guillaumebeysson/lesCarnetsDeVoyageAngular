import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCarnetComponent } from './create-carnet.component';

describe('CreateCarnetComponent', () => {
  let component: CreateCarnetComponent;
  let fixture: ComponentFixture<CreateCarnetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCarnetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCarnetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
