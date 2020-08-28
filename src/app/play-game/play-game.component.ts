import { Component, OnInit } from '@angular/core';
import { Router, RouteReuseStrategy } from '@angular/router';
import { ScoreService } from '../score.service';

@Component({
  selector: 'app-play-game',
  templateUrl: './play-game.component.html',
  styleUrls: ['./play-game.component.css']
})
export class PlayGameComponent implements OnInit {

  private alphabet = 'abcdefghijklmnopqrstuvwxyz';
  private expectedLetterIndex = 0;

  constructor(private router: Router, private scoreService: ScoreService) {
  }

  ngOnInit(): void {
    document.getElementById('alphabetDiv').focus();
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key.toLowerCase() === 'a') {
      this.scoreService.start();
      console.log("Game started", this.scoreService.getTotalScore());

    }
  }
  
  onKeyUp(event: KeyboardEvent) {
    const typedLetter = event.key.toLowerCase();
    if (typedLetter === this.alphabet.charAt(this.expectedLetterIndex)) {
      this.scoreService.addScore(this.expectedLetterIndex);

      if (typedLetter === 'z') {
        this.router.navigate(['/score'])
      }
  
      ++this.expectedLetterIndex;
    }

  }

  get lettersTyped() {
    return this.alphabet.substr(0, this.expectedLetterIndex);
  }
}
