import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveDevComponent } from './archive-dev.component';

describe('ArchiveDevComponent', () => {
  let component: ArchiveDevComponent;
  let fixture: ComponentFixture<ArchiveDevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArchiveDevComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchiveDevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
