import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalChart } from './animal-chart';

describe('AnimalChart', () => {
  let component: AnimalChart;
  let fixture: ComponentFixture<AnimalChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalChart],
    }).compileComponents();

    fixture = TestBed.createComponent(AnimalChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
