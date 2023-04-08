import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OceanieComponent } from './oceanie.component';

describe('OceanieComponent', () => {
  let component: OceanieComponent;
  let fixture: ComponentFixture<OceanieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OceanieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OceanieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
