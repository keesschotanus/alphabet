import * as CanvasJS from '../../assets/canvasjs.min';
import { Component, OnInit } from '@angular/core';
import { ScoreService } from '../score.service';

type DataPoint = {
  y: number,
  label: string;
}

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

  constructor(private score: ScoreService) { }

  ngOnInit(): void {

    const dataPoints: DataPoint[] = [];
    const scoresPerLetter = this.score.getScorePerLetter();

    for (let letterIndex = 0; letterIndex < scoresPerLetter.length; ++letterIndex) {
      dataPoints[letterIndex] = {
        y: scoresPerLetter[letterIndex],
        label: String.fromCharCode(letterIndex + 65)
      }
    }

    const chart = new CanvasJS.Chart("barChartContainer", {
      animationEnabled: true,
      exportEnabled: false,
      title: {
        text: "Alphabet score"
      },
      data: [{
        type: "column",
        dataPoints
      }],
      axisY:{
        suffix: "ms"
      }    
    });
        
    chart.render();
  }

  getTotalScore(): number {
    return this.score.getTotalScore();
  }

  isForfeited() {
    return this.score.isForfeited();
  }
}

