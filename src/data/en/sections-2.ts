import type { EnglishSectionBundle } from './types';

export const englishSections2: Record<number, EnglishSectionBundle> = {
  28: {
    title: 'Operations on complex numbers',
    topics: [
      'Addition of complex numbers',
      'Subtraction of complex numbers',
      'Multiplication of complex numbers',
      'Division of complex numbers',
      'Extracting roots of complex numbers',
    ],
    guide: {
      summary: 'Complex numbers are added and subtracted componentwise, while multiplication follows the rule i² = −1. In division, the denominator is rationalized using its conjugate, and roots of a nonzero number are most conveniently found in polar form.',
      keyIdea: 'Algebraic form is convenient for addition, whereas polar form is best suited to multiplication, division, and root extraction.',
      formula: 'z_k=\\sqrt[n]{r}\\,e^{i(\\varphi+2\\pi k)/n},\\quad k=0,\\ldots,n-1',
      question: 'Why do the arguments of consecutive nth roots differ by 2π/n?',
    },
    detail: {
      hook: 'Multiplication of complex numbers combines a change of scale and a rotation of the plane in a single operation. Fluency with these operations opens the way to polynomial roots, oscillations, and signal transformations.',
      explanation: [
        'In algebraic form, addition and subtraction are performed separately on the real and imaginary parts, while multiplication uses the identity i² = −1. To divide, multiply the numerator and denominator by the conjugate of the denominator, making the denominator real. Division by the complex number zero is undefined.',
        'In polar form, multiplication multiplies the moduli and adds the arguments; division divides the moduli and subtracts the arguments. The nth roots of a nonzero number have modulus ⁿ√r and arguments (φ + 2πk)/n for k from 0 to n − 1. Thus all n roots are evenly spaced on a circle.',
      ],
      terms: [
        { term: 'Complex conjugate', definition: 'For z = a + bi, this is the number z̄ = a − bi, and z z̄ = a² + b².' },
        { term: 'Modulus', definition: 'The nonnegative number |z| = √(a² + b²), equal to the distance from z to the origin.' },
        { term: 'Argument', definition: 'The direction angle φ of a nonzero complex number, defined up to an additive term 2πk.' },
        { term: 'Nth root', definition: 'A complex number w satisfying wⁿ = z.' },
      ],
      example: {
        title: 'Three cube roots',
        problem: 'Find all solutions of the equation z³ = 8i.',
        steps: [
          'Write 8i in polar form: its modulus is 8, and one of its arguments is π/2.',
          'The modulus of each root is ∛8 = 2, and the arguments are π/6 + 2πk/3 for k = 0, 1, 2.',
          'For k = 0, 1, 2, the corresponding angles are π/6, 5π/6, and 3π/2.',
          'Convert to algebraic form: √3 + i, −√3 + i, and −2i.',
        ],
        answer: 'z ∈ {√3 + i, −√3 + i, −2i}.',
      },
      pitfall: 'A common mistake is to use only the principal argument and obtain one root instead of n roots. Substitute every k from 0 to n − 1 and verify that the resulting values are distinct.',
      practice: {
        question: 'Compute (3 + 4i)/(1 − 2i).',
        answer: 'Multiplying the numerator and denominator by 1 + 2i gives (−5 + 10i)/5 = −1 + 2i.',
      },
    },
  },
  29: {
    title: 'The indefinite integral',
    topics: [
      'The concept of the indefinite integral',
      'Properties of the indefinite integral',
      'Table of basic indefinite integrals',
    ],
    guide: {
      summary: 'The indefinite integral of a function on an interval is the family of all its antiderivatives. If the interval is connected, any two antiderivatives of the same function differ by a constant.',
      keyIdea: 'The validity of an antiderivative can always be checked by differentiation.',
      formula: '\\int f(x)\\,dx=F(x)+C,\\quad F^{\\prime}(x)=f(x)',
      question: 'How can one verify that F(x) + C truly represents the entire indefinite integral?',
    },
    detail: {
      hook: 'The derivative describes a rate of change, while the indefinite integral reconstructs a quantity from that rate. This inverse problem underlies the solution of differential equations and the evaluation of definite integrals.',
      explanation: [
        'A function F is called an antiderivative of f on an interval if F′(x) = f(x) at every point of the interval. The indefinite integral denotes the entire family F(x) + C, where C is an arbitrary constant. On a connected interval, any two antiderivatives of the same function differ only by a constant.',
        'Linearity allows a finite sum to be integrated term by term and constant factors to be taken outside the integral. A table of integrals is obtained by reversing familiar differentiation rules, but each formula must be applied with its domain in mind. The result is readily checked by differentiating it.',
      ],
      terms: [
        { term: 'Antiderivative', definition: 'A function F whose derivative on the interval under consideration equals the given function f.' },
        { term: 'Indefinite integral', definition: 'The set of all antiderivatives of a function, written as ∫f(x) dx = F(x) + C.' },
        { term: 'Constant of integration', definition: 'An arbitrary constant C that accounts for all antiderivatives of the same function.' },
      ],
      example: {
        title: 'Integral of a sum',
        problem: 'Find ∫(3x² − 4/x) dx on an interval that does not contain zero.',
        steps: [
          'By linearity, split the integral into ∫3x² dx and −4∫dx/x.',
          'The corresponding antiderivatives are x³ and ln|x|.',
          'Add a single constant of integration.',
        ],
        answer: 'x³ − 4 ln|x| + C.',
      },
      pitfall: 'A common mistake is to omit the constant C or to write separate independent constants after every term. In the final answer all constants are combined into one, and the result is checked by differentiation.',
      practice: {
        question: 'Find ∫(2 cos x − eˣ) dx.',
        answer: '2 sin x − eˣ + C.',
      },
    },
  },
  30: {
    title: 'Basic methods of integration',
    topics: [
      'Direct integration',
      'Integration by substitution (change of variable)',
      'Integration by parts',
    ],
    guide: {
      summary: 'A change of variable reverses the chain rule and simplifies coordinated parts of the integrand. Integration by parts reverses the product rule and transfers differentiation from one factor to another.',
      keyIdea: 'Choose the method according to the structure of the integral, aiming to obtain a simpler standard integral.',
      formula: '\\int u\\,dv=uv-\\int v\\,du',
      question: 'What structural feature of an integral suggests a successful change of variable?',
    },
    detail: {
      hook: 'Most substantial integrals do not literally match a tabulated formula, yet they often conceal a familiar structure. Substitution and integration by parts reveal that structure.',
      explanation: [
        'The substitution u = g(x) reverses the chain rule: the combination f(g(x))g′(x) dx becomes f(u) du. A successful new variable should simplify both the expression and the differential. For an indefinite integral, one returns to the original variable after integrating.',
        'The integration-by-parts formula ∫u dv = uv − ∫v du follows from the product rule. It is used when differentiating one factor simplifies it and the other factor is easy to integrate. The method may need to be repeated or combined with substitution.',
      ],
      terms: [
        { term: 'Change of variable', definition: 'A transition from the original variable x to a new variable u together with a transformation of the differential.' },
        { term: 'Integration by parts', definition: 'The transformation of ∫u dv into uv − ∫v du, reversing the product rule.' },
        { term: 'Differential of a substitution', definition: 'The identity du = g′(x) dx, which must be consistent with the integrand.' },
      ],
      example: {
        title: 'A polynomial times an exponential',
        problem: 'Find ∫x eˣ dx.',
        steps: [
          'Choose u = x and dv = eˣ dx; then du = dx and v = eˣ.',
          'Integration by parts gives x eˣ − ∫eˣ dx.',
          'Evaluate the remaining integral and add a constant.',
        ],
        answer: '(x − 1)eˣ + C.',
      },
      pitfall: 'A common mistake is to replace an expression without transforming dx, or to lose the derivative of the inner function. Write the new variable and its differential explicitly before integrating.',
      practice: {
        question: 'Find ∫2x cos(x²) dx.',
        answer: 'With u = x², we have du = 2x dx, so the answer is sin(x²) + C.',
      },
    },
  },
  31: {
    title: 'Integration of rational functions',
    topics: [
      'Rational functions',
      'Integration of elementary rational fractions',
      'Integration of rational fractions',
    ],
    guide: {
      summary: 'If the degree of the numerator is not less than that of the denominator, first perform polynomial division with remainder. After factoring the denominator, decompose the proper fraction into partial fractions and integrate each term separately.',
      keyIdea: 'Partial-fraction decomposition reduces the integration of any rational function to a finite collection of standard forms.',
      formula: '\\frac1{(x-a)(x-b)}=\\frac1{a-b}\\left(\\frac1{x-a}-\\frac1{x-b}\\right),\\quad a\\ne b',
      question: 'Why must polynomial division precede the decomposition of an improper rational fraction?',
    },
    detail: {
      hook: 'A quotient of polynomials may look unwieldy, but its integral always reduces to standard elementary forms. The key is the algebraic factorization of the denominator and a partial-fraction decomposition.',
      explanation: [
        'If the degree of the numerator is at least the degree of the denominator, first perform polynomial division with remainder. Then factor the denominator of the proper fraction over the real numbers into linear and irreducible quadratic factors. For every factor and each of its multiplicities, write the complete set of partial fractions.',
        'The coefficients are found by bringing the terms to a common denominator and comparing coefficients, or by substituting convenient values of x. Linear denominators yield logarithms and negative powers, while irreducible quadratic factors may also yield arctangents. The domain of the antiderivative is considered separately on each interval between poles.',
      ],
      terms: [
        { term: 'Rational function', definition: 'A quotient P(x)/Q(x) of two polynomials, where Q(x) ≠ 0.' },
        { term: 'Proper rational fraction', definition: 'A rational fraction whose numerator has lower degree than its denominator.' },
        { term: 'Partial fraction', definition: 'A term with a linear denominator raised to a power k, or with an irreducible quadratic denominator raised to a power k and a linear numerator.' },
        { term: 'Pole', definition: 'A zero of the reduced denominator near which the magnitude of the rational function grows without bound.' },
      ],
      example: {
        title: 'Partial-fraction decomposition',
        problem: 'Find ∫(3x + 5)/(x² + x − 2) dx.',
        steps: [
          'Factor the denominator: x² + x − 2 = (x + 2)(x − 1).',
          'Write (3x + 5)/((x + 2)(x − 1)) = A/(x + 2) + B/(x − 1).',
          'From 3x + 5 = A(x − 1) + B(x + 2), obtain A = 1/3 and B = 8/3.',
          'Integrate the two logarithmic terms.',
        ],
        answer: '(1/3) ln|x + 2| + (8/3) ln|x − 1| + C.',
      },
      pitfall: 'A common mistake is to decompose an improper fraction or omit powers of a repeated factor. First perform division, then list every denominator from the first power through its full multiplicity.',
      practice: {
        question: 'Find ∫dx/(x² − 1).',
        answer: '(1/2) ln|(x − 1)/(x + 1)| + C.',
      },
    },
  },
  32: {
    title: 'Integration of trigonometric functions',
    topics: [
      'The universal trigonometric substitution',
      'Integrals of the form ∫ sinᵐ x · cosⁿ x dx',
      'Use of trigonometric transformations',
    ],
    guide: {
      summary: 'A rational expression in sin x and cos x can always be rationalized by the universal tangent half-angle substitution. For powers of sine and cosine, it is usually faster to use the parity of the exponents, power-reduction identities, and a suitable differential.',
      keyIdea: 'A chosen transformation should preserve the differential and reduce the algebraic complexity of the integral.',
      formula: 't=\\tan\\frac x2,\\quad \\sin x=\\frac{2t}{1+t^2},\\quad \\cos x=\\frac{1-t^2}{1+t^2},\\quad dx=\\frac{2\\,dt}{1+t^2}',
      question: 'Which substitution converts a rational function of sin x and cos x into a rational function of a new variable?',
    },
    detail: {
      hook: 'A trigonometric integral often becomes simple after one well-chosen identity. Instead of trying formulas at random, first inspect the parity of the powers and identify a suitable differential.',
      explanation: [
        'In integrals involving powers of sin x and cos x, one usually separates one factor from an odd power and replaces the remaining square using sin²x + cos²x = 1. If both powers are even, use power-reduction identities. Product-to-sum identities help with products of functions having different frequencies.',
        'Any rational function of sin x and cos x can locally be converted into a rational function by the substitution t = tan(x/2). Then sin x = 2t/(1 + t²), cos x = (1 − t²)/(1 + t²), and dx = 2dt/(1 + t²). The universal substitution is reliable, but it often produces more cumbersome algebra than a specialized identity.',
      ],
      terms: [
        { term: 'Universal trigonometric substitution', definition: 'The substitution t = tan(x/2), which rationalizes sin x, cos x, and dx.' },
        { term: 'Power reduction', definition: 'Replacing squares of trigonometric functions by expressions involving the double angle.' },
        { term: 'Rationalization', definition: 'Transforming an integral into a rational function of a new variable.' },
      ],
      example: {
        title: 'An odd power of sine',
        problem: 'Find ∫sin³x cos²x dx.',
        steps: [
          'Write sin³x as sin x(1 − cos²x).',
          'Let u = cos x; then du = −sin x dx.',
          'This gives −∫(u² − u⁴)du = −u³/3 + u⁵/5 + C.',
          'Return to x.',
        ],
        answer: 'cos⁵x/5 − cos³x/3 + C.',
      },
      pitfall: 'A common mistake is to apply the universal substitution mechanically and create unnecessary algebra when separating a single factor would suffice. First check the parity of the powers and whether the derivative of sin x or cos x can be isolated.',
      practice: {
        question: 'Find ∫sin x cos³x dx.',
        answer: 'With u = cos x, the answer is −cos⁴x/4 + C.',
      },
    },
  },
  33: {
    title: 'Integration of irrational functions',
    topics: [
      'Quadratic irrationalities',
      'Linear fractional substitution',
      'Trigonometric substitution',
      'Integrals of the form ∫ R(x; √(ax² + bx + c)) dx',
      'Integration of a differential binomial',
    ],
    guide: {
      summary: 'An irrational integral is transformed into a rational one using a substitution adapted to the radical. For a square root of a quadratic trinomial, complete the square and use a trigonometric or Euler substitution; for a differential binomial, analyze its exponents.',
      keyIdea: 'The form of the expression under the radical determines both the change of variable and the admissible range of the new parameter.',
      formula: 'x=a\\sin t,\\quad \\sqrt{a^2-x^2}=a\\cos t\\quad (a>0,\\ |t|\\le\\pi/2)',
      question: 'Why must the range of the parameter t be considered when substituting x = a sin t?',
    },
    detail: {
      hook: 'A radical in an integral need not make the problem harder if one chooses a coordinate in which it disappears. Such substitutions connect algebra with the geometry of circles and hyperbolic relations.',
      explanation: [
        'The expressions √(a² − x²), √(a² + x²), and √(x² − a²) are rationalized by the trigonometric substitutions x = a sin t, x = a tan t, and x = a sec t, respectively. Choose the range of t so that the absolute value arising from the square root is handled correctly. After integration, always return to the original variable and its domain.',
        'For a general square root of a quadratic trinomial, first complete the square and then choose a trigonometric or Euler substitution. A differential binomial xᵐ(a + bxⁿ)ᵖ can also be rationalized by a power substitution under certain relations among its exponents. A substitution is useful only if it transforms the entire integral, including dx.',
      ],
      terms: [
        { term: 'Quadratic irrationality', definition: 'An expression containing the square root of a quadratic polynomial.' },
        { term: 'Trigonometric substitution', definition: 'A change of variable that uses an identity involving squares of sine, cosine, or tangent to eliminate a radical.' },
        { term: 'Euler substitution', definition: 'A rationalizing substitution for the square root of a quadratic trinomial that relates the radical to a linear expression in the new variable.' },
        { term: 'Differential binomial', definition: 'An integral of the form ∫xᵐ(a + bxⁿ)ᵖ dx.' },
      ],
      example: {
        title: 'A circular radical',
        problem: 'Find ∫dx/√(9 − x²) for |x| < 3.',
        steps: [
          'Let x = 3 sin t and choose −π/2 < t < π/2.',
          'Then dx = 3 cos t dt and √(9 − x²) = 3 cos t.',
          'The integral reduces to ∫dt = t + C.',
          'Since t = arcsin(x/3), return to the original variable.',
        ],
        answer: 'arcsin(x/3) + C.',
      },
      pitfall: 'A common mistake is to write √(a² cos²t) as a cos t without restricting the sign of the cosine. Choose a range of t on which cos t is nonnegative, or retain the absolute value explicitly.',
      practice: {
        question: 'Find ∫x dx/√(x² + 4).',
        answer: 'With u = x² + 4, the result is √(x² + 4) + C.',
      },
    },
  },
  34: {
    title: '“Elementary” and “nonelementary” integrals',
    topics: [],
    guide: {
      summary: 'An elementary function may have no antiderivative expressible as a finite combination of elementary functions. The integral still exists: it may be represented by a special function, a definite integral, a series, or a numerical approximation.',
      keyIdea: 'An integral that has no elementary antiderivative must not be confused with a divergent integral.',
      formula: '\\operatorname{erf}(x)=\\frac{2}{\\sqrt\\pi}\\int_0^x e^{-t^2}\\,dt',
      question: 'What exactly does it mean to say that an integral cannot be expressed in elementary functions?',
    },
    detail: {
      hook: 'Even a simple-looking elementary function may have no elementary antiderivative. This is not a dead end, but an entry point into the world of special functions, series, and numerical methods.',
      explanation: [
        'The phrase “the integral cannot be evaluated” usually means that its antiderivative cannot be written as a finite combination of standard elementary functions. For example, e⁻ˣ² has no such elementary antiderivative, even though the function is smooth and its integral exists on every finite interval. A nonelementary antiderivative is not the same as divergence.',
        'New functions may be defined by integrals and then studied through their properties, derivatives, and approximations. This is how the error function erf, important in probability theory and diffusion, arises. Practical values can be obtained from a definite integral, a power series, or numerical quadrature.',
      ],
      terms: [
        { term: 'Elementary function', definition: 'A function obtained through finitely many algebraic operations and compositions from power, exponential, logarithmic, trigonometric, and inverse trigonometric functions.' },
        { term: 'Elementary antiderivative', definition: 'An antiderivative representable by an elementary function.' },
        { term: 'Special function', definition: 'A named function that recurs across applications and is often defined by an integral, a series, or a differential equation.' },
      ],
      example: {
        title: 'The error function',
        problem: 'Express ∫e⁻ˣ² dx in terms of erf(x), given erf(x) = (2/√π)∫₀ˣe⁻ᵗ² dt.',
        steps: [
          'The definition implies that the derivative of erf(x) is (2/√π)e⁻ˣ².',
          'Multiply erf(x) by √π/2 to obtain the required derivative e⁻ˣ².',
          'Add a constant of integration.',
        ],
        answer: '(√π/2)erf(x) + C.',
      },
      pitfall: 'A common mistake is to declare a definite integral nonexistent merely because no elementary antiderivative has been found. Convergence must be checked separately; the value may be defined by a special function or computed numerically.',
      practice: {
        question: 'Does ∫₀¹e⁻ˣ² dx converge, and how is it written in terms of erf?',
        answer: 'Yes. The function is continuous on the interval; the value is (√π/2)erf(1), approximately 0.746824.',
      },
    },
  },
  35: {
    title: 'The definite integral as the limit of an integral sum',
    topics: [],
    guide: {
      summary: 'An integral sum adds function values at selected points multiplied by the lengths of small subintervals. A function is Riemann integrable if, as the partition is refined, these sums have one finite limit independent of the selected points.',
      keyIdea: 'The definite integral is the limit of the total local contribution over the entire interval.',
      formula: '\\int_a^b f(x)\\,dx=\\lim_{\\max_i\\Delta x_i\\to0}\\sum_i f(\\xi_i)\\Delta x_i',
      question: 'Why must the limit of integral sums be independent of the choice of points ξᵢ within the subintervals?',
    },
    detail: {
      hook: 'The definite integral arises not from the symbol for an antiderivative, but from the limit of increasingly accurate sums. This construction rigorously explains why area and accumulation can be represented by a single number.',
      explanation: [
        'Partition the interval using points a = x₀ < x₁ < … < xₙ = b, and select a point ξᵢ in each subinterval. The integral sum is Σf(ξᵢ)Δxᵢ, where Δxᵢ is the length of the subinterval. The mesh of a partition is measured by the maximum length of its subintervals.',
        'If, as the mesh tends to zero, all such sums approach the same finite limit regardless of the choice of ξᵢ, the function is Riemann integrable. Every function continuous on a closed interval is integrable, as is every bounded function with finitely many discontinuities. The definition remains important even when the integral is subsequently evaluated using an antiderivative.',
      ],
      terms: [
        { term: 'Partition', definition: 'A finite ordered set of points dividing an interval into subintervals.' },
        { term: 'Mesh of a partition', definition: 'The maximum length among all subintervals of the partition.' },
        { term: 'Integral sum', definition: 'The sum Σf(ξᵢ)Δxᵢ of the local contributions of the function on the subintervals.' },
        { term: 'Riemann integrability', definition: 'The existence of a common finite limit of integral sums as the mesh of the partition tends to zero.' },
      ],
      example: {
        title: 'Limit of right-endpoint sums',
        problem: 'Use the definition to evaluate ∫₀¹x dx with n equal subintervals and right endpoints.',
        steps: [
          'The width of each subinterval is 1/n, and the right endpoint of the ith subinterval is i/n.',
          'The sum is Σ(i/n)(1/n) = (1/n²)Σi.',
          'Use Σi = n(n + 1)/2 to obtain (n + 1)/(2n).',
          'As n → ∞, the limit is 1/2.',
        ],
        answer: '∫₀¹x dx = 1/2.',
      },
      pitfall: 'A common mistake is to increase the number of subintervals without controlling their maximum length, or to omit the factor Δxᵢ. Verify that the mesh tends to zero and include the width of every subinterval in the sum.',
      practice: {
        question: 'What is ∫₃⁷2 dx, and how is this seen from integral sums?',
        answer: 'Every sum equals 2ΣΔxᵢ = 2(7 − 3), so the integral is 8.',
      },
    },
  },
  36: {
    title: 'Geometric and physical meaning of the definite integral',
    topics: [],
    guide: {
      summary: 'For a nonnegative function, the definite integral equals the area under its graph; for a function of arbitrary sign, it gives signed area. In physical models, an integral accumulates a quantity from its density or rate of change.',
      keyIdea: 'The sign and units of the integrand determine the meaning of the accumulated result.',
      formula: 'S=\\int_a^b |f(x)-g(x)|\\,dx',
      question: 'How does geometric area differ from signed area when the graph crosses the axis?',
    },
    detail: {
      hook: 'The same integral may represent area, displacement, mass, or accumulated charge. The meaning of the result is determined by what the integrand measures and how its sign is interpreted.',
      explanation: [
        'For a continuous nonnegative function, ∫ₐᵇf(x) dx equals the area under its graph. If the function changes sign, the integral gives signed area: regions below the axis are subtracted. Ordinary geometric area is obtained by integrating |f| or by splitting the interval at sign changes.',
        'If q′(t) is the rate of change of a quantity q, then the integral of that rate gives the total change in q. Thus the integral of velocity equals displacement, whereas distance traveled is the integral of the speed. The units of an integral are the product of the units of the integrand and those of the variable.',
      ],
      terms: [
        { term: 'Signed area', definition: 'The difference between the areas above and below the axis, taking the sign of the function into account.' },
        { term: 'Geometric area', definition: 'A nonnegative measure of a region, computed by integrating the absolute difference between its boundaries.' },
        { term: 'Accumulated quantity', definition: 'The total obtained by summing a density or rate of change over an interval.' },
      ],
      example: {
        title: 'Displacement and distance',
        problem: 'A particle has velocity v(t) = 3t² − 6t for 0 ≤ t ≤ 3. Find its displacement and distance traveled.',
        steps: [
          'An antiderivative of the velocity is F(t) = t³ − 3t², so the displacement F(3) − F(0) is zero.',
          'The velocity changes sign at t = 2: it is negative on (0, 2) and positive on (2, 3).',
          'The distance is −∫₀²v(t)dt + ∫₂³v(t)dt.',
          'Since F(0) = 0, F(2) = −4, and F(3) = 0, both contributions to the distance equal 4.',
        ],
        answer: 'The displacement is 0, and the distance traveled is 8.',
      },
      pitfall: 'A common mistake is to treat the integral of velocity as distance traveled when the direction changes. To find distance, locate the zeros of velocity, split the interval, and integrate |v(t)|.',
      practice: {
        question: 'Find the signed and geometric areas for f(x) = x on [−1, 1].',
        answer: 'The signed area is 0, while the geometric area ∫₋₁¹|x|dx is 1.',
      },
    },
  },
  37: {
    title: 'The Newton–Leibniz formula',
    topics: [],
    guide: {
      summary: 'If f is continuous, the accumulation function with a variable upper limit has derivative f. Therefore, a definite integral is evaluated as the change in any antiderivative between the endpoints.',
      keyIdea: 'The Newton–Leibniz formula connects the local operation of differentiation with global accumulation.',
      formula: '\\frac d{dx}\\int_a^x f(t)\\,dt=f(x),\\quad \\int_a^b f(x)\\,dx=F(b)-F(a)',
      question: 'Why does the constant of integration disappear when a definite integral is evaluated?',
    },
    detail: {
      hook: 'The Newton–Leibniz formula turns an infinite limiting process into the evaluation of a function at two points. It is the central bridge between derivatives and integrals.',
      explanation: [
        'If f is continuous, the accumulation function G(x) = ∫ₐˣf(t)dt is differentiable and G′(x) = f(x). Thus the definite integral itself constructs an antiderivative. For a composite upper limit, the chain rule is applied as well.',
        'If F is any antiderivative of f on [a, b], then ∫ₐᵇf(x)dx = F(b) − F(a). Choosing another antiderivative does not change the difference because the constant cancels. In an introductory course, continuity of f is a convenient sufficient condition for this formula.',
      ],
      terms: [
        { term: 'Accumulation function', definition: 'The function G(x) = ∫ₐˣf(t)dt with a variable upper limit.' },
        { term: 'First part of the Fundamental Theorem of Calculus', definition: 'The identity G′(x) = f(x) for continuous f.' },
        { term: 'Newton–Leibniz formula', definition: 'The identity ∫ₐᵇf(x)dx = F(b) − F(a), where F′ = f.' },
      ],
      example: {
        title: 'Change in an antiderivative',
        problem: 'Evaluate ∫₁⁴(2x + 1) dx.',
        steps: [
          'An antiderivative of the integrand is F(x) = x² + x.',
          'Substitute the limits: F(4) − F(1).',
          'This gives 20 − 2 = 18.',
        ],
        answer: '18.',
      },
      pitfall: 'A common mistake is to subtract endpoint values in the wrong order or to forget the derivative of a composite upper limit. Follow the order “upper minus lower” and apply the chain rule to the upper limit.',
      practice: {
        question: 'Find the derivative of G(x) = ∫₀ˣ²cos t dt.',
        answer: 'G′(x) = 2x cos(x²).',
      },
    },
  },
  38: {
    title: 'Basic properties of the definite integral',
    topics: [],
    guide: {
      summary: 'The definite integral is linear and additive over intervals, and it changes sign when the limits are interchanged. Pointwise order of integrands yields comparisons and estimates for their integrals.',
      keyIdea: 'Properties of the integral allow the interval and integrand to be transformed before direct evaluation.',
      formula: '\\int_a^b(\\alpha f+\\beta g)\\,dx=\\alpha\\int_a^b f\\,dx+\\beta\\int_a^b g\\,dx',
      question: 'How does a definite integral change when its upper and lower limits are interchanged?',
    },
    detail: {
      hook: 'Properties of the integral often reveal the answer, or a rigorous estimate, before an antiderivative is found. They turn evaluation into an analysis of the structure of the function and interval.',
      explanation: [
        'Linearity permits a sum to be integrated term by term and constant factors to be taken outside. Additivity over intervals gives ∫ₐᶜf = ∫ₐᵇf + ∫ᵦᶜf, while interchanging the limits changes the sign. With consistent orientation, these properties hold regardless of the position of the intermediate point relative to the endpoints.',
        'If f(x) ≤ g(x) on [a, b], where a < b, then ∫ₐᵇf ≤ ∫ₐᵇg. The bound m ≤ f(x) ≤ M implies m(b − a) ≤ ∫ₐᵇf ≤ M(b − a). The inequality |∫f| ≤ ∫|f| shows that cancellation between signs can only reduce the magnitude of the result.',
      ],
      terms: [
        { term: 'Linearity', definition: 'The property that integration preserves linear combinations of functions.' },
        { term: 'Additivity over intervals', definition: 'The ability to split an integral at an intermediate point and add the resulting integrals.' },
        { term: 'Monotonicity of the integral', definition: 'If f ≤ g on [a, b] with a < b, then ∫ₐᵇf ≤ ∫ₐᵇg; reversing the limits reverses the inequality.' },
        { term: 'Integral estimate', definition: 'Bounds on the value of an integral obtained from bounds on its integrand.' },
      ],
      example: {
        title: 'Symmetry and linearity',
        problem: 'Use properties of the integral to evaluate ∫₋₂²(3x³ + 4) dx.',
        steps: [
          'By linearity, split the integral into 3∫₋₂²x³dx and 4∫₋₂²dx.',
          'The integral of the odd function x³ over a symmetric interval is zero.',
          'The integral of the constant is 4 · (2 − (−2)) = 16.',
        ],
        answer: '16.',
      },
      pitfall: 'A common mistake is to assume that |∫f| always equals ∫|f|. In general only the inequality holds; equality requires that positive and negative contributions do not cancel.',
      practice: {
        question: 'Given ∫ₐᵇf(x)dx = 5 and ∫ᵦᶜf(x)dx = −2, what is ∫ₐᶜf(x)dx?',
        answer: 'By additivity, the integral is 5 + (−2) = 3.',
      },
    },
  },
  39: {
    title: 'Evaluating the definite integral',
    topics: [
      'The Newton–Leibniz formula',
      'Integration by substitution (change of variable)',
      'Integration by parts',
      'Integration of even and odd functions over symmetric limits',
    ],
    guide: {
      summary: 'When changing variables in a definite integral, compute the new limits immediately; when integrating by parts, include the boundary term. On a symmetric interval, parity may shorten the calculation or give zero at once.',
      keyIdea: 'In a definite integral, transform the integrand, differential, and limits simultaneously.',
      formula: '\\int_a^b f(x)\\,dx=\\int_\\alpha^\\beta f(\\varphi(t))\\varphi^{\\prime}(t)\\,dt,\\quad f\\in C([a,b]),\\ \\varphi\\in C^1([\\alpha,\\beta]),\\ \\varphi([\\alpha,\\beta])\\subseteq[a,b],\\ \\varphi(\\alpha)=a,\\ \\varphi(\\beta)=b',
      question: 'Why is it convenient to change the limits immediately after a substitution?',
    },
    detail: {
      hook: 'Definite integrals use the same transformations as indefinite integrals, but the limits become part of the calculation. Careful treatment of them often makes a solution shorter and more reliable.',
      explanation: [
        'Under the substitution x = φ(t), transform both limits together with the integrand and dx. Sufficient hypotheses are f ∈ C([a, b]), φ ∈ C¹([α, β]), φ([α, β]) ⊆ [a, b], φ(α) = a, and φ(β) = b; there is then no need to return to x. Less regular integrands require a separate substitution theorem.',
        'Integration by parts takes the form ∫ₐᵇu dv = [uv]ₐᵇ − ∫ₐᵇv du. On a symmetric interval, the integral of an odd function is zero, while the integral of an even function is twice the integral over half the interval. Before evaluating, check for symmetry and whether the region should be split.',
      ],
      terms: [
        { term: 'Change of limits', definition: 'Computing the values of the new variable corresponding to the original endpoints.' },
        { term: 'Boundary term', definition: 'The difference [uv]ₐᵇ = u(b)v(b) − u(a)v(a) in the integration-by-parts formula.' },
        { term: 'Even function', definition: 'A function satisfying f(−x) = f(x), whose integral over [−a, a] is twice its contribution over [0, a].' },
        { term: 'Odd function', definition: 'A function satisfying f(−x) = −f(x), whose integral over [−a, a] is zero.' },
      ],
      example: {
        title: 'Changing the variable and the limits',
        problem: 'Evaluate ∫₀¹2x exp(x²) dx.',
        steps: [
          'Let u = x²; then du = 2x dx.',
          'The old limits x = 0 and x = 1 correspond to the new limits u = 0 and u = 1.',
          'This gives ∫₀¹eᵘdu = e − 1.',
        ],
        answer: 'e − 1.',
      },
      pitfall: 'A common mistake is to change the variable but retain the old limits. Either change the limits immediately and do not return to x, or first find an antiderivative and return completely to x before substituting the endpoints.',
      practice: {
        question: 'Use parity to evaluate ∫₋₂²(x³ + 3x²) dx.',
        answer: 'The odd part vanishes, and 2∫₀²3x²dx = 16.',
      },
    },
  },
  40: {
    title: 'Improper integrals',
    topics: [
      'Integral over an infinite interval (an improper integral of the first kind)',
      'Integral of an unbounded function (an improper integral of the second kind)',
    ],
    guide: {
      summary: 'An improper integral is defined as a limit of proper integrals when an endpoint is infinite or the integrand is unbounded. It converges only when all improper parts have finite limits; cancellation of divergent parts instead concerns the principal value.',
      keyIdea: 'Every infinite endpoint and every singular point must be examined through a separate limiting process.',
      formula: '\\int_a^{\\infty}f(x)\\,dx=\\lim_{R\\to\\infty}\\int_a^R f(x)\\,dx',
      question: 'For which values of p does the integral of x⁻ᵖ from 1 to infinity converge?',
    },
    detail: {
      hook: 'An integral may extend over an infinite interval or pass near an infinite value of a function. A limit determines rigorously whether the accumulated contribution remains finite.',
      explanation: [
        'An improper integral of the first kind has an infinite endpoint and is defined as a limit of integrals over finite intervals. An improper integral of the second kind involves an unbounded function and requires a limit as one approaches a singular point. If a singular point lies inside the interval, the two sides are examined separately.',
        'An improper integral converges only if every required limit exists and is finite. Symmetric cancellation of two divergent parts may yield a principal value, but not ordinary convergence. Comparison tests often use standard power integrals as benchmarks.',
      ],
      terms: [
        { term: 'Improper integral of the first kind', definition: 'An integral over an unbounded interval, defined as the limit of integrals over bounded intervals.' },
        { term: 'Improper integral of the second kind', definition: 'An integral of an unbounded function, defined by a limit at a singular point.' },
        { term: 'Convergence', definition: 'The existence of a finite value for every limit in the definition of an improper integral.' },
        { term: 'Principal value', definition: 'A special symmetric limit that may exist even when the ordinary improper integral diverges.' },
      ],
      example: {
        title: 'An integral over an infinite ray',
        problem: 'Determine the convergence and value of ∫₁∞dx/x².',
        steps: [
          'Replace the infinite endpoint by R and consider ∫₁ᴿx⁻²dx.',
          'An antiderivative is −1/x, so the integral equals 1 − 1/R.',
          'As R → ∞, the expression tends to 1.',
        ],
        answer: 'The integral converges and equals 1.',
      },
      pitfall: 'A common mistake is to substitute the symbol ∞ into an antiderivative as though it were an ordinary number, or to cancel two divergent parts. First write the separate limits and only then study them.',
      practice: {
        question: 'Does ∫₀¹dx/√x converge, and what is its value?',
        answer: 'Yes. The right-hand limit of 2√x as x → 0 is finite; the integral equals 2.',
      },
    },
  },
  41: {
    title: 'Geometric and physical applications of the definite integral',
    topics: [
      'Schemes for applying the definite integral',
      'Computing areas of plane regions',
      'Computing the arc length of a plane curve',
      'Computing the volume of a solid',
      'Computing the area of a surface of revolution',
      'Mechanical applications of the definite integral',
    ],
    guide: {
      summary: 'Areas, volumes, arc lengths, and surface areas are obtained by summing suitable infinitesimal geometric elements. Mass, moments, and work follow the same principle, with density, a lever arm, or force included in the integral.',
      keyIdea: 'The main task in an application is to choose the accumulation element and limits correctly, not merely to evaluate an integral formally.',
      formula: 'L=\\int_a^b\\sqrt{1+\\bigl(f^{\\prime}(x)\\bigr)^2}\\,dx',
      question: 'How can one decide which variable is most convenient for partitioning a region when setting up an integral?',
    },
    detail: {
      hook: 'An integral can measure objects for which no ready-made formula exists: a curved arc, an irregular solid, or a distributed mass. Everything begins with choosing a small element that is easy to describe.',
      explanation: [
        'The area between graphs is the integral of the difference between the upper and lower boundaries, after splitting at their intersections. Volume is obtained by summing cross-sectional areas; for solids of revolution, disks, washers, or cylindrical shells are often used. For a sufficiently smooth graph y = f(x), the arc length is ∫√(1 + (f′(x))²)dx.',
        'The area of a surface of revolution includes both the circumference of a layer and its arc-length element. In mechanics, density is multiplied by an element of length, area, or volume; for a moment, a distance from the axis is included as well. Dimensional analysis provides a useful check that an integral has been set up correctly.',
      ],
      terms: [
        { term: 'Disk and washer method', definition: 'Computing a volume of revolution by integrating the areas of circular cross sections.' },
        { term: 'Arc length', definition: 'The limit of the lengths of inscribed polygonal lines, expressed for a graph by the integral of √(1 + (f′)²).' },
        { term: 'Moment', definition: 'An integral of density multiplied by an appropriate distance or power of distance.' },
        { term: 'Linear density', definition: 'Mass per unit length of a distributed object.' },
      ],
      example: {
        title: 'Volume of a solid of revolution',
        problem: 'The region under y = √x on [0, 4] is revolved about the x-axis. Find the volume.',
        steps: [
          'A cross section perpendicular to the x-axis is a disk of radius √x.',
          'The cross-sectional area is π(√x)² = πx.',
          'Integrate: V = π∫₀⁴x dx = π[x²/2]₀⁴.',
        ],
        answer: 'V = 8π.',
      },
      pitfall: 'A common mistake is to integrate a radius instead of a cross-sectional area, or to subtract washer radii instead of their squares. First write the geometric measure of one layer explicitly, then integrate it.',
      practice: {
        question: 'Find the arc length of y = (2/3)x^(3/2) on [0, 1].',
        answer: 'Since y′ = √x, the length is ∫₀¹√(1 + x)dx = (2/3)(2√2 − 1).',
      },
    },
  },
  42: {
    title: 'Numerical evaluation of the definite integral',
    topics: [
      'The rectangle rule',
      'The trapezoidal rule',
      'The parabolic (Simpson’s) rule',
    ],
    guide: {
      summary: 'Composite rectangle, trapezoidal, and Simpson’s rules replace an integral by a weighted sum of function values on a grid. The error decreases as the step is refined and is estimated from the smoothness of the function; Simpson’s rule is exact for polynomials of degree at most three.',
      keyIdea: 'Choose a numerical method according to the required accuracy, available smoothness of the function, and cost of evaluating it.',
      formula: '\\int_a^b f(x)\\,dx\\approx\\frac h3\\left[f_0+4\\sum_{j=1}^{n/2}f_{2j-1}+2\\sum_{j=1}^{n/2-1}f_{2j}+f_n\\right],\\quad n\\ \\text{even}',
      question: 'Why does the composite Simpson’s rule require an even number of equal subintervals?',
    },
    detail: {
      hook: 'When an antiderivative is unknown or the data are tabulated, an integral can still be computed to controlled accuracy. Numerical quadrature turns area into a weighted sum of measured values.',
      explanation: [
        'Composite rectangle and trapezoidal rules replace a graph by constant or linear pieces on a uniform grid. Simpson’s rule uses quadratic interpolation on every pair of subintervals and the weights 1, 4, 2, 4, …, 2, 4, 1. Consequently, its number of subintervals must be even.',
        'The error depends on the grid spacing and bounds on the relevant derivatives of the function. As the spacing decreases, the composite trapezoidal rule generally has order h², while Simpson’s rule has order h⁴ for a sufficiently smooth function. Comparing results on grids with spacing h and h/2 provides a practical indication that the answer is stabilizing.',
      ],
      terms: [
        { term: 'Quadrature rule', definition: 'An approximation of an integral by a weighted sum of values of the integrand.' },
        { term: 'Grid node', definition: 'A point at which the function is evaluated for a quadrature rule.' },
        { term: 'Grid spacing', definition: 'The distance h between adjacent nodes of a uniform partition.' },
        { term: 'Quadrature error', definition: 'The difference between the exact value of an integral and its numerical approximation.' },
      ],
      example: {
        title: 'Simpson’s rule integrates a cubic exactly',
        problem: 'Approximate ∫₀²x³dx using Simpson’s rule with two subintervals.',
        steps: [
          'The spacing h is 1, and the nodes are 0, 1, and 2.',
          'The function values at the nodes are 0, 1, and 8.',
          'The rule gives (h/3)(f₀ + 4f₁ + f₂) = (1/3)(0 + 4 + 8) = 4.',
        ],
        answer: 'The approximation is 4 and, in this case, equals the exact value.',
      },
      pitfall: 'A common mistake is to apply Simpson’s rule with an odd number of subintervals or to confuse the alternating weights. Check that n is even and list the weights for all nodes before substituting values.',
      practice: {
        question: 'Approximate ∫₀²x²dx by the composite trapezoidal rule with two subintervals.',
        answer: 'With h = 1, we obtain ((0 + 4)/2 + 1) · 1 = 3.',
      },
    },
  },
  43: {
    title: 'Functions of two variables',
    topics: [
      'Basic concepts',
      'Limit of a function',
      'Continuity of a function of two variables',
      'Properties of functions continuous on a bounded closed region',
    ],
    guide: {
      summary: 'A function of two variables assigns a number to each point of a region in the plane, and its graph is usually a surface in space. A limit must be the same along every approach to a point, and a continuous function on a compact region attains its minimum and maximum.',
      keyIdea: 'Agreement of limits along several selected paths does not prove that the full limit exists, but disagreement along any two paths disproves it.',
      formula: '\\lim_{(x,y)\\to(a,b)}f(x,y)=L',
      question: 'Why is checking a limit only along the coordinate axes insufficient?',
    },
    detail: {
      hook: 'When a quantity depends on two parameters at once, a point can be approached along infinitely many paths. This is why limits and continuity in the plane demand a stronger test than they do on a line.',
      explanation: [
        'A function of two variables is specified by a domain D ⊆ ℝ² and a rule z = f(x, y), and its graph lies in ℝ³. A limit L at a point means that f(x, y) approaches L under every way in which (x, y) tends to that point. Different limits along two paths immediately prove that the full limit does not exist.',
        'Continuity at a point requires the limit to exist and equal the value of the function. A continuous function on a bounded closed region is bounded, attains a minimum and a maximum, and takes every intermediate value along any connected path. Level curves f(x, y) = c reveal the geometry of a function without requiring its surface to be plotted.',
      ],
      terms: [
        { term: 'Domain', definition: 'The set of points (x, y) for which the function is defined.' },
        { term: 'Level curve', definition: 'The set of points in the plane at which f(x, y) has one fixed value.' },
        { term: 'Two-variable limit', definition: 'A common value approached by a function under every way of approaching a point in the plane.' },
        { term: 'Continuity', definition: 'Equality of the limit of a function at a point and its value at that point.' },
      ],
      example: {
        title: 'Two paths to the same point',
        problem: 'Investigate the limit of xy/(x² + y²) as (x, y) → (0, 0).',
        steps: [
          'Along the line y = x, the expression is x²/(2x²) = 1/2 for x ≠ 0.',
          'Along the line y = −x, the expression is −x²/(2x²) = −1/2.',
          'The limits along the two paths differ, so the full limit does not exist.',
        ],
        answer: 'The limit does not exist.',
      },
      pitfall: 'A common mistake is to check only the axes or a few lines and declare that the full limit exists. Agreement along selected paths is insufficient for a proof, whereas disagreement along just two paths is enough to disprove the limit.',
      practice: {
        question: 'Does the limit of (x² − y²)/(x² + y²) exist as (x, y) → (0, 0)?',
        answer: 'No: along y = 0 the value tends to 1, whereas along x = 0 it tends to −1.',
      },
    },
  },
  44: {
    title: 'Derivatives and differentials of multivariable functions',
    topics: [
      'First-order partial derivatives and their geometric meaning',
      'Higher-order partial derivatives',
      'Differentiability and the total differential of a function',
      'Using the total differential for approximate calculations',
      'Higher-order differentials',
      'Derivative of a composite function. Total derivative',
      'Invariance of the form of the total differential',
      'Differentiation of an implicitly defined function',
    ],
    guide: {
      summary: 'A partial derivative measures the change of a function with respect to one coordinate while the others are fixed, and the total differential gives the linear part of the total increment. The existence of partial derivatives at a point does not by itself guarantee differentiability, whereas differentiability provides a valid linear approximation and chain rule.',
      keyIdea: 'The total differential combines partial derivatives into the best linear model of a small change in the function.',
      formula: 'df=f_x\\,dx+f_y\\,dy',
      question: 'How does the existence of partial derivatives differ from differentiability at a point?',
    },
    detail: {
      hook: 'Partial derivatives show how sensitive a result is to each parameter separately. The total differential combines these effects into a single linear model of a small change.',
      explanation: [
        'When computing fₓ, hold y fixed; when computing fᵧ, hold x fixed. Second- and higher-order derivatives are obtained by repeated differentiation; with sufficient smoothness, the mixed derivatives fₓᵧ and fᵧₓ are equal. The mere existence of partial derivatives at a point, however, does not guarantee differentiability.',
        'Differentiability means that Δf = fₓΔx + fᵧΔy + o(√(Δx² + Δy²)). The linear part is called the total differential and is used for approximate calculations. A composition is handled by the multivariable chain rule, while the derivative of an implicit function is found by differentiating its defining equation, provided the required partial derivative is nonzero.',
      ],
      terms: [
        { term: 'Partial derivative', definition: 'A derivative with respect to one variable while the other variables are held fixed.' },
        { term: 'Differentiability', definition: 'The existence of a principal linear part of the increment with a remainder of higher order of smallness.' },
        { term: 'Total differential', definition: 'The linear form df = fₓdx + fᵧdy that approximates a small increment of the function.' },
        { term: 'Mixed derivative', definition: 'The result of successive differentiation with respect to different variables.' },
      ],
      example: {
        title: 'Linear approximation',
        problem: 'For f(x, y) = x²y + sin(xy), find df at (1, 0) and the linear part of the increment.',
        steps: [
          'Compute fₓ = 2xy + y cos(xy), so fₓ(1, 0) = 0.',
          'Compute fᵧ = x² + x cos(xy), so fᵧ(1, 0) = 2.',
          'Therefore df = 0 · dx + 2dy.',
          'For small h and k, f(1 + h, k) ≈ f(1, 0) + 2k = 2k.',
        ],
        answer: 'df|(1, 0) = 2dy, and the linear approximation to the increment is 2k.',
      },
      pitfall: 'A common mistake is to regard the existence of fₓ and fᵧ as sufficient proof of differentiability. Check continuity of the partial derivatives in a neighborhood as a convenient sufficient condition, or estimate the remainder of the linear approximation directly.',
      practice: {
        question: 'Find the total differential of z = ln(x² + y²) at (1, 1).',
        answer: 'Since zₓ = 2x/(x² + y²) and zᵧ = 2y/(x² + y²), at (1, 1) we obtain dz = dx + dy.',
      },
    },
  },
  45: {
    title: 'Tangent plane and normal line to a surface',
    topics: [],
    guide: {
      summary: 'For a regular level surface F(x, y, z) = 0, the nonzero gradient at a point is normal to the surface. The tangent plane passes through that point and is perpendicular to the gradient.',
      keyIdea: 'The gradient of an implicitly defined surface provides both a normal vector and the coefficients of the tangent-plane equation.',
      formula: '\\nabla F(\\mathbf r_0)\\cdot(\\mathbf r-\\mathbf r_0)=0',
      question: 'Why is the nonzero-gradient condition important for uniquely specifying a tangent plane?',
    },
    detail: {
      hook: 'Near a regular point, a smooth surface is almost indistinguishable from a plane. The gradient provides both this plane and its normal in a single calculation.',
      explanation: [
        'For the level surface F(x, y, z) = 0, the gradient ∇F at a regular point is perpendicular to every tangent direction. If ∇F is nonzero, the tangent plane is defined by ∇F(r₀) · (r − r₀) = 0. The normal line passes through r₀ in the direction ∇F(r₀).',
        'For a graph z = f(x, y), take F(x, y, z) = f(x, y) − z, so a normal has direction (fₓ, fᵧ, −1). The tangent plane is also the graph of the linear approximation to the function. If the gradient of the defining function is zero, the standard formula does not determine a unique plane and the point must be examined separately.',
      ],
      terms: [
        { term: 'Regular point of a surface', definition: 'A point of a level surface at which the gradient of the defining function is nonzero.' },
        { term: 'Tangent plane', definition: 'A plane containing the tangent directions of all smooth curves on the surface through the given point.' },
        { term: 'Normal', definition: 'A line or direction vector perpendicular to the tangent plane.' },
        { term: 'Gradient', definition: 'The vector of partial derivatives, directed normally to a regular level surface.' },
      ],
      example: {
        title: 'Tangent plane to a sphere',
        problem: 'Find the tangent plane and normal line to the sphere x² + y² + z² = 9 at (1, 2, 2).',
        steps: [
          'Let F = x² + y² + z² − 9; then ∇F(1, 2, 2) = (2, 4, 4).',
          'The tangent plane is 2(x − 1) + 4(y − 2) + 4(z − 2) = 0.',
          'After simplification, x + 2y + 2z = 9, and the normal line is parameterized by (x, y, z) = (1, 2, 2) + t(2, 4, 4).',
        ],
        answer: 'The plane is x + 2y + 2z = 9; the normal is (1, 2, 2) + t(2, 4, 4).',
      },
      pitfall: 'A common mistake is to use the vector (fₓ, fᵧ, 1) for the graph z = f(x, y). First move everything to one side: for F = f − z, the correct normal is (fₓ, fᵧ, −1).',
      practice: {
        question: 'Find the tangent plane to z = x² + y² at (1, −1, 2).',
        answer: 'The plane is z − 2 = 2(x − 1) − 2(y + 1), or 2x − 2y − z − 2 = 0.',
      },
    },
  },
  46: {
    title: 'Extrema of a function of two variables',
    topics: [
      'Basic concepts',
      'Necessary and sufficient conditions for an extremum',
      'Maximum and minimum values of a function on a closed region',
    ],
    guide: {
      summary: 'At an interior local extremum of a differentiable function, the gradient is zero, but this condition is not sufficient. The sign of the Hessian determinant classifies a nondegenerate stationary point, while global extrema on a compact region also require the boundary to be examined.',
      keyIdea: 'Stationary points provide candidates; curvature and the boundary determine their type and whether an extremum is global.',
      formula: 'D=f_{xx}f_{yy}-f_{xy}^2',
      question: 'What can be concluded about a stationary point when D = 0?',
    },
    detail: {
      hook: 'A surface may have peaks, depressions, and saddles that cannot be seen in a single cross section. The gradient and the matrix of second derivatives provide a systematic way to distinguish these shapes.',
      explanation: [
        'At an interior local extremum of a differentiable function, a necessary condition is fₓ = fᵧ = 0. Such stationary points are only candidates. For a twice-differentiable function, the determinant D = fₓₓfᵧᵧ − fₓᵧ² classifies a nondegenerate stationary point.',
        'When D > 0, the sign of fₓₓ distinguishes a minimum from a maximum; when D < 0, the point is a saddle. The case D = 0 is inconclusive and requires another analysis. To find absolute extrema on a compact region, compare values at interior candidates, along every part of the boundary, and at corner points.',
      ],
      terms: [
        { term: 'Stationary point', definition: 'An interior point at which all first partial derivatives are zero.' },
        { term: 'Hessian matrix', definition: 'The matrix of second partial derivatives, symmetric under sufficient smoothness.' },
        { term: 'Saddle point', definition: 'A stationary point near which the function takes values both greater and less than its value at the point.' },
        { term: 'Absolute extremum', definition: 'The greatest or least value of a function on the entire specified region.' },
      ],
      example: {
        title: 'A quadratic bowl',
        problem: 'Investigate the extrema of f(x, y) = x² + y² − 2x + 4y.',
        steps: [
          'Solve fₓ = 2x − 2 = 0 and fᵧ = 2y + 4 = 0 to obtain the point (1, −2).',
          'We have fₓₓ = 2, fᵧᵧ = 2, fₓᵧ = 0, and D = 4 > 0.',
          'Since fₓₓ > 0, the point is a minimum.',
          'The representation f = (x − 1)² + (y + 2)² − 5 shows that the minimum is global.',
        ],
        answer: 'The global minimum is −5 at (1, −2); there is no maximum on ℝ².',
      },
      pitfall: 'A common mistake is to declare every stationary point an extremum or to draw a conclusion when D = 0. Apply a sufficient test, and for a closed region examine the entire boundary as well.',
      practice: {
        question: 'What type of stationary point is (0, 0) for f(x, y) = x² − y²?',
        answer: 'D = 2 · (−2) − 0 = −4 < 0, so it is a saddle point.',
      },
    },
  },
  47: {
    title: 'General information about differential equations',
    topics: [
      'Basic concepts',
      'Problems that lead to differential equations',
    ],
    guide: {
      summary: 'A differential equation relates an unknown function, an independent variable, and derivatives of the function; its order is the order of the highest derivative present. For a regular nth-order equation, the general solution usually contains n arbitrary constants determined by initial or boundary conditions.',
      keyIdea: 'To solve a differential equation is to find all sufficiently smooth functions that satisfy both the equation and the prescribed supplementary conditions.',
      formula: 'F\\bigl(x,y,y^{\\prime},\\ldots,y^{(n)}\\bigr)=0',
      question: 'How does the general solution of a differential equation differ from the solution of an initial-value problem?',
    },
    detail: {
      hook: 'A differential equation describes a law of change without requiring the trajectory itself to be known in advance. Models of growth, motion, cooling, and electrical circuits are formulated in this way.',
      explanation: [
        'An ordinary differential equation relates an independent variable, an unknown function, and its derivatives. Its order is the order of the highest derivative present. It is linear if it can be written as aₙ(x)y⁽ⁿ⁾ + … + a₁(x)y′ + a₀(x)y = g(x), where the coefficients depend only on the independent variable. A solution is a sufficiently smooth function that turns the equation into an identity on an interval.',
        'The general solution of a regular nth-order equation usually contains n arbitrary constants. Initial conditions prescribed at one point form an initial-value problem and, under suitable assumptions, select a unique solution. Boundary conditions are prescribed at different points and may lead to no solution, a unique solution, or multiple solutions.',
      ],
      terms: [
        { term: 'Ordinary differential equation', definition: 'An equation for a function of one independent variable and its derivatives.' },
        { term: 'Order of an equation', definition: 'The highest order of a derivative present in the equation.' },
        { term: 'General solution', definition: 'A family of solutions containing the required number of arbitrary constants.' },
        { term: 'Initial-value problem', definition: 'A differential equation together with initial values of the function and the required derivatives at a single point.' },
      ],
      example: {
        title: 'An initial condition selects a curve',
        problem: 'Solve y′ = 2y subject to y(0) = 3.',
        steps: [
          'The general solution of the equation is y = C exp(2x).',
          'Substitute x = 0 and y = 3 to obtain C = 3.',
          'A check gives y′ = 6 exp(2x) = 2y.',
        ],
        answer: 'y = 3 exp(2x).',
      },
      pitfall: 'A common mistake is to find a family of solutions without checking for solutions lost during division, or to leave some initial conditions unused. Substitute the final function into the original equation and apply every condition separately.',
      practice: {
        question: 'Solve y′ = −y subject to y(0) = 2.',
        answer: 'The general solution is y = Ce⁻ˣ, and the initial condition gives y = 2e⁻ˣ.',
      },
    },
  },
  48: {
    title: 'First-order differential equations',
    topics: [
      'Basic concepts',
      'Separable differential equations',
      'Homogeneous differential equations',
      'Linear equations. The Bernoulli equation',
      'Exact differential equations. Integrating factors',
      'Lagrange and Clairaut equations',
    ],
    guide: {
      summary: 'First-order equations are classified by structure: separable equations place the variables on opposite sides, while linear equations are solved with an integrating factor. Homogeneous equations reduce through a ratio substitution, exact equations are recovered from a total differential, and the Bernoulli, Clairaut, and Lagrange forms have their own substitutions.',
      keyIdea: 'Correctly identifying the class of an equation almost always determines the subsequent solution algorithm.',
      formula: '(\\mu y)^{\\prime}=\\mu q,\\quad \\mu=e^{\\int p(x)\\,dx}\\quad \\text{for }y^{\\prime}+py=q',
      question: 'How can one check whether M(x, y)dx + N(x, y)dy = 0 is exact?',
    },
    detail: {
      hook: 'First-order equations take many forms, but a handful of recognizable structures cover most introductory problems. Classifying an equation before calculating saves more time than trying substitutions at random.',
      explanation: [
        'In a separable equation, expressions involving y and x are moved to opposite sides, with care taken not to lose solutions through division. A homogeneous equation y′ = F(y/x) is reduced by y = ux, while a linear equation y′ + p(x)y = q(x) is multiplied by the integrating factor exp(∫p(x) dx). A power substitution turns the Bernoulli equation into a linear one.',
        'If M, N ∈ C¹(D) on an open simply connected domain D, then the differential form M dx + N dy = 0 is exact if and only if Mᵧ = Nₓ, and a potential function can then be recovered. The Clairaut equation y = xy′ + ψ(y′) contains a family of straight lines and sometimes a singular solution. After obtaining an answer, check its domain and substitute it into the original equation.',
      ],
      terms: [
        { term: 'Separable variables', definition: 'A structure reducible to the form dy/h(y) = g(x)dx.' },
        { term: 'First-order linear equation', definition: 'An equation of the form y′ + p(x)y = q(x).' },
        { term: 'Integrating factor', definition: 'A function by which an equation is multiplied so that its left-hand side becomes a total derivative.' },
        { term: 'Exact equation', definition: 'An equation M dx + N dy = 0 whose left-hand side is the total differential of some function.' },
      ],
      example: {
        title: 'A linear equation with an initial condition',
        problem: 'Solve y′ + y = eˣ, y(0) = 0.',
        steps: [
          'The integrating factor is μ = eˣ.',
          'After multiplication, (eˣy)′ = e²ˣ.',
          'Integration gives y = (1/2)eˣ + Ce⁻ˣ.',
          'The condition y(0) = 0 implies C = −1/2.',
        ],
        answer: 'y = (eˣ − e⁻ˣ)/2.',
      },
      pitfall: 'A common mistake is to divide an equation by h(y) and lose constant solutions for which h(y) = 0. Before dividing, find and check all zeros of this expression separately.',
      practice: {
        question: 'Solve y′ = xy subject to y(0) = 2.',
        answer: 'Separation gives ln|y| = x²/2 + C, so the condition yields y = 2 exp(x²/2).',
      },
    },
  },
  49: {
    title: 'Higher-order differential equations',
    topics: [
      'Basic concepts',
      'Equations that admit reduction of order',
      'Higher-order linear differential equations',
      'Second-order homogeneous linear differential equations',
      'Nth-order homogeneous linear differential equations',
    ],
    guide: {
      summary: 'A higher-order equation may admit a reduction of order through a substitution if the function itself or the independent variable is absent. Solutions of a homogeneous linear equation form a vector space, and the general solution of a nonhomogeneous equation is the sum of the general homogeneous solution and one particular solution.',
      keyIdea: 'The order of an equation determines the expected number of independent initial data and the dimension of the solution space of the homogeneous linear problem.',
      formula: 'a_n(x)y^{(n)}+a_{n-1}(x)y^{(n-1)}+\\cdots+a_0(x)y=f(x)',
      question: 'Which substitution reduces the order when the equation does not explicitly contain the function y?',
    },
    detail: {
      hook: 'A higher order means that a system can have more independent modes, but the structure of the equation often reduces its complexity. Each reduction of order treats an unknown derivative as a new function.',
      explanation: [
        'If an equation does not contain y explicitly, the substitution p = y′ lowers the order by one. If x is absent, treat the derivative as p(y) and use y″ = p dp/dy. After solving the reduced equation, integrate back and restore every constant.',
        'An nth-order linear equation has the form aₙ(x)y⁽ⁿ⁾ + … + a₀(x)y = f(x), with aₙ ≠ 0. Under standard assumptions, the solutions of the homogeneous equation form an n-dimensional space, and a nonzero Wronskian confirms independence of a fundamental set. A nonhomogeneous solution is the sum of the general homogeneous solution and one particular solution.',
      ],
      terms: [
        { term: 'Reduction of order', definition: 'A substitution that transforms an equation into one of lower order for a new unknown function.' },
        { term: 'Nth-order linear equation', definition: 'An equation linear in y and its derivatives through order n.' },
        { term: 'Fundamental set of solutions', definition: 'A set of n linearly independent solutions of an nth-order homogeneous linear equation.' },
        { term: 'Wronskian', definition: 'The determinant formed from the functions in a fundamental set and their successive derivatives.' },
      ],
      example: {
        title: 'Two integrations',
        problem: 'Solve y″ = 6x subject to y(0) = 1 and y′(0) = 2.',
        steps: [
          'Integrate once: y′ = 3x² + C₁.',
          'From y′(0) = 2, obtain C₁ = 2.',
          'Integrate again: y = x³ + 2x + C₂.',
          'From y(0) = 1, obtain C₂ = 1.',
        ],
        answer: 'y = x³ + 2x + 1.',
      },
      pitfall: 'A common mistake is to lose a constant during successive integrations or fail to recover the original function after a substitution. The number of independent constants in the general solution should match the order of a regular equation.',
      practice: {
        question: 'Find the general solution of y‴ = 0.',
        answer: 'After three integrations, y = C₀ + C₁x + C₂x²/2.',
      },
    },
  },
  50: {
    title: 'Solving second-order differential equations with constant coefficients',
    topics: [
      'Solving second-order homogeneous linear differential equations with constant coefficients',
      'Solving nth-order homogeneous linear differential equations with constant coefficients',
    ],
    guide: {
      summary: 'For a homogeneous linear equation with constant coefficients, an exponential substitution reduces the problem to a characteristic polynomial. Simple real roots yield exponentials, a root of multiplicity m introduces factors through xᵐ⁻¹, and a complex-conjugate pair yields real sine and cosine combinations.',
      keyIdea: 'The fundamental set of solutions is determined completely by the roots of the characteristic polynomial and their multiplicities.',
      formula: 'a_n\\lambda^n+a_{n-1}\\lambda^{n-1}+\\cdots+a_1\\lambda+a_0=0',
      question: 'Which m linearly independent solutions correspond to a real root λ of multiplicity m?',
    },
    detail: {
      hook: 'Constant coefficients turn a differential equation into an algebraic problem about polynomial roots. Those roots immediately reveal the growth, decay, and oscillation of solutions.',
      explanation: [
        'For a homogeneous equation, the substitution y = exp(λx) produces the characteristic polynomial. A simple real root λ corresponds to exp(λx), while a root of multiplicity m corresponds to exp(λx), x exp(λx), …, xᵐ⁻¹ exp(λx). These functions form the required part of a fundamental set.',
        'Complex-conjugate roots α ± iβ give the real solutions exp(αx) cos(βx) and exp(αx) sin(βx). As x → +∞, a positive real part causes growth and a negative one causes decay, while the imaginary part determines the oscillation frequency; as x → −∞, the growth behavior reverses. Arbitrary constants are determined by initial or boundary conditions.',
      ],
      terms: [
        { term: 'Characteristic polynomial', definition: 'The polynomial obtained by substituting y = exp(λx) into a homogeneous linear equation with constant coefficients.' },
        { term: 'Multiplicity of a root', definition: 'The number of times a root occurs in the factorization of the characteristic polynomial.' },
        { term: 'Complex-conjugate pair', definition: 'The roots α + iβ and α − iβ, which together generate two real oscillatory solutions.' },
        { term: 'Fundamental set', definition: 'A maximal set of linearly independent solutions of a homogeneous equation.' },
      ],
      example: {
        title: 'Two distinct roots',
        problem: 'Solve y″ − 3y′ + 2y = 0.',
        steps: [
          'The characteristic equation is λ² − 3λ + 2 = 0.',
          'Factoring gives (λ − 1)(λ − 2) = 0, so the roots are 1 and 2.',
          'Each simple root contributes its own exponential.',
        ],
        answer: 'y = C₁eˣ + C₂ exp(2x).',
      },
      pitfall: 'A common mistake is to write the same exponential repeatedly for a multiple root, producing dependent solutions. For multiplicity m, multiply the exponential by 1, x, …, xᵐ⁻¹.',
      practice: {
        question: 'Find the general solution of y″ − 2y′ + y = 0.',
        answer: 'The characteristic root λ = 1 has multiplicity 2, so y = (C₁ + C₂x)eˣ.',
      },
    },
  },
  51: {
    title: 'Linear nonhomogeneous differential equations',
    topics: [
      'Structure of the general solution of a second-order linear nonhomogeneous differential equation',
      'Variation of parameters',
      'Solving second-order linear nonhomogeneous differential equations with constant coefficients and a right-hand side of special form',
      'Solving nth-order linear nonhomogeneous differential equations (n > 2) with constant coefficients and a right-hand side of special form',
    ],
    guide: {
      summary: 'The general solution of a linear nonhomogeneous equation is the sum of the general solution of the corresponding homogeneous equation and one particular solution. Variation of parameters constructs a particular solution from a fundamental set, while for constant-coefficient equations the method of undetermined coefficients applies to special right-hand sides and must account for resonance.',
      keyIdea: 'Linearity separates the natural modes of the homogeneous system from the forced response to the right-hand side.',
      formula: 'y=y_h+y_p',
      question: 'How does resonance change the trial form of a particular solution in the method of undetermined coefficients?',
    },
    detail: {
      hook: 'A nonhomogeneous right-hand side represents an external input to a system. Linearity allows the system’s natural motion to be separated from its forced response.',
      explanation: [
        'If L is a linear differential operator, the general solution of L[y] = f has the form y = yₕ + yₚ. Here yₕ is the general solution of L[y] = 0, and yₚ is any one particular solution of the original equation. The difference between any two particular solutions belongs to the homogeneous solution space.',
        'Variation of parameters seeks yₚ as a combination of fundamental solutions with variable coefficients and applies to general right-hand sides. For constant-coefficient linear equations whose right-hand sides are finite sums of Pₘ(x)e^(αx)cos(βx) and Pₘ(x)e^(αx)sin(βx), the method of undetermined coefficients is convenient. If the trial form overlaps the homogeneous solution, multiply it by a sufficient power of x to remove the resonance.',
      ],
      terms: [
        { term: 'Particular solution', definition: 'One specific solution of a nonhomogeneous differential equation.' },
        { term: 'Variation of parameters', definition: 'A method that replaces the constants in a linear combination of fundamental solutions by unknown functions.' },
        { term: 'Method of undetermined coefficients', definition: 'A method that assumes a particular solution of a prescribed form for a constant-coefficient linear equation with a special right-hand side.' },
        { term: 'Resonance', definition: 'An overlap between the trial form of the forced solution and part of the solution of the homogeneous equation.' },
      ],
      example: {
        title: 'Resonance with an exponential',
        problem: 'Solve y″ − y = eˣ.',
        steps: [
          'The homogeneous equation has roots 1 and −1, so yₕ = C₁eˣ + C₂e⁻ˣ.',
          'The usual trial Aeˣ overlaps yₕ, so take yₚ = Axeˣ.',
          'Substitution gives yₚ″ − yₚ = 2Aeˣ.',
          'From 2A = 1, obtain A = 1/2.',
        ],
        answer: 'y = C₁eˣ + C₂e⁻ˣ + (x/2)eˣ.',
      },
      pitfall: 'A common mistake is to choose a trial particular solution already contained in the homogeneous family and obtain inconsistent equations for the coefficients. Compare the trial form with the roots of the characteristic polynomial and, in resonance, multiply it by the required power of x.',
      practice: {
        question: 'Find the general solution of y″ + y = 2.',
        answer: 'The homogeneous part is C₁ cos x + C₂ sin x, and one may take yₚ = 2, so y = C₁ cos x + C₂ sin x + 2.',
      },
    },
  },
  52: {
    title: 'Systems of differential equations',
    topics: [
      'Basic concepts',
      'Solving normal systems',
      'Systems of linear differential equations with constant coefficients',
    ],
    guide: {
      summary: 'A first-order normal system gives the derivative of the vector of unknowns as a function of the independent variable and the vector itself. For a homogeneous linear system with a constant matrix, the solution is expressed by a matrix exponential, while eigenvalues and Jordan structure determine its modes.',
      keyIdea: 'A system of scalar equations becomes one vector problem to which methods of linear algebra can be applied.',
      formula: '\\mathbf y(x)=e^{A(x-x_0)}\\mathbf y_0',
      question: 'How do the eigenvalues of A affect the growth, decay, and oscillation of solutions of the system?',
    },
    detail: {
      hook: 'Several interconnected quantities naturally evolve as a single state vector. Matrix notation reveals the common modes of the system and connects differential equations with linear algebra.',
      explanation: [
        'A normal system has the form y′ = F(x, y), where y is a vector of unknown functions. Under standard continuity and local Lipschitz conditions in y, an initial vector determines a locally unique solution. A higher-order equation can be converted into a normal first-order system by introducing derivatives as new variables.',
        'For the homogeneous linear system y′ = Ay with a constant matrix, the solution is exp(A(x − x₀))y₀. Eigenvalues and eigenvectors provide independent modes; if there are too few eigenvectors, generalized eigenvectors or the matrix exponential itself are used. A nonhomogeneous system adds an integral representing the forced input.',
      ],
      terms: [
        { term: 'Normal system', definition: 'A first-order system solved explicitly for the derivatives of all unknown functions.' },
        { term: 'State vector', definition: 'A vector that combines all unknown quantities of the system at a given time.' },
        { term: 'Matrix exponential', definition: 'The matrix exp(At), defined by a convergent power series and serving as a fundamental matrix for y′ = Ay.' },
        { term: 'Phase trajectory', definition: 'The curve traced by the state vector in the space of variables.' },
      ],
      example: {
        title: 'A coupled system',
        problem: 'Solve u′ = v, v′ = u subject to u(0) = 1 and v(0) = 0.',
        steps: [
          'Differentiate the first equation and use the second: u″ = u.',
          'The conditions for u are u(0) = 1 and u′(0) = v(0) = 0.',
          'Hence u = cosh t.',
          'From the first equation, v = u′ = sinh t.',
        ],
        answer: 'u(t) = cosh t, v(t) = sinh t.',
      },
      pitfall: 'A common mistake is to diagonalize a matrix without checking that it has a complete set of eigenvectors. If the matrix is defective, use Jordan chains or compute the matrix exponential by another method.',
      practice: {
        question: 'Solve u′ = 2u, v′ = −v subject to u(0) = 1 and v(0) = 3.',
        answer: 'u(t) = exp(2t), v(t) = 3 exp(−t).',
      },
    },
  },
  53: {
    title: 'The double integral',
    topics: [
      'Basic concepts and definitions',
      'Geometric and physical meaning of the double integral',
      'Basic properties of the double integral',
      'Evaluating the double integral in Cartesian coordinates',
      'Evaluating the double integral in polar coordinates',
      'Applications of the double integral',
    ],
    guide: {
      summary: 'A double integral is the limit of sums over small area elements and computes the volume under a nonnegative surface, the area of a region, or the mass of a lamina with a given density. A continuous function on a regular region can be integrated iteratively, and conversion to polar coordinates requires the Jacobian factor r.',
      keyIdea: 'The geometry of the region determines the order of integration and the most convenient coordinate system.',
      formula: '\\iint_D f(x,y)\\,dA=\\iint_{D^{\\prime}}f(r\\cos\\theta,r\\sin\\theta)\\,r\\,dr\\,d\\theta',
      question: 'Where does the factor r come from when converting to polar coordinates?',
    },
    detail: {
      hook: 'A double integral sums contributions over an entire region rather than only along a line. It measures volume under a surface, the mass of a lamina, and average values of two-dimensional distributions.',
      explanation: [
        'A double integral is defined as the limit of sums f(ξᵢ, ηᵢ)ΔAᵢ over increasingly fine area elements. For a continuous function on a simple region, it is evaluated as an iterated integral, with the inner limits carefully described in terms of the outer variable. The order of integration may be changed provided the same region is described correctly anew.',
        'Under the change to polar coordinates x = r cos θ and y = r sin θ, the area element becomes dA = r dr dθ. The factor r is the absolute value of the Jacobian and reflects the widening of an angular sector as the radius grows. Symmetric disks and annuli are usually easier to integrate in polar coordinates.',
      ],
      terms: [
        { term: 'Double integral', definition: 'The limit of integral sums over a two-dimensional region.' },
        { term: 'Iterated integral', definition: 'The successive evaluation of two one-dimensional integrals with compatible limits.' },
        { term: 'Jacobian', definition: 'The determinant of the derivative matrix of a coordinate transformation, describing the local change in area.' },
        { term: 'Polar coordinates', definition: 'The coordinates r and θ related to Cartesian coordinates by x = r cos θ and y = r sin θ.' },
      ],
      example: {
        title: 'Integral over the unit square',
        problem: 'Evaluate ∬D(x + y)dA for D = [0, 1] × [0, 1].',
        steps: [
          'Write the iterated integral ∫₀¹∫₀¹(x + y)dxdy.',
          'The inner integral with respect to x is 1/2 + y.',
          'The outer integral ∫₀¹(1/2 + y)dy equals 1.',
        ],
        answer: '1.',
      },
      pitfall: 'A common mistake is to change the order of integration by mechanically interchanging differentials while retaining the old limits, or to omit the factor r in polar coordinates. Describe the region anew in the chosen order and always multiply by the absolute value of the Jacobian.',
      practice: {
        question: 'Evaluate ∬D(x² + y²)dA over the unit disk D.',
        answer: 'In polar coordinates, this is ∫₀²π∫₀¹r² · r drdθ = π/2.',
      },
    },
  },
  54: {
    title: 'The triple integral',
    topics: [
      'Basic concepts',
      'Evaluating the triple integral in Cartesian coordinates',
      'Change of variables in a triple integral. Evaluation in cylindrical and spherical coordinates',
      'Selected applications of the triple integral',
    ],
    guide: {
      summary: 'A triple integral sums a quantity throughout a volume and is used to compute the volume of a solid, its mass, and spatial moments. Iterated integration requires an exact description of the boundaries, while cylindrical and spherical coordinates introduce their respective Jacobians.',
      keyIdea: 'A successful coordinate system aligns the symmetry of a solid with simple limits of integration.',
      formula: 'dV=\\rho^2\\sin\\varphi\\,d\\rho\\,d\\varphi\\,d\\theta',
      question: 'Why does the volume element in spherical coordinates contain the factor ρ² sin φ?',
    },
    detail: {
      hook: 'A triple integral accumulates a quantity throughout a three-dimensional solid. Choosing coordinates that match the symmetry turns complicated boundaries of a sphere or cylinder into constant limits.',
      explanation: [
        'A triple integral is defined as the limit of sums over small volume elements and is evaluated as an iterated integral in three variables. With density ρ(x, y, z), it gives mass; with integrand 1, it gives the volume of the solid. Choose the order of integration so that projections and boundaries are described as simply as possible.',
        'In cylindrical coordinates, dV = r dr dθ dz. In spherical coordinates with polar angle φ, dV = ρ² sin φ dρ dφ dθ. These factors are Jacobians, so omitting them changes not only the scale but the result itself.',
      ],
      terms: [
        { term: 'Triple integral', definition: 'The limit of integral sums over a three-dimensional solid.' },
        { term: 'Cylindrical coordinates', definition: 'The coordinates r, θ, z with x = r cos θ and y = r sin θ.' },
        { term: 'Spherical coordinates', definition: 'The coordinates ρ, φ, θ specifying the distance from the origin and two direction angles.' },
        { term: 'Volume Jacobian', definition: 'The absolute value of the derivative determinant of a spatial coordinate transformation, which transforms the volume element.' },
      ],
      example: {
        title: 'Volume of the unit ball',
        problem: 'Compute the volume of the unit ball using a spherical triple integral.',
        steps: [
          'The limits are 0 ≤ ρ ≤ 1, 0 ≤ φ ≤ π, and 0 ≤ θ ≤ 2π.',
          'Write ∫₀²π∫₀π∫₀¹ρ² sin φ dρdφdθ.',
          'The three factors are 1/3, 2, and 2π, respectively.',
          'Multiply the results.',
        ],
        answer: 'V = 4π/3.',
      },
      pitfall: 'A common mistake is to confuse the angle conventions for φ and θ or to omit the factor ρ² sin φ. Before integrating, write the conversion formulas to Cartesian coordinates and compute or verify the Jacobian.',
      practice: {
        question: 'Find the mass of the uniform cylinder r ≤ 2, 0 ≤ z ≤ 3 with density 1.',
        answer: 'In cylindrical coordinates, the mass is ∫₀²π∫₀²∫₀³r dzdrdθ = 12π.',
      },
    },
  },
};
