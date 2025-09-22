import type { Circle } from "./stores/useLightCatch";

/**
 * Generates a random circle position and size within canvas bounds
 */
export function generateRandomCircle(canvasWidth: number, canvasHeight: number): Circle {
  const minRadius = 25;
  const maxRadius = 45;
  const radius = Math.random() * (maxRadius - minRadius) + minRadius;
  
  // Ensure circle doesn't go off screen
  const margin = radius + 10;
  const x = Math.random() * (canvasWidth - margin * 2) + margin;
  const y = Math.random() * (canvasHeight - margin * 2) + margin;
  
  return { x, y, radius };
}

/**
 * Checks if a point is within a circle
 */
export function isPointInCircle(pointX: number, pointY: number, circle: Circle): boolean {
  const dx = pointX - circle.x;
  const dy = pointY - circle.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance <= circle.radius;
}

/**
 * Calculates distance between two points
 */
export function getDistance(x1: number, y1: number, x2: number, y2: number): number {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Generates a random color for visual variety
 */
export function getRandomColor(): string {
  const colors = [
    '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', 
    '#ffeaa7', '#dda0dd', '#98d8c8', '#f7dc6f'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}
