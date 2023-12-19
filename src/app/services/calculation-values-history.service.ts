import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculationValuesHistoryService {

  constructor() { }

  private history: number[] = [];

  addToHistory(value: number): void {
    this.history.unshift(value)
    this.history = this.history.slice(0, 5);
  }

  getHistory(): number[] {
    return this.history;
  }

  clearHistory(): void {
    this.history = [];
  }
}
