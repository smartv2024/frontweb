import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakescheduleComponent } from './makeschedule.component';

describe('MakescheduleComponent', () => {
  let component: MakescheduleComponent;
  let fixture: ComponentFixture<MakescheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MakescheduleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakescheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
