import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import foodData from '../../../assets/foods.json';
import { FormsModule } from '@angular/forms';

interface FoodItem {
  datePublished: string;
  id: number;
  name: string;
  calories: number;
  imageURI: string;
  sourceURI: string;
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
    templateUrl: './play.component.html',
    styleUrl: './play.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayComponent {
  foodItems: FoodItem[] = foodData;
  currentFood: FoodItem | null = null;
  currentFoodIndex: number = -1;
  userGuess: number = 0;
  feedback: string = '';
  guessesLeft: number = 3;
  guesses: number[] = [];
  revealedMacro: string = '';
  gameOver: boolean = false;
  gameWon: boolean = false;

  ngOnInit() {
    this.selectNextFood();
  }

  selectNextFood() {
    this.currentFoodIndex += 1
    if (this.currentFoodIndex >= this.foodItems.length) {
      this.currentFoodIndex = 0;
    }
    this.currentFood = this.foodItems[this.currentFoodIndex];
    this.userGuess = 0;
    this.feedback = '';
    this.guessesLeft = 3;
    this.guesses = [];
    this.revealedMacro = '';
    this.gameOver = false;
    this.gameWon = false;
  }

  submitGuess() {
    if (!this.currentFood || this.gameOver) return;

    this.guesses.push(this.userGuess);
    this.guessesLeft--;

    const difference = Math.abs(this.userGuess - this.currentFood.calories);
    const percentageDiff = (difference / this.currentFood.calories) * 100;

    if (percentageDiff <= 5) {
      this.feedback = 'Excellent guess!';
      this.gameOver = true;
      this.gameWon = true;
    } else if (percentageDiff <= 20) {
      this.feedback = 'Close guess!';
    } else if (this.userGuess < this.currentFood.calories) {
      this.feedback = 'Too low!';
    } else {
      this.feedback = 'Too high!';
    }

    if (this.guessesLeft > 0 && !this.gameOver) {
      this.revealLowestMacro();
    } else if (this.gameWon) {
      this.feedback = `Good Job! The answer is approximately ${this.currentFood.calories} calories.`;
    } else {
      this.gameOver = true;
      this.feedback = `Sorry! The correct answer is ${this.currentFood.calories} calories.`;
    }

    this.userGuess = 0;
  }

  revealLowestMacro() {
    if (!this.currentFood) return;

    const macros = [
      { name: 'protein', value: this.currentFood.protein },
      { name: 'fat', value: this.currentFood.fat },
      { name: 'carb', value: this.currentFood.carb }
    ];

    macros.sort((a, b) => a.value - b.value);
    this.revealedMacro = `${macros[0].name === 'fat' ? macros[0].value * 9 : macros[0].value * 4 } calories from ${macros[0].name}s`;
  }

  createRange(number: number){
    return new Array(number).fill(0)
      .map((n, index) => index + 1);
  }

  nextFood() {
    this.selectNextFood();
  }

  getGuessIcon(guess: number): string {
    if (!this.currentFood) return 'question';;

    const difference = Math.abs(guess - this.currentFood.calories);
    const percentageDiff = (difference / this.currentFood.calories) * 100;

    if (percentageDiff <= 5) return 'check';
    else if (percentageDiff <= 20)  return guess < this.currentFood.calories ? 'arrow-up-close' : 'arrow-down-close';
    return guess < this.currentFood.calories ? 'arrow-up' : 'arrow-down';
  }

  getIconPath(iconName: string): string {
    switch (iconName) {
      case 'check':
        return 'M5 13l4 4L19 7';
      case 'arrow-up':
      case 'arrow-up-close':
        return 'M5 10l7-7m0 0l7 7m-7-7v18';
      case 'arrow-down':
      case 'arrow-down-close':
        return 'M19 14l-7 7m0 0l-7-7m7 7V3';
      default:
        return 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z';
    }
  }
}
