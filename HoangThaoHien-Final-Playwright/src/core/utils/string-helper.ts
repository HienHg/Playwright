export function generateName(): string {
    return `user${Date.now()}`;
}

export function genRandomArray(length: number, min: number, max: number): number[] {
  if (length > max - min + 1) throw new Error("Not enough unique numbers");

  return [...Array(max - min + 1).keys()]     
           .map(i => i + min)              
           .sort(() => Math.random() - 0.5) 
           .slice(0, length);            
}

