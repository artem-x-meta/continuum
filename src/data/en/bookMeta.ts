import type { ChapterMeta } from '../book';

export const englishChapterTitles: Record<number, string> = {
  1: 'Elements of Linear Algebra',
  2: 'Elements of Vector Algebra',
  3: 'Analytic Geometry in the Plane',
  4: 'Analytic Geometry in Space',
  5: 'Introduction to Analysis',
  6: 'Complex Numbers',
  7: 'The Indefinite Integral',
  8: 'The Definite Integral',
  9: 'Functions of Several Variables',
  10: 'Differential Equations',
  11: 'Double and Triple Integrals',
  12: 'Line and Surface Integrals',
  13: 'Numerical Series',
  14: 'Power Series',
  15: 'Fourier Series and the Fourier Integral',
  16: 'Elements of Vector Field Theory',
  17: 'Elements of Complex Analysis',
  18: 'Elements of Operational Calculus',
};

export const englishChapterMeta: Record<number, ChapterMeta> = {
  1: {
    kicker: 'Structure', shortTitle: 'Linear algebra',
    description: 'Matrices, determinants, and systems of equations form one language for data and linear models.',
    outcome: 'You will turn large systems into a sequence of transparent operations.',
    formula: 'A x = b', symbol: 'A', track: 'Foundation', accent: 'blue', hours: 8,
  },
  2: {
    kicker: 'Direction', shortTitle: 'Vector algebra',
    description: 'Vectors, projections, and three products connect numerical coordinates with spatial geometry.',
    outcome: 'You will compute lengths, angles, areas, and volumes from coordinates.',
    formula: 'a · b = |a||b| cos α', symbol: '→', track: 'Foundation', accent: 'green', hours: 7,
  },
  3: {
    kicker: 'Shape', shortTitle: 'Geometry in the plane',
    description: 'Lines and conic sections viewed as sets of points defined by equations.',
    outcome: 'You will learn to read geometry directly from an equation’s coefficients.',
    formula: 'Ax + By + C = 0', symbol: '○', track: 'Foundation', accent: 'coral', hours: 7,
  },
  4: {
    kicker: 'Space', shortTitle: 'Geometry in 3D',
    description: 'Planes, lines, and quadric surfaces in three-dimensional coordinates.',
    outcome: 'You will solve problems about the relative position of objects in space.',
    formula: 'Ax + By + Cz + D = 0', symbol: '◇', track: 'Foundation', accent: 'violet', hours: 8,
  },
  5: {
    kicker: 'Change', shortTitle: 'Introduction to analysis',
    description: 'Limits, continuity, and derivatives—the three ideas that support mathematical analysis.',
    outcome: 'You will describe how a function behaves near one point and across an interval.',
    formula: "f′(x) = lim Δf/Δx", symbol: '∂', track: 'Analysis', accent: 'blue', hours: 18,
  },
  6: {
    kicker: 'Extension', shortTitle: 'Complex numbers',
    description: 'Two-coordinate numbers for which multiplication and rotation become the same operation.',
    outcome: 'You will move confidently between algebraic, trigonometric, and exponential forms.',
    formula: 'z = r(cos φ + i sin φ)', symbol: 'i', track: 'Analysis', accent: 'violet', hours: 4,
  },
  7: {
    kicker: 'Reverse motion', shortTitle: 'Indefinite integral',
    description: 'Antiderivatives and integration methods, from a standard table to structural substitutions.',
    outcome: 'You will recognize the form of an integrand and choose an effective method.',
    formula: '∫ f(x) dx = F(x) + C', symbol: '∫', track: 'Analysis', accent: 'green', hours: 10,
  },
  8: {
    kicker: 'Accumulation', shortTitle: 'Definite integral',
    description: 'Area, distance, volume, and mass as limits of sums of infinitesimal contributions.',
    outcome: 'You will build integral models for geometric and physical problems.',
    formula: '∫ₐᵇ f(x) dx = F(b) − F(a)', symbol: '∫', track: 'Analysis', accent: 'coral', hours: 9,
  },
  9: {
    kicker: 'Many dimensions', shortTitle: 'Multivariable functions',
    description: 'Surfaces, partial derivatives, tangent planes, and multivariable extrema.',
    outcome: 'You will study an outcome that depends on several factors at once.',
    formula: 'df = fₓ dx + fᵧ dy', symbol: '∇', track: 'Analysis', accent: 'violet', hours: 7,
  },
  10: {
    kicker: 'Dynamics', shortTitle: 'Differential equations',
    description: 'Equations whose unknown is a function and whose law links it to its derivatives.',
    outcome: 'You will build and solve basic models of motion, growth, and oscillation.',
    formula: "y′ = f(x, y)", symbol: 'ẏ', track: 'Analysis', accent: 'blue', hours: 11,
  },
  11: {
    kicker: 'Volume', shortTitle: 'Multiple integrals',
    description: 'Summation over regions and solids in Cartesian, polar, and spherical coordinates.',
    outcome: 'You will find volumes, masses, and centers of mass of multidimensional objects.',
    formula: '∬ᴰ f(x,y) dA', symbol: '∬', track: 'Accumulation', accent: 'green', hours: 7,
  },
  12: {
    kicker: 'Along a path', shortTitle: 'Line and surface integrals',
    description: 'Integration along curves and over surfaces, including Green, Gauss, and Stokes theorems.',
    outcome: 'You will see how local properties of a field become global quantities.',
    formula: '∮ F · dr', symbol: '∮', track: 'Accumulation', accent: 'coral', hours: 10,
  },
  13: {
    kicker: 'Infinite sum', shortTitle: 'Numerical series',
    description: 'Convergence of infinite sums and tests that avoid computing the sum itself.',
    outcome: 'You will determine whether an infinite process has a finite result.',
    formula: 'Σₙ₌₁∞ aₙ', symbol: 'Σ', track: 'Accumulation', accent: 'blue', hours: 6,
  },
  14: {
    kicker: 'A function as a sum', shortTitle: 'Power series',
    description: 'Taylor and Maclaurin series: building a complicated function from simple powers.',
    outcome: 'You will approximate functions by polynomials and control the region of convergence.',
    formula: 'f(x) = Σ aₙ(x−x₀)ⁿ', symbol: 'T', track: 'Accumulation', accent: 'violet', hours: 6,
  },
  15: {
    kicker: 'Spectrum', shortTitle: 'Fourier series',
    description: 'Decomposing a signal into harmonics and passing from periodic functions to the Fourier integral.',
    outcome: 'You will see a complicated oscillation as a collection of simple frequencies.',
    formula: 'f(x) = a₀/2 + Σ(aₙ cos nx + bₙ sin nx)', symbol: 'ƒ', track: 'Accumulation', accent: 'green', hours: 6,
  },
  16: {
    kicker: 'Flows', shortTitle: 'Vector fields',
    description: 'Gradient, divergence, and curl describe direction, sources, and rotation in a field.',
    outcome: 'You will translate geometric field behavior into differential operations.',
    formula: '∇ = i∂ₓ + j∂ᵧ + k∂𝓏', symbol: '∇', track: 'Fields & transforms', accent: 'coral', hours: 7,
  },
  17: {
    kicker: 'Complex analysis', shortTitle: 'Complex analysis',
    description: 'Analytic functions, Cauchy’s integral, Laurent series, and residue theory.',
    outcome: 'You will see why complex differentiability is exceptionally rigid.',
    formula: 'f(z) = Σ aₙ(z−z₀)ⁿ', symbol: 'ℂ', track: 'Fields & transforms', accent: 'violet', hours: 10,
  },
  18: {
    kicker: 'A change of language', shortTitle: 'Operational calculus',
    description: 'The Laplace transform turns differentiation into algebraic operations.',
    outcome: 'You will solve linear differential equations in the transform domain.',
    formula: 'F(s) = ∫₀∞ f(t)e⁻ˢᵗ dt', symbol: 'ℒ', track: 'Fields & transforms', accent: 'blue', hours: 5,
  },
};

export const englishTracks = [
  { name: 'Foundation', label: '01 · Geometry of structures', description: 'Start by seeing shape in number tables, vectors, and equations.', chapters: [1, 2, 3, 4] },
  { name: 'Analysis', label: '02 · Change', description: 'Limits, derivatives, integrals, and equations of motion.', chapters: [5, 6, 7, 8, 9, 10] },
  { name: 'Accumulation', label: '03 · Sums and signals', description: 'Integrate in several dimensions and sum infinite series and processes.', chapters: [11, 12, 13, 14, 15] },
  { name: 'Fields & transforms', label: '04 · Fields and transforms', description: 'Connect local change, complex functions, and transformed representations.', chapters: [16, 17, 18] },
] as const;
