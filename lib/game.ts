// lib/game.ts
const UNITS = [
  { from: 'mg', to: 'g', factor: 0.001 },
  { from: 'g', to: 'kg', factor: 0.001 },
  { from: 'kg', to: 'ton', factor: 0.001 },
];

// Simple ID generator
const generateId = () => Date.now().toString(36) + Math.random().toString(36).substring(2);

export const generatePuzzle = (difficulty: 'easy' | 'medium' | 'hard') => {
  const unit = UNITS[Math.floor(Math.random() * UNITS.length)];
  const value = Math.floor(Math.random() * 1000) + 1;
  const answer = value * unit.factor;
  
  return {
    id: generateId(), // Use our simple ID generator
    text: `_____ ${unit.to} = ${value} ${unit.from}`,
    answer,
    timeLimit: difficulty === 'easy' ? 20 : difficulty === 'medium' ? 15 : 10
  };
};

export const validateAnswer = async (puzzleId: string, userAnswer: string) => {
  // Implement your actual validation logic here
  // For now, return true for testing
  return true;
};
