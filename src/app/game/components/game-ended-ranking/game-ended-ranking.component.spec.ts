import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameEndedRankingComponent } from './game-ended-ranking.component';

describe('GameEndedRankingComponent', () => {
  let component: GameEndedRankingComponent;
  let fixture: ComponentFixture<GameEndedRankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameEndedRankingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameEndedRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
