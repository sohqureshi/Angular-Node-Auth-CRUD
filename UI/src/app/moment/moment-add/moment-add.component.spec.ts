import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MomentAddComponent } from './moment-add.component';

describe('MomentAddComponent', () => {
  let component: MomentAddComponent;
  let fixture: ComponentFixture<MomentAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MomentAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MomentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
