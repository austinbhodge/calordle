import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import foodData from '../../../assets/foods.json';
import { FormsModule } from '@angular/forms';

interface FoodItem {
  id: number;
  name: string;
  calories: number;
  imageURI: string;
  protein: number;
  carb: number;
  fat: number;
}


@Component({
    selector: 'app-today',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule
    ],
    templateUrl: './today.component.html',
    styleUrl: './today.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodayComponent {
  foodItems: FoodItem[] = foodData;
  currentFood: FoodItem | null = null;
  userGuess: number = 0;
  feedback: string = '';

  ngOnInit() {
    this.selectRandomFood();
  }

  selectRandomFood() {
    const randomIndex = Math.floor(Math.random() * this.foodItems.length);
    this.currentFood = this.foodItems[randomIndex];
    this.userGuess = 0;
    this.feedback = '';
  }

  submitGuess() {
    if (!this.currentFood) return;

    const difference = Math.abs(this.userGuess - this.currentFood.calories);
    const percentageDiff = (difference / this.currentFood.calories) * 100;

    if (percentageDiff <= 10) {
      this.feedback = 'Excellent guess!';
    } else if (percentageDiff <= 20) {
      this.feedback = 'Close guess!';
    } else if (this.userGuess < this.currentFood.calories) {
      this.feedback = 'Too low! Try again.';
    } else {
      this.feedback = 'Too high! Try again.';
    }
  }

  nextFood() {
    this.selectRandomFood();
  }
}
