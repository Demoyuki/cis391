import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListArtists } from './list-artists';

describe('ListArtists', () => {
  let component: ListArtists;
  let fixture: ComponentFixture<ListArtists>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListArtists],
    }).compileComponents();

    fixture = TestBed.createComponent(ListArtists);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
