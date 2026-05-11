import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAlbum } from './display-album';

describe('DisplayAlbum', () => {
  let component: DisplayAlbum;
  let fixture: ComponentFixture<DisplayAlbum>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayAlbum],
    }).compileComponents();

    fixture = TestBed.createComponent(DisplayAlbum);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
