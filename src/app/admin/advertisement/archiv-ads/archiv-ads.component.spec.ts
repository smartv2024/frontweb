import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivAdsComponent } from './archiv-ads.component';

describe('ArchivAdsComponent', () => {
  let component: ArchivAdsComponent;
  let fixture: ComponentFixture<ArchivAdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArchivAdsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchivAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
