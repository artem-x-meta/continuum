export type Matrix2 = [number, number, number, number];

export function determinant([a, b, c, d]: Matrix2) {
  return a * d - b * c;
}

export function transformPoint([a, b, c, d]: Matrix2, x: number, y: number) {
  return { x: a * x + b * y, y: c * x + d * y };
}

export function derivativeFunction(x: number) {
  return 0.25 * x ** 3 - x;
}

export function exactDerivative(x: number) {
  return 0.75 * x ** 2 - 1;
}

export function secantSlope(x: number, h: number) {
  return (derivativeFunction(x + h) - derivativeFunction(x)) / h;
}

export function riemannFunction(x: number) {
  return x ** 2 / 4 + 0.5;
}

export function riemannExact(a = 0, b = 4) {
  const primitive = (x: number) => x ** 3 / 12 + x / 2;
  return primitive(b) - primitive(a);
}

export function midpointRiemann(n: number, a = 0, b = 4) {
  const width = (b - a) / n;
  return Array.from({ length: n }, (_, index) => {
    const x = a + (index + 0.5) * width;
    return { x, left: a + index * width, width, height: riemannFunction(x) };
  });
}

export function fourierSquare(x: number, harmonics: number) {
  let sum = 0;
  for (let k = 0; k < harmonics; k += 1) {
    const frequency = 2 * k + 1;
    sum += Math.sin(frequency * x) / frequency;
  }
  return (4 / Math.PI) * sum;
}
