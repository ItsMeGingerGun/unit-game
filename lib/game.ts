const UNITS = [
  { from: 'mg', to: 'g', factor: 0.001 },
  { from: 'g', to: 'kg', factor: 0.001 },
  { from: 'kg', to: 'ton', factor: 0.001 },
];

export const generatePuzzle = (difficulty: 'easy' | 'medium' | 'hard') => {
  const unit = UNITS[Math.floor(Math.random() * UNITS.length)];
  const value = Math.floor(Math.random() * 1000) + 1;
  const answer = value * unit.factor;
  
  return {
    id: crypto.randomUUID(),
    text: `_____ ${unit.to} = ${value} ${unit.from}`,
    answer,
    timeLimit: difficulty === 'easy' ? 20 : difficulty === 'medium' ? 15 : 10
  };
};
