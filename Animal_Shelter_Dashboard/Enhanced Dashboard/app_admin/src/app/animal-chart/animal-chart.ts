import { Component, OnInit, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
 
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

import { AnimalData } from '../services/animal-data';
import { AnimalIntData } from '../models/animals'; 
import { test } from '../data/test';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-animal-chart',
  imports: [CommonModule, CanvasJSAngularChartsModule],
  templateUrl: './animal-chart.html',
  styleUrl: './animal-chart.css',
})

export class AnimalChart implements OnInit{  

  constructor(private AnimalData: AnimalData,
    private ref: ChangeDetectorRef,
  ) {
    console.log('AnimalChart with Animals CONSTRUCTOR')
    //this.CalculatePercentage();
    
  }
  
  animals: Array<AnimalIntData> = test;
  message: string = '';
  cats = 0;
  dogs = 0;
  dataPoints:  any[] = [];

  chartOptions = {
	  animationEnabled: true,
	  title: {
		text: "Chart of Animals By Type"
	  },
	  data: [{
		type: "pie",
		startAngle: -90,
		indexLabel: "{name}: {y}",
		yValueFormatString: "#,###.##'%'",
		dataPoints: [
      { y: 55.89, name: "Dogs"},
      { y: 27.84, name: "Cats"},
      { y: 16.27, name: "Other"}
    ]
	  }]
	}	

  ngOnInit(): void {
    
  }

}                              
