import { setupCounter } from './js/counter.js';  // или куда у тебя counter.js лежит

// Только инициализация
document.addEventListener('DOMContentLoaded', () => {
  setupCounter(document.querySelector('#counter'));
  
  // Здесь можно добавлять другие инициализации
  console.log('App initialized');
});
