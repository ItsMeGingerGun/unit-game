// lib/game.ts
const UNIT_CONVERSIONS = [
  // Mass conversions
  { from: 'mg', to: 'g', factor: 0.001 },
  { from: 'g', to: 'kg', factor: 0.001 },
  { from: 'kg', to: 'ton', factor: 0.001 },
  { from: 'lb', to: 'kg', factor: 0.453592 },
  { from: 'oz', to: 'g', factor: 28.3495 },
  
  // Length conversions
  { from: 'mm', to: 'cm', factor: 0.1 },
  { from: 'cm', to: 'm', factor: 0.01 },
  { from: 'm', to: 'km', factor: 0.001 },
  { from: 'in', to: 'cm', factor: 2.54 },
  { from: 'ft', to: 'm', factor: 0.3048 },
  
  // Volume conversions
  { from: 'ml', to: 'L', factor: 0.001 },
  { from: 'tsp', to: 'ml', factor: 4.92892 },
  { from: 'tbsp', to: 'ml', factor: 14.7868 },
  { from: 'cup', to: 'ml', factor: 240 },
  { from: 'gal', to: 'L', factor: 3.78541 },
  
  // Time conversions
  { from: 'sec', to: 'min', factor: 1/60 },
  { from: 'min', to: 'hr', factor: 1/60 },
  { from: 'hr', to: 'day', factor: 1/24 },
  
  // Digital storage
  { from: 'KB', to: 'MB', factor: 0.001 },
  { from: 'MB', to: 'GB', factor: 0.001 },
];

export const generatePuzzle = (difficulty: 'easy' | 'medium' | 'hard') => {
  // Filter units based on difficulty
  let availableUnits = UNIT_CONVERSIONS;
  if (difficulty === 'easy') {
    availableUnits = UNIT_CONVERSIONS.filter(unit => 
      unit.factor === 0.001 || unit.factor === 1000 || unit.factor === 100
    );
  } else if (difficulty === 'medium') {
    availableUnits = UNIT_CONVERSIONS.filter(unit => 
      unit.factor > 0.01 && unit.factor < 100
    );
  }

  const unit = availableUnits[Math.floor(Math.random() * availableUnits.length)];
  
  // Generate value based on difficulty
  let value: number;
  if (difficulty === 'easy') {
    value = Math.floor(Math.random() * 900) + 100; // 100-999
  } else if (difficulty === 'medium') {
    value = (Math.floor(Math.random() * 9000) + 1000) / 10; // 100.0-999.9
  } else {
    value = (Math.floor(Math.random() * 90000) + 10000) / 100; // 100.00-999.99
  }
  
  const answer = parseFloat((value * unit.factor).toFixed(4));
  const timeLimit = difficulty === 'easy' ? 20 : difficulty === 'medium' ? 15 : 10;
  
  return {
    id: crypto.randomUUID(),
    text: `Convert ${value} ${unit.from} to ${unit.to}`,
    question: `${value} ${unit.from} = ? ${unit.to}`,
    answer,
    timeLimit,
    from: unit.from,
    to: unit.to,
    value
  };
};

export function checkAnswer(
  userAnswer: number, 
  correctAnswer: number, 
  tolerance: number = 0.01
): boolean {
  if (correctAnswer === 0) {
    return Math.abs(userAnswer) < tolerance;
  }
  return Math.abs(1 - userAnswer / correctAnswer) < tolerance;
}

// Additional helper function
export function formatUnit(unit: string): string {
  const unitFormats: Record<string, string> = {
    'mg': 'milligrams',
    'g': 'grams',
    'kg': 'kilograms',
    'ton': 'tons',
    'lb': 'pounds',
    'oz': 'ounces',
    'mm': 'millimeters',
    'cm': 'centimeters',
    'm': 'meters',
    'km': 'kilometers',
    'in': 'inches',
    'ft': 'feet',
    'ml': 'milliliters',
    'L': 'liters',
    'tsp': 'teaspoons',
    'tbsp': 'tablespoons',
    'cup': 'cups',
    'gal': 'gallons',
    'sec': 'seconds',
    'min': 'minutes',
    'hr': 'hours',
    'day': 'days',
    'KB': 'kilobytes',
    'MB': 'megabytes',
    'GB': 'gigabytes',
  };
  export default {
  generatePuzzle,
  checkAnswer,
  formatUnit
};
  
  return unitFormats[unit] || unit;
}
