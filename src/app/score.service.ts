import { Injectable } from '@angular/core';

type LowScore = { score: number, name: string };
type LowScores = LowScore[];

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

  /**
   * Determines if the user forfeited the game.
   */
  private forfeited = false;

  constructor() { }

  /**
   * Starts the timer.
   */
  start(): void {
    this.forfeited = false;
    this.startTime = Date.now();
    this.timeAtPreviousLetter = this.startTime;
    this.totalScore = 0;
    this.scorePerLetter = [];
  }

  /**
   * Resets the current score but not the best low scores.
   */
  reset(): void {
    this.forfeited = false;
    this.totalScore = 0;
    this.scorePerLetter = [];
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
   * User forfeits the game.
   */
  forfeit() {
    this.forfeited = true;
  }

  /**
   * Determines if the user has forfeited the game or not.
   * @returns True when the user has forfeited the game.
   */
  isForfeited() {
    return this.forfeited;
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

  /**
   * Determines if the current score is a new low score.
   * @returns True in case of a new low score, otherwise false.
   */
  isLowScore(): boolean {
    const lowScores = this.getLowScores();
    return this.totalScore < lowScores[lowScores.length -1].score;
  }

  /**
   * Gets all the low scores.
   * Currently a list of 10 low scores is maintained.
   * @return The low scores. 
   */
  getLowScores(): LowScores {
    let storedScores = localStorage.getItem('AlphabetScores');
    if (storedScores) {
      return JSON.parse(storedScores);
    } else {
      const lowScores: LowScores = [];
      for (let index = 0; index < 10; ++index) {
        lowScores[index] = {score: 999999, name: ''}
      }
      return lowScores;
    }
  }
}
