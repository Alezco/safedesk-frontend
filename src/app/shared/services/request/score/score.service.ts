import { Injectable } from '@angular/core';

@Injectable()
export class ScoreService {
  private score: number;
  private level: number;

  constructor() {
    this.score = 0;
    this.level = 0;
  }

  getScore() {
    return this.score;
  }

  setScore(score: number) {
    this.score = score;
  }

  getLevel() {
    return this.level;
  }

  setLevel(level: number) {
    this.level = level;
  }
}
