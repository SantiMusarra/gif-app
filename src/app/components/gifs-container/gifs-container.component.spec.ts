import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GifsContainerComponent } from './gifs-container.component';

describe('GifsContainerComponent', () => {
  let component: GifsContainerComponent;
  let fixture: ComponentFixture<GifsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GifsContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GifsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
