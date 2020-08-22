import { Injectable } from '@angular/core';

/**
 * Keeps track of the individual score per letter and the total score.
 * All times and scores are in milliseconds.
 */
@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  /**
   * Time at which the user is allowed to start typing.
   */
  private startTime: number;

  /**
   * Used to compute the time difference between typing two letters.
   */
  private timeAtPreviousLetter: number;

  /**
   * Accumulated score of typing al the letters of the alphabet.
   */
  private totalScore = 0;

  /**
   * Score per letter, where the score of the letter 'a' is stored at index 0.
   * Each value is a time in milliseconds it took to type the letter.
   */
  private scorePerLetter: number[] = [];

  constructor() { }

  /**
   * Starts the timer.
   */
  start(): void {
    this.startTime = Date.now();
    this.timeAtPreviousLetter = this.startTime;
  }

  /**
   * Computes and stores the score for the letter identified by the supplied letterIndex.
   * @param letterIndex index of the letter for which to store the score.
   *  The letter 'a' has index 0.
   */
  addScore(letterIndex: number) {
    const currentTime = Date.now();

    if (letterIndex < 0 || letterIndex > 25) {
      throw new Error(`Score::addScore, 0 <= letterIndex < 26 but is: ${letterIndex}`);
    }

    this.scorePerLetter[letterIndex] = currentTime - this.timeAtPreviousLetter;
    this.totalScore += this.scorePerLetter[letterIndex];

    this.timeAtPreviousLetter = currentTime;
  }

  /**
   * Gets the total score of typing all the letters.
   * @returns The total score.
   */
  getTotalScore(): number {
    return this.totalScore;
  }

  /**
   * Gets the score per letter.
   * @returns The score per letter.
   */ 
  getScorePerLetter(): number[] {
    return this.scorePerLetter;
  }
}
