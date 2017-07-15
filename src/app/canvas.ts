import { WIDTH, HEIGHT } from './dimensions';

export function getCanvas() {
  const canvas = document.createElement('canvas');

  canvas.height = HEIGHT;
  canvas.width = WIDTH;
  const container = document.createElement('div');
  container.appendChild(canvas);
  document.body.appendChild(container);
  return canvas;
}
