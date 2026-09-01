import type { EnglishSectionBundle } from './types';

export const englishSections3: Record<number, EnglishSectionBundle> = {
  55: {
    title: 'Line Integral of the First Kind',
    topics: [
      'Fundamental concepts',
      'Evaluation of line integrals of the first kind',
      'Some applications of line integrals of the first kind',
    ],
    guide: {
      summary:
        'A line integral of the first kind sums the values of a scalar function along a curve, weighted by the arc-length element. It does not depend on the orientation of the curve and, after parametrization, is evaluated using the norm of the derivative of the position vector.',
      keyIdea:
        'After parametrization, a spatial problem reduces to an ordinary definite integral with respect to the parameter.',
      formula:
        "\\int_L f\\,ds=\\int_a^b f(\\mathbf r(t))\\lVert\\mathbf r'(t)\\rVert\\,dt",
      question:
        'Why does the value of a line integral of the first kind remain unchanged when the orientation of the curve is reversed?',
    },
    detail: {
      hook:
        'The mass of a thin wire depends not only on its shape but also on the density at each point. A line integral of the first kind turns such a distribution along a curve into a single number.',
      explanation: [
        'A line integral of the first kind is defined as the limit of sums f(Mₖ)Δsₖ over small arcs of the curve. The length element ds is nonnegative, so the value of the integral does not change when the orientation of the path is reversed.',
        'For a regular parametrization r(t), a ≤ t ≤ b, the formula ∫ₗ f ds = ∫ₐᵇ f(r(t))|r′(t)|dt is used. When f = 1, it gives the length of the curve; when f is the linear density, it gives the mass of the wire.',
      ],
      terms: [
        {
          term: 'Regular curve',
          definition:
            'A parametrized C¹ curve for which r′(t) ≠ 0 at every point of the parameter interval.',
        },
        {
          term: 'Arc-length element',
          definition:
            'The quantity ds = |r′(t)|dt, which accounts for the speed at which the parametrized curve is traversed.',
        },
        {
          term: 'Line integral of the first kind',
          definition:
            'The integral of a scalar function with respect to arc length, independent of the orientation of the curve.',
        },
      ],
      example: {
        title: 'Integral over a quarter-circle',
        problem:
          'Evaluate ∫ₗ(x + y)ds along the unit circle in the first quadrant.',
        steps: [
          'Parametrize the arc as r(t) = (cos t, sin t), where 0 ≤ t ≤ π/2.',
          'The speed is |r′(t)| = 1, so ds = dt.',
          'The integral is ∫₀^{π/2}(cos t + sin t)dt = 2.',
        ],
        answer: 'The value of the integral is 2.',
      },
      pitfall:
        'A common mistake is to replace ds with dt and forget the factor |r′(t)|. Before substituting, always compute the speed of the chosen parametrization separately.',
      practice: {
        question:
          'What is ∫ₗ 1 ds along the line segment from (0, 0) to (3, 4)?',
        answer: 'It equals the length of the segment, namely 5.',
      },
    },
  },
  56: {
    title: 'Line Integral of the Second Kind',
    topics: [
      'Fundamental concepts',
      'Evaluation of line integrals of the second kind',
      'The Ostrogradsky–Green formula',
      'Conditions for path independence of a line integral of the second kind',
      'Some applications of line integrals of the second kind',
    ],
    guide: {
      summary:
        'A line integral of the second kind integrates the tangential component of a vector field along an oriented curve. It represents the work done by the field, changes sign when the orientation is reversed, and, for a conservative field, depends only on the endpoints of the path.',
      keyIdea:
        'An integral of the second kind is an oriented integral of the scalar product of the field and the displacement element.',
      formula:
        "\\int_L\\mathbf F\\cdot d\\mathbf r=\\int_a^b\\mathbf F(\\mathbf r(t))\\cdot\\mathbf r'(t)\\,dt",
      question:
        'Under what conditions is a line integral of the second kind independent of the path between two points?',
    },
    detail: {
      hook:
        'The work done by a force depends on both the path followed and the direction of motion. A line integral of the second kind accounts for both features exactly.',
      explanation: [
        'For a vector field F = (P, Q, R), an integral of the second kind is written as ∫ₗ F·dr = ∫ₗ Pdx + Qdy + Rdz. Unlike an integral of the first kind, it is oriented and changes sign when the path is reversed.',
        'After parametrizing the path as r(t), the integral is evaluated as ∫ₐᵇ F(r(t))·r′(t)dt. If F = ∇φ, then the integral equals φ(B) − φ(A) and depends only on the initial and terminal points.',
      ],
      terms: [
        {
          term: 'Oriented curve',
          definition:
            'A curve with a chosen direction of traversal from an initial point to a terminal point.',
        },
        {
          term: 'Circulation',
          definition:
            'The line integral F·dr around a closed oriented contour.',
        },
        {
          term: 'Conservative field',
          definition:
            'A vector field representable as F = ∇φ for some scalar function φ.',
        },
      ],
      example: {
        title: 'Work done by a conservative field',
        problem:
          'Find the work done by the field F = (2x, 2y) in moving from (0, 0) to (1, 2).',
        steps: [
          'The field is the gradient of the potential φ(x, y) = x² + y².',
          'The work is independent of the path and equals φ(1, 2) − φ(0, 0).',
          'This gives 1² + 2² = 5.',
        ],
        answer: 'The work done by the field is 5.',
      },
      pitfall:
        'A common mistake is to forget that reversing the orientation changes the sign of the integral. Fix the initial and terminal points before choosing the parameter and its limits.',
      practice: {
        question:
          'What is the circulation of the field F = (−y, x) around the counterclockwise-oriented unit circle?',
        answer:
          'With r(t) = (cos t, sin t), the integrand equals 1, so the circulation is 2π.',
      },
    },
  },
  57: {
    title: 'Surface Integral of the First Kind',
    topics: [
      'Fundamental concepts',
      'Evaluation of surface integrals of the first kind',
      'Some applications of surface integrals of the first kind',
    ],
    guide: {
      summary:
        'A surface integral of the first kind sums a scalar quantity over a surface, weighted by the area element. It does not depend on the choice of orientation and is evaluated from a parametrization of the surface and the magnitude of the cross product of its tangent vectors.',
      keyIdea:
        'The area factor in parameter coordinates is the magnitude of the cross product of the partial derivatives of the position vector.',
      formula:
        '\\iint_S f\\,dS=\\iint_D f(\\mathbf r(u,v))\\lVert\\mathbf r_u\\times\\mathbf r_v\\rVert\\,du\\,dv',
      question:
        'How is the surface-area element obtained from a parametrization of the surface?',
    },
    detail: {
      hook:
        'The area of a curved shell cannot be found simply from the area of its projection. A surface integral of the first kind accounts for the local slope of every part of the surface.',
      explanation: [
        'A surface integral of the first kind sums the values of a scalar function over area elements dS. It is independent of the orientation of the surface and, for the unit function, gives its area.',
        'For a parametrization r(u, v), the area element is |rᵤ × rᵥ|dudv. For the graph z = g(x, y), this quantity takes the form √(1 + gₓ² + gᵧ²)dxdy.',
      ],
      terms: [
        {
          term: 'Regular surface',
          definition:
            'A parametrized surface whose tangent vectors rᵤ and rᵥ are linearly independent.',
        },
        {
          term: 'Area element',
          definition:
            'The quantity dS = |rᵤ × rᵥ|dudv, which converts area in the parameter domain into area on the surface.',
        },
        {
          term: 'Surface density',
          definition:
            'The mass per unit area of a shell, which serves as the integrand when its mass is calculated.',
        },
      ],
      example: {
        title: 'Area of a portion of a plane',
        problem:
          'Find the area of the surface z = x + y above the square 0 ≤ x ≤ 1, 0 ≤ y ≤ 1.',
        steps: [
          'Use the parametrization r(x, y) = (x, y, x + y).',
          'The cross product rₓ × rᵧ is (−1, −1, 1), and its magnitude is √3.',
          'The integral of √3 over the unit square is √3.',
        ],
        answer: 'The area of the surface is √3.',
      },
      pitfall:
        'A common mistake is to integrate only over the area of the projection and ignore the slope. Always find the factor |rᵤ × rᵥ| or use its formula for a graph.',
      practice: {
        question:
          'What is ∫∫ₛ 1 dS for the unit disk in the plane z = 0?',
        answer: 'The integral equals the area of the disk, π.',
      },
    },
  },
  58: {
    title: 'Surface Integral of the Second Kind',
    topics: [
      'Fundamental concepts',
      'Evaluation of surface integrals of the second kind',
      'The Gauss–Ostrogradsky formula',
      "Stokes' theorem",
      'Some applications of surface integrals of the second kind',
    ],
    guide: {
      summary:
        'A surface integral of the second kind measures the flux of a vector field through an oriented surface. For a C¹ field, the Gauss–Ostrogradsky theorem relates flux across a closed piecewise-smooth boundary to a volume integral of divergence, while Stokes’ theorem relates flux of curl across an oriented surface to circulation along its consistently oriented boundary.',
      keyIdea:
        'Flux across a closed surface with the outward normal is determined by the total divergence of a smooth field within the enclosed volume.',
      formula:
        '\\iint_{\\partial V}\\mathbf F\\cdot\\mathbf n_{\\mathrm{out}}\\,dS=\\iiint_V\\nabla\\cdot\\mathbf F\\,dV',
      question:
        'How does the flux of a vector field change when the chosen normal is replaced by the opposite normal?',
    },
    detail: {
      hook:
        'The flow of a fluid through a membrane depends on both the velocity and the chosen side of the surface. A surface integral of the second kind measures this oriented transport.',
      explanation: [
        'The flux of a field F through an oriented surface S is ∫∫ₛ F·n dS, where n is the chosen unit normal. Replacing the normal by the opposite normal reverses the sign of the flux.',
        'Suppose F has continuous first derivatives in a neighborhood of the closure of a bounded volume V, and its piecewise-smooth boundary ∂V is oriented by the outward normal. The Gauss–Ostrogradsky theorem then replaces the flux across ∂V by the integral of div F over V. For an oriented piecewise-smooth surface S and a C¹ field F in its neighborhood, Stokes’ theorem relates the flux of curl F across S to the circulation of F along the consistently oriented boundary ∂S.',
      ],
      terms: [
        {
          term: 'Surface orientation',
          definition:
            'A continuous choice of one of the two directions of the unit normal at each point of a surface.',
        },
        {
          term: 'Flux',
          definition:
            'The integral of the normal component of a vector field through an oriented surface.',
        },
        {
          term: 'Divergence',
          definition:
            'The scalar ∇·F, which characterizes the local strength of a source or sink of the field.',
        },
        {
          term: 'Curl',
          definition:
            'The vector ∇×F, which characterizes the local axis and intensity of rotation of the field.',
        },
      ],
      example: {
        title: 'Flux through a sphere',
        problem:
          'Find the outward flux of the field F = (x, y, z) through a sphere of radius R.',
        steps: [
          'The divergence of the field is ∇·F = 3.',
          'By the divergence theorem, the flux equals the triple integral of 3 over the ball.',
          'The volume of the ball is 4πR³/3, so the flux is 4πR³.',
        ],
        answer: 'The outward flux is 4πR³.',
      },
      pitfall:
        'A common mistake is to use both a unit normal and an unnormalized cross product as two separate area factors. Choose one notation: n dS or the oriented vector rᵤ × rᵥ dudv.',
      practice: {
        question:
          'What is the flux of a constant vector field through any closed piecewise-smooth surface?',
        answer:
          'It is zero because the divergence of a constant field is zero.',
      },
    },
  },
  59: {
    title: 'Numerical Series',
    topics: [
      'Fundamental concepts',
      'Geometric series',
      'A necessary condition for convergence of a numerical series. The harmonic series',
    ],
    guide: {
      summary:
        'A numerical series converges if the sequence of its partial sums has a finite limit. The condition that the general term tend to zero is necessary, but it does not by itself guarantee convergence.',
      keyIdea:
        'The convergence of a series is determined by the behavior of its partial sums, not merely by its individual terms.',
      formula:
        'S_n=\\sum_{k=1}^{n}a_k,\\qquad \\sum_{k=1}^{\\infty}a_k=S\\iff\\lim_{n\\to\\infty}S_n=S',
      question:
        'Why is the equality lim aₙ = 0 not a sufficient condition for convergence of a series?',
    },
    detail: {
      hook:
        'An infinite sum cannot be tested by the ordinary addition of all its terms. The theory of series replaces that impossible operation with the study of finite partial sums.',
      explanation: [
        'For the series Σaₙ, the partial sum Sₙ contains the first n terms, and convergence means that Sₙ has a finite limit. The number S is called the sum of the series.',
        'Convergence necessarily implies aₙ → 0, but the converse is false. A geometric series converges when |q| < 1, whereas the harmonic series diverges even though its terms tend to zero.',
      ],
      terms: [
        {
          term: 'Numerical series',
          definition:
            'The formal infinite sum of the terms of a given numerical sequence.',
        },
        {
          term: 'Partial sum',
          definition:
            'The finite sum Sₙ = a₁ + a₂ + … + aₙ.',
        },
        {
          term: 'Sum of a series',
          definition:
            'The finite limit of the sequence of partial sums of a convergent series.',
        },
        {
          term: 'Remainder of a series',
          definition:
            'The difference between the sum of a convergent series and one of its partial sums.',
        },
      ],
      example: {
        title: 'Sum of a geometric series',
        problem: 'Find the sum Σₙ₌₀∞ 3·(1/2)ⁿ.',
        steps: [
          'The first term is 3, and the common ratio of the geometric progression is 1/2.',
          'Since |1/2| < 1, the series converges and its sum is 3/(1 − 1/2).',
          'Simplifying gives 6.',
        ],
        answer: 'The sum of the series is 6.',
      },
      pitfall:
        'A common mistake is to treat the condition aₙ → 0 as sufficient. After checking the general term, always apply a separate convergence test or examine the partial sums.',
      practice: {
        question: 'What is the sum of the series Σₙ₌₁∞ 1/(n(n + 1))?',
        answer:
          'The decomposition 1/(n(n + 1)) = 1/n − 1/(n + 1) gives the telescoping sum 1.',
      },
    },
  },
  60: {
    title: 'Sufficient Convergence Tests for Positive-Term Series',
    topics: [
      'Comparison tests for series',
      "D'Alembert's ratio test",
      "Cauchy's root test",
      "Cauchy's integral test. The generalized harmonic series",
    ],
    guide: {
      summary:
        "For series with nonnegative terms, convergence can be established using comparison tests, D'Alembert's ratio test, Cauchy's root test, and the integral test. Each test compares the rate at which the terms decrease with the behavior of a familiar benchmark or a corresponding limit.",
      keyIdea:
        'The test should be chosen to match the form of the general term, because different tests are effective for different rates of decay.',
      formula:
        'a_n>0,\\quad\\lim_{n\\to\\infty}\\frac{a_{n+1}}{a_n}=q<1\\Longrightarrow\\sum_{n=1}^{\\infty}a_n\\ \\text{converges}',
      question:
        "What conclusion does D'Alembert's ratio test give when the limit of the ratio of successive terms is less than one?",
    },
    detail: {
      hook:
        'No single test detects every convergent series. The ability to recognize the structure of the general term is often more important than mechanically evaluating a limit.',
      explanation: [
        'Comparison tests compare the nonnegative terms of the series under study with those of a known benchmark series. Limit comparison is particularly convenient when the ratio of the general terms tends to a finite positive number.',
        "D'Alembert's test examines the ratio of successive terms, Cauchy's root test examines the nth root, and the integral test relates the series to an improper integral. A limit equal to one in D'Alembert's and Cauchy's tests yields no conclusion.",
      ],
      terms: [
        {
          term: 'Comparison test',
          definition:
            'A rule for transferring convergence or divergence between series with comparable nonnegative terms.',
        },
        {
          term: "D'Alembert's ratio test",
          definition:
            'The study of the limit aₙ₊₁/aₙ, which yields convergence when its value is less than one and divergence when its value is greater than one.',
        },
        {
          term: "Cauchy's root test",
          definition:
            'The study of the upper limit of the roots ⁿ√aₙ using the same thresholds relative to one.',
        },
        {
          term: 'Integral test',
          definition:
            'The equivalence between the convergence of the series Σf(n) and that of the improper integral of a positive, continuous, decreasing function f.',
        },
      ],
      example: {
        title: 'A series with an exponential denominator',
        problem: 'Investigate the series Σₙ₌₁∞ n/2ⁿ.',
        steps: [
          'Set aₙ = n/2ⁿ and compute aₙ₊₁/aₙ = (n + 1)/(2n).',
          'The limit of the ratio is 1/2.',
          "Since 1/2 < 1, the series converges by D'Alembert's ratio test.",
        ],
        answer: 'The series converges.',
      },
      pitfall:
        "A common mistake is to declare a series divergent when D'Alembert's test gives the limit 1. In that case the test is inconclusive, so use comparison, the integral test, or another method.",
      practice: {
        question: 'Does the series Σₙ₌₁∞ 1/n^(3/2) converge?',
        answer:
          'Yes. It is a generalized harmonic series with exponent 3/2 > 1.',
      },
    },
  },
  61: {
    title: 'Alternating and Sign-Changing Series',
    topics: [
      "Alternating series. Leibniz's test",
      'A general sufficient convergence test for sign-changing series',
      'Absolute and conditional convergence of numerical series. Properties of absolutely convergent series',
    ],
    guide: {
      summary:
        "An alternating series converges by Leibniz's test if the magnitudes of its terms decrease monotonically to zero. For arbitrary sign-changing series, absolute and conditional convergence are distinguished, and absolute convergence implies ordinary convergence.",
      keyIdea:
        'Alternating signs can ensure convergence even when the series of absolute values diverges.',
      formula:
        'b_n\\downarrow0\\Longrightarrow\\sum_{n=1}^{\\infty}(-1)^{n-1}b_n\\ \\text{converges}',
      question:
        'How does conditional convergence differ from absolute convergence?',
    },
    detail: {
      hook:
        'Alternating signs can compensate for terms that decrease too slowly. A series may therefore converge even though the sum of the absolute values of the same terms is infinite.',
      explanation: [
        "Leibniz's test guarantees convergence of a series with terms (−1)ⁿ⁻¹bₙ if bₙ is nonincreasing and tends to zero. Under these conditions, the error after n terms does not exceed bₙ₊₁.",
        'A series converges absolutely if the series of absolute values of its terms converges, and conditionally if the original series converges while the series of absolute values diverges. Absolute convergence preserves the sum under rearrangements, whereas conditional convergence requires care.',
      ],
      terms: [
        {
          term: 'Alternating series',
          definition:
            'A series in which the signs of successive nonzero terms alternate.',
        },
        {
          term: 'Absolute convergence',
          definition:
            'Convergence of the series Σ|aₙ|, which automatically implies convergence of Σaₙ.',
        },
        {
          term: 'Conditional convergence',
          definition:
            'Convergence of Σaₙ together with divergence of Σ|aₙ|.',
        },
      ],
      example: {
        title: 'The alternating harmonic series',
        problem: 'Determine the type of convergence of Σₙ₌₁∞ (−1)ⁿ⁻¹/n.',
        steps: [
          "The sequence 1/n decreases and tends to zero, so the series converges by Leibniz's test.",
          'The series of absolute values becomes the harmonic series Σ1/n.',
          'The harmonic series diverges, so the original series converges conditionally.',
        ],
        answer: 'The series converges conditionally.',
      },
      pitfall:
        "A common mistake is to check only that the signs alternate. To apply Leibniz's test, also verify that the magnitudes of the terms are eventually nonincreasing and tend to zero.",
      practice: {
        question: 'How does the series Σₙ₌₁∞ (−1)ⁿ/n² converge?',
        answer:
          'It converges absolutely because the series Σ1/n² converges.',
      },
    },
  },
  62: {
    title: 'Series of Functions',
    topics: ['Fundamental concepts'],
    guide: {
      summary:
        'A series of functions defines a sum at the points where the corresponding numerical series of its values converges. Pointwise convergence considers each point separately, whereas uniform convergence controls a single rate of approximation over the entire domain.',
      keyIdea:
        'Under standard conditions, uniform convergence allows continuity and term-by-term integration to pass to the sum.',
      formula:
        '\\sup_{x\\in E}|S_n(x)-S(x)|\\xrightarrow[n\\to\\infty]{}0',
      question:
        'How do the quantifiers in the definition of uniform convergence differ from those in the definition of pointwise convergence?',
    },
    detail: {
      hook:
        'When the terms depend on x, the sum of the series itself becomes a function. The main difficulty is determining whether the partial sums approximate it equally well throughout the domain.',
      explanation: [
        'A series of functions Σuₙ(x) converges at a point x if the numerical series of values uₙ(x) converges. The set of all such points is called the domain of convergence, and the limit of the partial sums is called the sum of the series.',
        'Pointwise convergence allows a different approximation index for each point, whereas uniform convergence requires one index for the entire domain. A uniform limit of continuous functions is continuous, and, under standard conditions, a uniformly convergent series may be integrated term by term.',
      ],
      terms: [
        {
          term: 'Domain of convergence',
          definition:
            'The set of points at which a series of functions converges as a numerical series.',
        },
        {
          term: 'Pointwise convergence',
          definition:
            'Convergence of the partial sums to the limiting function separately at each fixed point.',
        },
        {
          term: 'Uniform convergence',
          definition:
            'Convergence for which, for every ε, the same index N works for every point in the domain.',
        },
      ],
      example: {
        title: 'A geometric series of functions',
        problem: 'Investigate Σₙ₌₀∞ xⁿ on the interval 0 ≤ x < 1.',
        steps: [
          'For each fixed x < 1, this is a geometric series with sum 1/(1 − x).',
          'The condition uₙ(x) → 0 uniformly, which is necessary for uniform convergence, is not satisfied here.',
          'Indeed, sup₀≤x<1 xⁿ = 1 for every n.',
        ],
        answer:
          'The series converges pointwise to 1/(1 − x), but it does not converge uniformly on the entire interval 0 ≤ x < 1.',
      },
      pitfall:
        'A common mistake is to move a limit inside an integral after establishing only pointwise convergence. First verify uniform convergence or the applicability of another theorem that permits passage to the limit.',
      practice: {
        question:
          'Does the series Σxⁿ converge uniformly on the closed interval 0 ≤ x ≤ q, where 0 < q < 1?',
        answer:
          'Yes. The remainder is bounded by a geometric progression with ratio q < 1.',
      },
    },
  },
  63: {
    title: 'Convergence of Power Series',
    topics: [
      "N. Abel's theorem",
      'Interval and radius of convergence of a power series',
      'Properties of power series',
    ],
    guide: {
      summary:
        'A power series converges absolutely when |x − a| < R and diverges when |x − a| > R. It converges uniformly on every closed interval contained within the interval of convergence, while the endpoints must be investigated separately.',
      keyIdea:
        'The radius of convergence is determined entirely by the asymptotic growth of the coefficients of the series.',
      formula:
        '\\frac1R=\\limsup_{n\\to\\infty}\\sqrt[n]{|a_n|}',
      question:
        'Why does the formula for the radius of convergence not automatically settle convergence at the endpoints of the interval?',
    },
    detail: {
      hook:
        'A power series has infinitely many terms, yet the entire geometry of its convergence is determined by a single number. The radius of convergence separates the region where operations are reliable from the region of divergence.',
      explanation: [
        'The series Σaₙ(x − x₀)ⁿ converges absolutely when |x − x₀| < R and diverges when |x − x₀| > R. At the endpoints of the interval, each value is investigated separately as an ordinary numerical series.',
        'The radius can be found from the Cauchy–Hadamard formula or from the limit of the ratio of coefficients when that limit exists. Within the interval, the series may be differentiated and integrated term by term, and the radius of convergence is preserved.',
      ],
      terms: [
        {
          term: 'Power series',
          definition:
            'A series of functions of the form Σaₙ(x − x₀)ⁿ with a fixed center x₀.',
        },
        {
          term: 'Radius of convergence',
          definition:
            'The number R such that the power series converges absolutely inside it and diverges outside it.',
        },
        {
          term: 'Interval of convergence',
          definition:
            'The interval |x − x₀| < R together with those endpoints at which the series converges.',
        },
        {
          term: "Abel's theorem",
          definition:
            'The statement that if a power series converges at an endpoint of its interval, its sum approaches that endpoint sum as the endpoint is approached from within the interval.',
        },
      ],
      example: {
        title: 'Radius of a series with coefficient n',
        problem: 'Find the interval of convergence of the series Σₙ₌₁∞ n xⁿ.',
        steps: [
          "By D'Alembert's ratio test, the limit |aₙ₊₁xⁿ⁺¹/(aₙxⁿ)| is |x|.",
          'Absolute convergence holds for |x| < 1, so R = 1.',
          'At x = 1 and x = −1, the terms of the series do not tend to zero.',
        ],
        answer: 'The interval of convergence is (−1, 1).',
      },
      pitfall:
        'A common mistake is to include both endpoints automatically after finding R. Substitute each endpoint into the original series and investigate it separately.',
      practice: {
        question: 'What is the interval of convergence of Σₙ₌₁∞ xⁿ/n?',
        answer:
          'R = 1; at x = 1 the series diverges, while at x = −1 it converges, so the interval is [−1, 1).',
      },
    },
  },
  64: {
    title: 'Expansion of Functions in Power Series',
    topics: [
      'Taylor and Maclaurin series',
      'Taylor (Maclaurin) expansions of selected elementary functions',
    ],
    guide: {
      summary:
        'A Taylor series is constructed from the values of all derivatives of a function at a chosen center. It represents the function itself only at those points where the remainder in Taylor’s formula tends to zero.',
      keyIdea:
        'Agreement of all derivatives at a single point does not yet guarantee that a function equals its Taylor series.',
      formula:
        'f(x)=\\sum_{n=0}^{N}\\frac{f^{(n)}(a)}{n!}(x-a)^n+R_N(x),\\qquad R_N(x)\\xrightarrow[N\\to\\infty]{}0',
      question:
        'What condition on the remainder turns Taylor’s formula into an expansion of the function as an infinite series?',
    },
    detail: {
      hook:
        'A polynomial is easy to evaluate, differentiate, and integrate. A Taylor series makes it possible to replace a complicated function by a polynomial with controlled accuracy.',
      explanation: [
        'The coefficient of (x − a)ⁿ in the Taylor series is f⁽ⁿ⁾(a)/n!, and when a = 0 the series is called a Maclaurin series. These coefficients ensure that the derivatives of the function and the formal series agree at the center.',
        'The infinite series represents the function only at those points x where the remainder R_N(x) tends to zero as N → ∞. Infinite differentiability alone does not guarantee analyticity or equality with the Taylor series.',
      ],
      terms: [
        {
          term: 'Taylor series',
          definition:
            'A power series whose coefficients are constructed from the derivatives of a function at a chosen center.',
        },
        {
          term: 'Maclaurin series',
          definition:
            'The special case of a Taylor series centered at a = 0.',
        },
        {
          term: 'Remainder',
          definition:
            'The difference between the function and a finite Taylor polynomial.',
        },
        {
          term: 'Analytic function',
          definition:
            'A function that locally agrees with its convergent power series.',
        },
      ],
      example: {
        title: 'Cubic approximation of the exponential function',
        problem: 'Approximate e^0.1 with a Maclaurin polynomial of degree 3.',
        steps: [
          'All derivatives of eˣ at zero equal 1.',
          'Use P₃(x) = 1 + x + x²/2 + x³/6.',
          'At x = 0.1, this gives 1 + 0.1 + 0.005 + 0.0001667 ≈ 1.1051667.',
        ],
        answer: 'The cubic approximation is approximately 1.1051667.',
      },
      pitfall:
        'A common mistake is to assume that a formal Taylor series automatically equals the function. Check the radius of convergence and verify that the remainder tends to zero.',
      practice: {
        question: 'What are the first three nonzero terms of the Maclaurin series for sin x?',
        answer: 'sin x = x − x³/6 + x⁵/120 + …',
      },
    },
  },
  65: {
    title: 'Some Applications of Power Series',
    topics: [
      'Approximate evaluation of function values',
      'Approximate evaluation of definite integrals',
      'Approximate solution of differential equations',
    ],
    guide: {
      summary:
        'Power series are used for approximate evaluation of functions and integrals and for constructing solutions of differential equations. The validity of term-by-term operations is determined by the domain of convergence, and the accuracy of the approximation is controlled by the remainder.',
      keyIdea:
        'A complicated function can be replaced by a finite polynomial provided that the error due to the discarded tail is estimated at the same time.',
      formula:
        'f(x)=\\sum_{n=0}^{\\infty}c_n(x-a)^n\\Longrightarrow\\int f(x)\\,dx=C+\\sum_{n=0}^{\\infty}\\frac{c_n}{n+1}(x-a)^{n+1}',
      question:
        'What must be checked before integrating a power series term by term on a given interval?',
    },
    detail: {
      hook:
        'A power series turns the evaluation of a function into a sequence of arithmetic operations. The same approach approximates integrals and constructs solutions of differential equations.',
      explanation: [
        'A finite sum of a power series serves as an approximation, and the discarded tail determines the error. In computations, the number of terms is chosen so that the remainder estimate is smaller than the required tolerance.',
        'Within the interval of convergence, a power series may be integrated and differentiated term by term. When solving a differential equation, substituting y = Σaₙxⁿ and comparing coefficients yields recurrence formulas for aₙ.',
      ],
      terms: [
        {
          term: 'Series truncation',
          definition:
            'Replacement of an infinite series by one of its finite partial sums.',
        },
        {
          term: 'Truncation error',
          definition:
            'The absolute difference between the exact value of the sum and the chosen partial sum.',
        },
        {
          term: 'Method of undetermined series coefficients',
          definition:
            'Construction of a solution to an equation by comparing coefficients of like powers of the variable.',
        },
      ],
      example: {
        title: 'Approximate integral without an elementary antiderivative',
        problem:
          'Approximate ∫₀^0.2 e^(−x²)dx, retaining terms through x⁴.',
        steps: [
          'The expansion begins as e^(−x²) = 1 − x² + x⁴/2 + …',
          'Integrate the polynomial to obtain x − x³/3 + x⁵/10.',
          'At x = 0.2, this gives 0.2 − 0.008/3 + 0.00032/10 ≈ 0.1973653.',
        ],
        answer: 'The approximate value of the integral is 0.1973653.',
      },
      pitfall:
        'A common mistake is to use several terms without assessing applicability and the remainder. Make sure the point lies in the domain of convergence and estimate the first omitted contribution.',
      practice: {
        question:
          'What first four coefficients does the power-series method give for y′ = y, y(0) = 1?',
        answer:
          'It gives y = 1 + x + x²/2 + x³/6 + …, so the coefficients are 1, 1, 1/2, and 1/6.',
      },
    },
  },
  66: {
    title: 'Fourier Series',
    topics: [
      'Periodic functions. Periodic processes',
      'Trigonometric Fourier series',
    ],
    guide: {
      summary:
        'A Fourier series represents a periodic function as the sum of a constant component and harmonics of integer frequencies. The coefficients are projections of the function onto the orthogonal system of sines and cosines.',
      keyIdea:
        'Each pair of coefficients describes the contribution of one frequency harmonic to the original signal.',
      formula:
        'f(x)\\sim\\frac{a_0}{2}+\\sum_{n=1}^{\\infty}\\bigl(a_n\\cos nx+b_n\\sin nx\\bigr)',
      question:
        'What do the coefficients aₙ and bₙ represent in a Fourier expansion?',
    },
    detail: {
      hook:
        'A complicated periodic signal can be decomposed into simple sinusoidal oscillations. A Fourier series reveals which frequencies produce the observed shape.',
      explanation: [
        'For a function of period 2π, the trigonometric Fourier series has the form a₀/2 + Σ(aₙ cos nx + bₙ sin nx). The coefficients are calculated as integral projections of the function onto mutually orthogonal sines and cosines.',
        'The constant coefficient gives the mean value, while the pair aₙ and bₙ describes the nth harmonic. For piecewise-smooth functions, the series converges to the function at points of continuity and to the half-sum of the one-sided limits at jump discontinuities.',
      ],
      terms: [
        {
          term: 'Harmonic',
          definition:
            'A sinusoidal component whose frequency is an integer multiple of the fundamental frequency of a periodic function.',
        },
        {
          term: 'Fourier coefficients',
          definition:
            'The numbers aₙ and bₙ given by the integral projections of the function onto cos nx and sin nx.',
        },
        {
          term: 'Mean component',
          definition:
            'The term a₀/2, equal to the mean value of the function over one period.',
        },
        {
          term: 'Frequency spectrum',
          definition:
            'The collection of amplitudes and phases of the harmonics present in an expansion.',
        },
      ],
      example: {
        title: 'Fourier series for the function x',
        problem: 'Expand f(x) = x on the interval −π < x < π.',
        steps: [
          'The function is odd, so a₀ = 0 and every aₙ = 0.',
          'Integration gives bₙ = 2(−1)ⁿ⁺¹/n.',
          'Therefore, x = 2Σₙ₌₁∞ (−1)ⁿ⁺¹ sin(nx)/n inside the interval.',
        ],
        answer:
          'The series is 2(sin x − sin 2x/2 + sin 3x/3 − …).',
      },
      pitfall:
        'A common mistake is to mix coefficient normalizations for periods 2π and T. First fix the period, then use consistent integration limits and frequencies.',
      practice: {
        question:
          'What sine coefficients does an integrable even function on [−π, π] have?',
        answer: 'All coefficients bₙ are zero.',
      },
    },
  },
  67: {
    title: 'Fourier Expansion of 2π-Periodic Functions',
    topics: [
      "Dirichlet's theorem",
      'Fourier expansion of even and odd functions',
      'Fourier expansion of functions with an arbitrary period',
      'Representation of a nonperiodic function by a Fourier series',
      'Complex form of a Fourier series',
    ],
    guide: {
      summary:
        'Under the Dirichlet conditions, a Fourier series converges to the value of the function at a point of continuity and to the half-sum of the one-sided limits at a jump discontinuity. Parity simplifies the coefficients, while rescaling the argument and using the complex form extend the expansion to an arbitrary period.',
      keyIdea:
        'At a jump discontinuity, a Fourier series reconstructs the average of the left- and right-hand limiting values.',
      formula:
        'S_f(x)=\\frac{f(x-0)+f(x+0)}{2}',
      question:
        'To what value does a Fourier series converge at a jump discontinuity?',
    },
    detail: {
      hook:
        'A Fourier series can describe even a function with jumps. At the discontinuity itself, it chooses neither side but instead their average value.',
      explanation: [
        'Under the Dirichlet conditions, a Fourier series converges to f(x) at a point of continuity and to (f(x − 0) + f(x + 0))/2 at a jump discontinuity. Near a jump, finite partial sums display an overshoot whose height does not vanish, known as the Gibbs phenomenon.',
        'For an even function, only cosine terms remain; for an odd function, only sine terms remain. An arbitrary period T introduces frequencies 2πn/T, and the complex form combines the sine and cosine coefficients into the numbers cₙ.',
      ],
      terms: [
        {
          term: 'Dirichlet conditions',
          definition:
            'Sufficient conditions involving piecewise smoothness and finite numbers of extrema and discontinuities that ensure the standard convergence of a Fourier series.',
        },
        {
          term: 'Periodic extension',
          definition:
            'A function on the entire real line obtained by repeating the values of the original function from a given interval.',
        },
        {
          term: 'Gibbs phenomenon',
          definition:
            'The persistent overshoot of partial sums near a jump discontinuity of a function.',
        },
        {
          term: 'Complex Fourier coefficient',
          definition:
            'The coefficient cₙ multiplying the exponential eⁱⁿˣ in the complex form of the series.',
        },
      ],
      example: {
        title: 'Fourier series of a square wave',
        problem:
          'Let f(x) = −1 for −π < x < 0 and f(x) = 1 for 0 < x < π. Find its Fourier series.',
        steps: [
          'The function is odd, so the constant and cosine coefficients are zero.',
          'For the sine coefficients, bₙ = 4/(πn) when n is odd and bₙ = 0 when n is even.',
          'Assemble the series from the odd harmonics.',
        ],
        answer:
          'At points of continuity, f(x) is represented by 4/π · (sin x + sin 3x/3 + sin 5x/5 + …).',
      },
      pitfall:
        'A common mistake is to claim that, at a jump, the series converges to the arbitrarily assigned value of the function at that point. First find the one-sided limits and take their half-sum.',
      practice: {
        question:
          'To what value does the series of the square wave in the example converge at x = 0?',
        answer: 'It converges to (−1 + 1)/2 = 0.',
      },
    },
  },
  68: {
    title: 'Fourier Integral',
    topics: [],
    guide: {
      summary:
        'The Fourier integral represents a sufficiently regular nonperiodic function by a continuous spectrum of complex harmonics. The forward and inverse transforms move a function between the original and frequency domains, while the chosen convention fixes the factor 2π.',
      keyIdea:
        'A series of discrete frequencies becomes an integral over continuous frequency as the period tends to infinity.',
      formula:
        '\\widehat f(\\omega)=\\int_{-\\infty}^{\\infty}f(x)e^{-i\\omega x}\\,dx,\\qquad f(x)=\\frac1{2\\pi}\\int_{-\\infty}^{\\infty}\\widehat f(\\omega)e^{i\\omega x}\\,d\\omega',
      question:
        'How does the continuous spectrum of a Fourier integral differ from the set of frequencies in a Fourier series?',
    },
    detail: {
      hook:
        'A nonperiodic pulse cannot be described by a discrete set of harmonics from a single period. The Fourier integral replaces that set with a continuous spectrum of frequencies.',
      explanation: [
        'Under the convention with forward transform F̂(ω) = ∫f(x)e^(−iωx)dx, the inverse formula contains the factor 1/(2π). The value F̂(ω) describes the complex amplitude of the frequency ω.',
        'The inversion formula is valid under appropriate integrability conditions or is understood in a more general sense. Translating the function changes the phase of the spectrum, scaling stretches it, and convolution of functions becomes multiplication of their transforms.',
      ],
      terms: [
        {
          term: 'Fourier transform',
          definition:
            'An integral mapping of a function to its continuous frequency spectrum.',
        },
        {
          term: 'Inverse transform',
          definition:
            'The integral that reconstructs the original function from its spectrum under the chosen normalization.',
        },
        {
          term: 'Continuous spectrum',
          definition:
            'The distribution of amplitude and phase over all real frequencies.',
        },
        {
          term: 'Convolution',
          definition:
            'The operation (f ∗ g)(x) = ∫f(t)g(x − t)dt, which becomes multiplication under the Fourier transform.',
        },
      ],
      example: {
        title: 'Spectrum of a rectangular pulse',
        problem:
          'Find the Fourier transform of the function that equals 1 on [−a, a] and 0 outside this interval.',
        steps: [
          'By definition, F̂(ω) = ∫₋ₐᵃ e^(−iωx)dx.',
          'For ω ≠ 0, the integral equals 2sin(aω)/ω.',
          'At ω = 0, the continuous extension gives F̂(0) = 2a.',
        ],
        answer:
          'The spectrum is 2sin(aω)/ω, with limiting value 2a at zero.',
      },
      pitfall:
        'A common mistake is to combine the forward formula from one convention with the inverse formula from another. Always check the signs in the exponentials and the placement of the factor 2π as a consistent pair.',
      practice: {
        question:
          'How does the spectrum F̂(ω) change if the original function is replaced by f(x − x₀)?',
        answer: 'The new spectrum is e^(−iωx₀)F̂(ω).',
      },
    },
  },
  69: {
    title: 'Fundamental Concepts of Field Theory',
    topics: [],
    guide: {
      summary:
        'A field assigns a scalar or a vector to every point of a domain and thereby describes a quantity distributed through space. The geometric and differential characteristics of a field reveal its levels, direction, sources, and rotational behavior.',
      keyIdea:
        'The type of value assigned at each point determines whether a field is scalar or vector-valued.',
      formula:
        '\\Omega\\subset\\mathbb R^3,\\qquad u:\\Omega\\to\\mathbb R,\\quad\\mathbf F:\\Omega\\to\\mathbb R^3',
      question:
        'What is the fundamental distinction between a scalar field and a vector field?',
    },
    detail: {
      hook:
        'The temperature in a room and the velocity of the air describe space in different ways. Field theory provides a common language for scalar and directional distributions.',
      explanation: [
        'A scalar field assigns one number to a point, whereas a vector field assigns a vector. A field is called stationary if it does not depend on time.',
        'The domain specifies the part of space in which the field is considered, and a coordinate representation makes calculations possible. Level curves and surfaces visualize a scalar field, while field lines show the direction of a vector field.',
      ],
      terms: [
        {
          term: 'Scalar field',
          definition:
            'A mapping from a region of space to a set of numbers, such as a temperature distribution.',
        },
        {
          term: 'Vector field',
          definition:
            'A mapping from a region of space to a vector space, such as a velocity field.',
        },
        {
          term: 'Domain of a field',
          definition:
            'The set of points at which the field under consideration is defined.',
        },
        {
          term: 'Stationary field',
          definition:
            'A field whose components do not depend on time.',
        },
      ],
      example: {
        title: 'Values of two fields at a point',
        problem:
          'For u = x² + y² + z² and F = (−y, x, 0), find the values at the point (1, 2, 2).',
        steps: [
          'Substitute the coordinates into the scalar field: u = 1 + 4 + 4 = 9.',
          'Substitute the coordinates into the components of the vector field: F = (−2, 1, 0).',
        ],
        answer: 'The results are the number u = 9 and the vector F = (−2, 1, 0).',
      },
      pitfall:
        'A common mistake is to identify a field vector with the trajectory of a particle. A field gives the instantaneous direction at every point; the trajectory must be found from a separate differential equation.',
      practice: {
        question: 'Is the field F(x, y, t) = (x, y, t) stationary?',
        answer: 'No. Its third component explicitly depends on time t.',
      },
    },
  },
  70: {
    title: 'Scalar Field',
    topics: [
      'Level surfaces and level curves',
      'Directional derivative',
      'Gradient of a scalar field and its properties',
    ],
    guide: {
      summary:
        'A scalar field is described by a function of the coordinates, and its level curves and level surfaces consist of points with the same value. If the field is differentiable at a point, its directional derivative along a unit vector is the scalar product of that vector with the gradient; a nonzero gradient points in the direction of steepest increase.',
      keyIdea:
        'The gradient is perpendicular to a regular level surface and encodes all directional derivatives.',
      formula:
        'D_{\\mathbf e}u=\\nabla u\\cdot\\mathbf e,\\qquad\\lVert\\mathbf e\\rVert=1',
      question:
        'In which direction does the directional derivative of a scalar field attain its greatest value?',
    },
    detail: {
      hook:
        'A contour map gives a value at every point, but the direction of ascent must be extracted from it. The gradient makes both that direction and the rate of increase explicit.',
      explanation: [
        'A level curve or level surface is defined by the equation u = c and consists of points at which the field has the same value. A nonzero gradient ∇u is perpendicular to a regular level surface.',
        'If u is differentiable at the point, the directional derivative along a unit vector e is Dₑu = ∇u·e. When ∇u ≠ 0, it is greatest in the direction ∇u/|∇u|, and its maximum value is |∇u|. When ∇u = 0, all such directional derivatives are zero and there is no unique direction of steepest increase.',
      ],
      terms: [
        {
          term: 'Level surface',
          definition:
            'The set of points in space at which a scalar field takes a fixed value.',
        },
        {
          term: 'Directional derivative',
          definition:
            'The rate of change of a field when moving from a point in a specified unit direction.',
        },
        {
          term: 'Gradient',
          definition:
            'The vector of partial derivatives that gives the direction of steepest increase of a scalar field.',
        },
      ],
      example: {
        title: 'Change of a field in a specified direction',
        problem:
          'For u(x, y) = x² + y², find the directional derivative at (1, 2) in the direction e = (3/5, 4/5).',
        steps: [
          'The gradient is ∇u = (2x, 2y), so at the point it is (2, 4).',
          'The vector e is a unit vector because its length is 1.',
          'The scalar product (2, 4)·(3/5, 4/5) is 22/5.',
        ],
        answer: 'The directional derivative is 22/5.',
      },
      pitfall:
        'A common mistake is to substitute a nonunit direction vector into the formula. Normalize the direction before taking the scalar product, or explicitly account for its length.',
      practice: {
        question:
          'What are the level surfaces of u = x² + y² + z² for c > 0, and in which direction does the gradient point?',
        answer:
          'They are spheres of radius √c, and the gradient (2x, 2y, 2z) points along the outward normal.',
      },
    },
  },
  71: {
    title: 'Vector Field',
    topics: [
      'Field lines and vector fields',
      'Flux of a field',
      'Divergence of a field. The Gauss–Ostrogradsky formula',
      'Circulation of a field',
      "Curl of a field. Stokes' theorem",
    ],
    guide: {
      summary:
        'A vector field assigns a vector to every point, and its integral characteristics include flux and circulation. Divergence measures the local intensity of sources, curl measures local rotation, and the Gauss and Stokes theorems connect these quantities with integrals.',
      keyIdea:
        'Divergence and curl are local characteristics of the globally observable quantities flux and circulation.',
      formula:
        '\\operatorname{div}\\mathbf F=\\nabla\\cdot\\mathbf F,\\qquad\\operatorname{curl}\\mathbf F=\\nabla\\times\\mathbf F',
      question:
        'Which differential characteristic of a field is related to flux through a closed surface?',
    },
    detail: {
      hook:
        'A diagram of arrows alone makes it difficult to see where a field is created and where it rotates. Divergence and curl turn these properties into computable quantities.',
      explanation: [
        'Field lines are tangent to the field, flux measures its normal passage through a surface, and circulation measures its tangential action along a contour. These integral characteristics depend on the chosen orientation.',
        'The divergence ∇·F is a scalar and describes local sources, whereas the curl ∇×F is a vector and describes local rotation. The Gauss and Stokes theorems relate these local characteristics to flux and circulation.',
      ],
      terms: [
        {
          term: 'Field line',
          definition:
            'A curve whose tangent vector at each point is parallel to the field vector.',
        },
        {
          term: 'Flux of a field',
          definition:
            'The oriented integral of the normal component of a field through a surface.',
        },
        {
          term: 'Divergence',
          definition:
            'The scalar sum of the derivatives of the field components with respect to their corresponding coordinates.',
        },
        {
          term: 'Curl',
          definition:
            'The vector differential expression ∇×F, which measures local circulation.',
        },
      ],
      example: {
        title: 'A source inside the unit sphere',
        problem:
          'For F = (x, y, z), find the divergence, the curl, and the outward flux through the unit sphere.',
        steps: [
          'The divergence is 1 + 1 + 1 = 3.',
          'All mixed derivatives of the components are zero, so the curl is the zero vector.',
          'By the divergence theorem, the flux is 3·(4π/3) = 4π.',
        ],
        answer: 'div F = 3, curl F = 0, and the outward flux is 4π.',
      },
      pitfall:
        'A common mistake is to confuse the types of the results: divergence is a number, while curl in three-dimensional space is a vector. Check the dimension of the result before calculating.',
      practice: {
        question: 'Find the divergence and curl of F = (−y, x, 0).',
        answer: 'The divergence is 0, and the curl is (0, 0, 2).',
      },
    },
  },
  72: {
    title: 'Nabla (Del) Operator',
    topics: [
      'First-order vector differential operations',
      'Second-order vector differential operations',
    ],
    guide: {
      summary:
        'The nabla operator combines partial derivatives with respect to the coordinates into a formal vector operator. It provides uniform notation for the gradient, divergence, curl, and second-order operations, including the Laplacian.',
      keyIdea:
        'The algebraic form of an expression involving nabla indicates the type and meaning of the corresponding differential operation.',
      formula:
        '\\nabla=\\mathbf i\\,\\partial_x+\\mathbf j\\,\\partial_y+\\mathbf k\\,\\partial_z,\\qquad\\Delta=\\nabla\\cdot\\nabla',
      question:
        'What quantities result when nabla is applied to a scalar field and when nabla is dotted with a vector field?',
    },
    detail: {
      hook:
        'Gradient, divergence, and curl look like different formulas, but they all arise from a single operator. Nabla makes their relationship visible and simplifies complicated identities.',
      explanation: [
        'The nabla operator is written as ∇ = (∂/∂x, ∂/∂y, ∂/∂z). Applying it to a scalar gives the gradient, taking its scalar product with a vector gives the divergence, and taking its vector product gives the curl.',
        'The second-order operator Δ = ∇·∇ is called the Laplacian. For sufficiently smooth fields, the identities ∇×(∇u) = 0 and ∇·(∇×F) = 0 hold.',
      ],
      terms: [
        {
          term: 'Nabla operator',
          definition:
            'A formal vector differential operator consisting of partial derivatives with respect to the coordinates.',
        },
        {
          term: 'Laplacian',
          definition:
            'The sum of the second partial derivatives of a scalar function, equal to div grad u.',
        },
        {
          term: 'First-order operation',
          definition:
            'A differential operation that uses first derivatives of a field.',
        },
        {
          term: 'Second-order operation',
          definition:
            'A differential operation containing derivatives of total order two.',
        },
      ],
      example: {
        title: 'Gradient and Laplacian',
        problem: 'For u = x²y + z², find ∇u and Δu.',
        steps: [
          'The first derivatives give ∇u = (2xy, x², 2z).',
          'The second derivatives are uₓₓ = 2y, uᵧᵧ = 0, and ∂²u/∂z² = 2.',
          'Adding them gives Δu = 2y + 2.',
        ],
        answer: '∇u = (2xy, x², 2z), and Δu = 2y + 2.',
      },
      pitfall:
        'A common mistake is to treat ∇ as an ordinary constant vector and ignore the object to its right. First determine the type of field and the admissible operation, then carry out the differentiation.',
      practice: {
        question: 'What is the divergence of the field F = (x², y², z²)?',
        answer: 'It is 2x + 2y + 2z.',
      },
    },
  },
  73: {
    title: 'Some Properties of the Principal Classes of Vector Fields',
    topics: [
      'Solenoidal field',
      'Conservative field',
      'Harmonic field',
    ],
    guide: {
      summary:
        'A solenoidal field has zero divergence, while a conservative field is the gradient of a scalar potential and is therefore irrotational. A field that is both conservative and solenoidal has a harmonic potential satisfying Laplace’s equation.',
      keyIdea:
        'The converse passage from zero curl to a potential requires attention to the topology of the domain, such as simple connectedness.',
      formula:
        '\\mathbf F=\\nabla\\varphi,\\qquad\\Delta\\varphi=0',
      question:
        'Why may the equality curl F = 0 be insufficient for the existence of a global potential in a multiply connected domain?',
    },
    detail: {
      hook:
        'Some fields have no sources, while others are determined entirely by potential energy. Their intersection gives harmonic fields with an especially rigid structure.',
      explanation: [
        'A solenoidal field satisfies div F = 0, while a conservative field has the form F = ∇φ and therefore has zero curl. In a simply connected domain, the condition curl F = 0 also guarantees the existence of a potential for a smooth field.',
        'If a conservative field is also solenoidal, then Δφ = div grad φ = 0. Such a potential is called a harmonic function, and the corresponding field is called harmonic.',
      ],
      terms: [
        {
          term: 'Solenoidal field',
          definition:
            'A vector field with zero divergence throughout the domain under consideration.',
        },
        {
          term: 'Conservative field',
          definition:
            'A field equal to the gradient of some scalar potential.',
        },
        {
          term: 'Harmonic function',
          definition:
            'A twice-differentiable function satisfying Laplace’s equation Δφ = 0.',
        },
        {
          term: 'Simply connected domain',
          definition:
            'A domain in which every closed contour can be continuously contracted to a point while remaining inside the domain.',
        },
      ],
      example: {
        title: 'A harmonic field in the plane',
        problem:
          'Determine whether the field F = (x, −y, 0) is conservative and solenoidal.',
        steps: [
          'The curl of the field is zero, and a potential is φ = (x² − y²)/2.',
          'The divergence is 1 − 1 + 0 = 0.',
          'Consequently, Δφ = 0 and the field is harmonic.',
        ],
        answer:
          'The field is both conservative and solenoidal; its potential is harmonic.',
      },
      pitfall:
        'A common mistake is to conclude unconditionally from curl F = 0 that a global potential exists. Check the smoothness of the field and the topology of the domain, especially the presence of holes.',
      practice: {
        question:
          'Is the field F = (−y, x, 0) solenoidal and conservative throughout space?',
        answer:
          'Its divergence is zero, so it is solenoidal, but its curl is (0, 0, 2), so the field is not conservative.',
      },
    },
  },
  74: {
    title: 'Functions of a Complex Variable',
    topics: [
      'Fundamental concepts',
      'Limit and continuity of a function of a complex variable',
      'Principal elementary functions of a complex variable',
      'Differentiation of a function of a complex variable. The Cauchy–Riemann equations (Euler–d’Alembert conditions)',
      'Analytic function. Differential',
      'Geometric meaning of the modulus and argument of the derivative. Introduction to conformal mappings',
    ],
    guide: {
      summary:
        'A function of a complex variable is written as f(z) = u(x,y) + iv(x,y), and its complex derivative must be the same for every direction of the increment. If the first partial derivatives are continuous on an open domain and the Cauchy–Riemann equations hold throughout that domain, the function is analytic there; a nonzero derivative locally preserves angles.',
      keyIdea:
        'Complex differentiability is substantially more restrictive than real differentiability of a function of two variables.',
      formula:
        'u_x=v_y,\\qquad u_y=-v_x',
      question:
        'Why must the limit of the difference quotient be checked along different directions when computing a complex derivative?',
    },
    detail: {
      hook:
        'In the complex plane, the existence of a single derivative constrains a function more strongly than all ordinary partial derivatives. Analyticity and angle preservation grow out of this rigidity.',
      explanation: [
        'A function f(z) = u(x, y) + iv(x, y) is complex differentiable at z₀ if its difference quotient has one limit independent of the direction of Δz. If the first partial derivatives of u and v are continuous in a neighborhood of z₀, the Cauchy–Riemann equations uₓ = vᵧ and uᵧ = −vₓ at z₀ are sufficient for complex differentiability at that point.',
        'A function is analytic on an open domain if it is complex differentiable at every point of that domain. Thus, when the first partial derivatives are continuous, the Cauchy–Riemann equations must hold throughout the domain rather than at just one point. An analytic function with nonzero derivative locally preserves angles and defines a conformal mapping.',
      ],
      terms: [
        {
          term: 'Complex derivative',
          definition:
            'The limit of the quotient (f(z + Δz) − f(z))/Δz, which is the same for all directions as Δz → 0.',
        },
        {
          term: 'Cauchy–Riemann equations',
          definition:
            'The relations uₓ = vᵧ and uᵧ = −vₓ between the real and imaginary parts of a function.',
        },
        {
          term: 'Analytic function',
          definition:
            'A function that is complex differentiable at every point of some open domain.',
        },
        {
          term: 'Conformal mapping',
          definition:
            'A local mapping that preserves angles and their orientation at points where the derivative is nonzero.',
        },
      ],
      example: {
        title: 'Analyticity of the square function',
        problem: 'Use the Cauchy–Riemann equations to test f(z) = z² and find its derivative.',
        steps: [
          'Expand z² to obtain u = x² − y² and v = 2xy.',
          'We have uₓ = 2x = vᵧ and uᵧ = −2y = −vₓ.',
          'The equations hold throughout the plane, and f′(z) = 2z.',
        ],
        answer: 'The function is analytic on the entire complex plane, and f′(z) = 2z.',
      },
      pitfall:
        'A common mistake is to check the Cauchy–Riemann equations at only one point and declare the function analytic. Analyticity requires the equations to hold in an open neighborhood, together with sufficient regularity of the partial derivatives.',
      practice: {
        question: 'Where is the function f(z) = z̄ complex differentiable?',
        answer:
          'Nowhere, because uₓ = 1 while vᵧ = −1, so the first Cauchy–Riemann equation fails at every point.',
      },
    },
  },
  75: {
    title: 'Integration of a Function of a Complex Variable',
    topics: [
      'Definition, properties, and rules for evaluating the integral',
      "Cauchy's theorem. Antiderivative and indefinite integral. The Newton–Leibniz formula",
      "Cauchy integral. Cauchy's integral formula",
    ],
    guide: {
      summary:
        'The integral of a complex function is evaluated along an oriented contour through its parametrization. If a function is analytic on a contour and throughout the region it encloses, Cauchy’s theorem gives a zero integral and Cauchy’s integral formula reconstructs interior values; for a general closed contour, its winding number must be included.',
      keyIdea:
        'Analyticity turns data on the boundary of a domain into information about the values of the function inside it.',
      formula:
        '\\oint_\\gamma\\frac{f(z)}{z-z_0}\\,dz=2\\pi i\\,\\operatorname{Ind}(\\gamma,z_0)f(z_0)',
      question:
        'What conditions allow one to conclude that the integral of an analytic function around a closed contour is zero?',
    },
    detail: {
      hook:
        'An integral around a closed contour can recover the value of a function inside it. This connection between boundary and interior is one of the central ideas of complex analysis.',
      explanation: [
        'The complex integral along a parametrized contour γ is evaluated as ∫f(z(t))z′(t)dt and depends on orientation. If the function has an antiderivative, the integral depends only on the endpoints of the path.',
        'Let γ be a positively oriented simple closed piecewise-smooth contour, and let f be analytic on an open set containing γ and its entire interior. Cauchy’s theorem then gives ∮γf(z)dz = 0, while for an interior point z₀, Cauchy’s integral formula expresses f(z₀) through ∮γf(z)/(z − z₀)dz. For a general closed contour, the right-hand side includes the winding number Ind(γ, z₀).',
      ],
      terms: [
        {
          term: 'Complex contour',
          definition:
            'An oriented piecewise-smooth curve in the complex plane.',
        },
        {
          term: 'Antiderivative',
          definition:
            'An analytic function F whose derivative is the given function f.',
        },
        {
          term: "Cauchy's theorem",
          definition:
            'The statement that the integral is zero when the function is analytic on a simple closed contour and throughout the region enclosed by it.',
        },
        {
          term: "Cauchy's integral formula",
          definition:
            'The formula f(z₀) = 1/(2πi) ∮f(z)/(z − z₀)dz for a point inside a positively oriented simple contour when f is analytic on and inside it; a general contour requires its winding number.',
        },
      ],
      example: {
        title: 'An integral with the simple Cauchy kernel',
        problem:
          'Evaluate ∮ dz/(z − 1) counterclockwise around the circle |z| = 2.',
        steps: [
          'The point z = 1 lies inside the circle.',
          'In Cauchy’s integral formula, take f(z) = 1 and z₀ = 1.',
          'The integral is 2πi·f(1) = 2πi.',
        ],
        answer: 'The value of the integral is 2πi.',
      },
      pitfall:
        'A common mistake is to apply Cauchy’s formula without checking the location of the singularity and the orientation. Make sure the point lies inside the contour, no singularity lies on the contour, and the sign is consistent with the direction of traversal.',
      practice: {
        question:
          'What is ∮ dz/(z − 2) counterclockwise around the unit circle?',
        answer:
          'It is zero because the function 1/(z − 2) is analytic inside and on the unit circle.',
      },
    },
  },
  76: {
    title: 'Series in the Complex Plane',
    topics: [
      'Numerical series',
      'Power series',
      'Taylor series',
      'Zeros of an analytic function',
      'Laurent series',
      'Classification of singular points. Relationship between a zero and a pole of a function',
    ],
    guide: {
      summary:
        'Numerical and power series in the complex plane obey convergence criteria, and a power series converges inside a disk. A Laurent series converges in an annulus, and its principal part classifies an isolated singularity as removable, a pole, or essential.',
      keyIdea:
        'The negative powers in a Laurent series completely describe the nature of an isolated singularity.',
      formula:
        'f(z)=\\sum_{n=-\\infty}^{\\infty}c_n(z-z_0)^n',
      question:
        'How can the principal part of a Laurent series be used to distinguish a removable singularity, a pole, and an essential singularity?',
    },
    detail: {
      hook:
        'The behavior of a function near a singular point is encoded in the powers of its local series. It is enough to inspect the negative-power part to distinguish a removable singularity, a pole, and an essential singularity.',
      explanation: [
        'A complex power series converges inside a disk, and an analytic function has a Taylor expansion there. A zero of order m satisfies f(z₀) = f′(z₀) = … = f⁽ᵐ⁻¹⁾(z₀) = 0 and f⁽ᵐ⁾(z₀) ≠ 0.',
        'In an annulus around an isolated singularity, the function is represented by a Laurent series with positive and negative powers. A finite principal part means a pole, the absence of negative powers means a removable singularity, and an infinite principal part means an essential singularity.',
      ],
      terms: [
        {
          term: 'Laurent series',
          definition:
            'A two-sided power series Σcₙ(z − z₀)ⁿ that permits negative exponents.',
        },
        {
          term: 'Principal part',
          definition:
            'The sum of the terms with negative powers in a Laurent series.',
        },
        {
          term: 'Pole of order m',
          definition:
            'An isolated singularity whose Laurent expansion has a finite principal part with leading term c₋ₘ(z − z₀)⁻ᵐ, where c₋ₘ ≠ 0.',
        },
        {
          term: 'Essential singularity',
          definition:
            'An isolated singularity with infinitely many nonzero negative-power terms.',
        },
      ],
      example: {
        title: 'Expansion near a simple pole',
        problem:
          'Expand f(z) = 1/(z(z − 1)) about zero in the annulus 0 < |z| < 1.',
        steps: [
          'Rewrite the function as −1/(z(1 − z)).',
          'Use the geometric series 1/(1 − z) = 1 + z + z² + … for |z| < 1.',
          'This gives f(z) = −1/z − 1 − z − z² − …',
        ],
        answer:
          'There is a simple pole at z = 0, and the coefficient of 1/z is −1.',
      },
      pitfall:
        'A common mistake is to seek a single Laurent expansion without specifying the region. First state the annulus of convergence, because the same function can have different expansions in different annuli.',
      practice: {
        question: 'How is z = 0 classified for the function e^(1/z)?',
        answer:
          'It is an essential singularity because the series contains infinitely many negative powers.',
      },
    },
  },
  77: {
    title: 'Residue of a Function',
    topics: [
      'The concept of a residue and the residue theorem',
      'Calculation of residues. Application of residues to the evaluation of integrals',
    ],
    guide: {
      summary:
        'The residue of a function at an isolated singularity is the coefficient of (z − z₀)⁻¹ in its Laurent series. For a meromorphic function with no singularity on a closed contour, the residue theorem expresses the integral through the enclosed residues weighted by their winding numbers.',
      keyIdea:
        'For a contour integral, all local information about an isolated singularity is compressed into a single coefficient.',
      formula:
        '\\oint_\\gamma f(z)\\,dz=2\\pi i\\sum_k\\operatorname{Ind}(\\gamma,z_k)\\operatorname{Res}_{z=z_k}f',
      question:
        'How can the residue at a simple pole be found without constructing the full Laurent series?',
    },
    detail: {
      hook:
        'For a contour integral, the entire complexity of a singular point often reduces to a single coefficient. Residues turn a traversal of the contour into a finite sum of local contributions.',
      explanation: [
        'The residue of a function at an isolated singularity z₀ is the coefficient c₋₁ in its Laurent series. At a simple pole, it can often be found from the limit lim z→z₀ (z − z₀)f(z).',
        'Suppose f is meromorphic inside and on a positively oriented simple closed piecewise-smooth contour γ, has finitely many poles inside, and has no singularity on γ. Then the integral equals 2πi times the sum of the enclosed residues. For a general closed contour, each residue is multiplied by Ind(γ, zₖ); singularities on the contour are not covered by the usual theorem.',
      ],
      terms: [
        {
          term: 'Residue',
          definition:
            'The coefficient of (z − z₀)⁻¹ in the Laurent expansion of a function about an isolated singularity.',
        },
        {
          term: 'Simple pole',
          definition:
            'A pole of order one, for which the limit (z − z₀)f(z) usually gives the residue.',
        },
        {
          term: 'Residue theorem',
          definition:
            'For a meromorphic function with no singularity on the contour, the formula that expresses a contour integral through enclosed residues weighted by their winding numbers.',
        },
      ],
      example: {
        title: 'Two poles inside a circle',
        problem:
          'Evaluate ∮ eᶻ/(z(z − 1))dz counterclockwise around the circle |z| = 2.',
        steps: [
          'The simple poles z = 0 and z = 1 lie inside the contour.',
          'Their residues are −1 and e, respectively.',
          'The sum of the residues is e − 1, so the integral is 2πi(e − 1).',
        ],
        answer: 'The value of the integral is 2πi(e − 1).',
      },
      pitfall:
        'A common mistake is to sum every pole of the function regardless of the contour. Plot the singularities in the plane, exclude points on the boundary, and account for the orientation of traversal.',
      practice: {
        question: 'What is the residue of sin z/z² at z = 0?',
        answer:
          'It is 1 because sin z/z² = 1/z − z/6 + …',
      },
    },
  },
  78: {
    title: 'Laplace Transform',
    topics: [
      'Original functions and their transforms',
      'Properties of the Laplace transform',
      'Table of original functions and transforms',
    ],
    guide: {
      summary:
        'The Laplace transform maps a function of time on the half-line to a function of a complex parameter within a region of convergence. Linearity and the shift, convolution, and differentiation theorems turn many operations on original functions into algebraic operations on their transforms.',
      keyIdea:
        'An integral transform replaces differentiation and convolution with simpler operations in the transform domain.',
      formula:
        'F(s)=\\mathcal L\\{f(t)\\}(s)=\\int_0^\\infty e^{-st}f(t)\\,dt',
      question:
        'What growth conditions on a function ensure that its Laplace transform exists for sufficiently large real part of s?',
    },
    detail: {
      hook:
        'A differential equation can be simplified by replacing a function with its integral transform. The Laplace transform converts derivatives and convolutions into convenient algebraic expressions.',
      explanation: [
        'The Laplace transform is defined by the integral F(s) = ∫₀∞ e^(−st)f(t)dt in the half-plane where it converges. Piecewise continuity and exponential order of the function provide standard sufficient conditions for existence.',
        'Linearity allows sums to be transformed term by term. For the unilateral transform, a delay must include the Heaviside function: for a > 0, L{H(t − a)f(t − a)} = e^(−as)F(s); without H, this identity is generally false. Convolution becomes multiplication of transforms.',
      ],
      terms: [
        {
          term: 'Original function',
          definition:
            'A function f(t) on the half-line t ≥ 0 to which the Laplace transform is applied.',
        },
        {
          term: 'Transform',
          definition:
            'The function F(s) obtained by the integral Laplace transform.',
        },
        {
          term: 'Exponential order',
          definition:
            'The growth condition |f(t)| ≤ Meᵃᵗ for all sufficiently large t.',
        },
        {
          term: 'Convolution',
          definition:
            'The function (f ∗ g)(t) = ∫₀ᵗ f(τ)g(t − τ)dτ, whose transform is F(s)G(s).',
        },
      ],
      example: {
        title: 'Transform of a quadratic function',
        problem: 'Find the Laplace transform of f(t) = t².',
        steps: [
          'The table gives L{1} = 1/s.',
          'Apply the property L{t f(t)} = −dF/ds twice.',
          'This gives L{t²} = 2/s³ for Re s > 0.',
        ],
        answer: 'The transform is 2/s³.',
      },
      pitfall:
        'A common mistake is to write only the transform formula and omit its region of convergence. Check the behavior of the original function at infinity and state the admissible half-plane for s.',
      practice: {
        question: 'What is L{eᵃᵗ}?',
        answer: 'It is 1/(s − a) for Re s > Re a.',
      },
    },
  },
  79: {
    title: 'Inverse Laplace Transform',
    topics: [
      'Heaviside expansion theorem',
      'Bromwich inversion formula',
    ],
    guide: {
      summary:
        'The inverse Laplace transform reconstructs the original function from its transform using an integral along a vertical line or methods based on decomposition and residues. The integration line is chosen inside the region of convergence, to the right of its abscissa; when a meromorphic continuation exists, it consequently lies to the right of the transform’s singularities.',
      keyIdea:
        'Decomposing a rational transform into partial fractions often replaces direct evaluation of the inversion integral.',
      formula:
        'f(t)=\\frac{1}{2\\pi i}\\int_{\\gamma-i\\infty}^{\\gamma+i\\infty}e^{st}F(s)\\,ds',
      question:
        'Why must the line Re s = γ in the inversion integral lie in the region of convergence of the transform?',
    },
    detail: {
      hook:
        'Obtaining a transform is usually easier than recovering the original function from it. The inverse Laplace transform reconstructs the original function from poles, a transform table, and the inversion integral.',
      explanation: [
        'The Bromwich inversion formula integrates eˢᵗF(s) along a vertical line Re s = γ in the region of convergence, so γ is chosen greater than the abscissa of convergence. If F has a meromorphic continuation to the left, this line lies to the right of its singularities. Under standard conditions, the formula reconstructs the original function at points of continuity and the half-sum of the one-sided limits at a jump.',
        'For rational transforms, partial-fraction decomposition and comparison with a table are more practical. Repeated and complex-conjugate poles give rise to polynomial factors and oscillatory functions, respectively.',
      ],
      terms: [
        {
          term: 'Inverse Laplace transform',
          definition:
            'The operation of reconstructing the original function f(t) from its transform F(s).',
        },
        {
          term: 'Inversion integral',
          definition:
            'A complex integral along a vertical line that implements the Bromwich inversion formula.',
        },
        {
          term: 'Heaviside expansion theorem',
          definition:
            'A formula that reconstructs the inverse Laplace transform of a rational function from the contributions of its poles.',
        },
        {
          term: 'Partial fraction',
          definition:
            'A term in the decomposition of a rational function that can be matched directly with a tabulated transform.',
        },
      ],
      example: {
        title: 'Inversion of a rational transform',
        problem: 'Find the original function corresponding to F(s) = 1/(s(s + 2)).',
        steps: [
          'Decompose into partial fractions: F(s) = 1/(2s) − 1/(2(s + 2)).',
          'Use the pairs L⁻¹{1/s} = 1 and L⁻¹{1/(s + 2)} = e^(−2t).',
          'Combine the resulting original functions.',
        ],
        answer: 'f(t) = (1 − e^(−2t))/2.',
      },
      pitfall:
        'A common mistake is to lose coefficients during decomposition or mishandle the shift s + a. After inversion, take the forward transform of the answer and compare it with the original F(s).',
      practice: {
        question: 'What original function corresponds to s/(s² + ω²)?',
        answer: 'The original function is cos(ωt).',
      },
    },
  },
  80: {
    title: 'Operational Method for Solving Linear Differential Equations and Their Systems',
    topics: [],
    guide: {
      summary:
        'The operational method converts a sufficiently regular linear initial-value problem for a differential equation or system into an algebraic problem for the transforms of the unknown functions. Right-hand initial values enter the transforms of the derivatives, after which the solution is obtained algebraically and returned by the inverse Laplace transform.',
      keyIdea:
        'The Laplace transform simultaneously incorporates the differential operator and the initial data.',
      formula:
        '\\mathcal L\\{y^{(n)}\\}=s^nY(s)-\\sum_{k=0}^{n-1}s^{n-1-k}y^{(k)}(0+)',
      question:
        'How do the initial conditions appear in the algebraic equation for the transform of the solution?',
    },
    detail: {
      hook:
        'The Laplace transform solves an initial-value problem together with its initial conditions. After transformation, the differential problem becomes a system of algebraic equations.',
      explanation: [
        'If y, …, y⁽ⁿ⁻¹⁾ are locally absolutely continuous, have right-hand initial values, and together with y⁽ⁿ⁾ have suitable exponential order, then L{y′} = sY(s) − y(0+), while a derivative of order n introduces y⁽ᵏ⁾(0+) for 0 ≤ k < n. Thus, the initial conditions enter the transform before the algebraic equation is solved.',
        'After transforming the equation, one finds Y(s), decomposes it into recognizable parts, and applies the inverse transform. For a system, the same process is carried out with several transforms or in matrix form.',
      ],
      terms: [
        {
          term: 'Operational method',
          definition:
            'A method for solving a differential problem by means of the forward and inverse Laplace transforms.',
        },
        {
          term: 'Initial-value problem',
          definition:
            'A differential equation together with initial values of the unknown function and its derivatives.',
        },
        {
          term: 'Algebraic transform equation',
          definition:
            'An equation for Y(s) obtained after transforming a differential equation.',
        },
        {
          term: 'Transfer function',
          definition:
            'The ratio of the output transform to the input transform of a linear system under zero initial conditions.',
        },
      ],
      example: {
        title: 'A first-order linear initial-value problem',
        problem: 'Solve y′ + y = 1 with y(0) = 0 by the operational method.',
        steps: [
          'Transformation gives sY(s) + Y(s) = 1/s.',
          'Hence Y(s) = 1/(s(s + 1)).',
          'Decompose Y(s) = 1/s − 1/(s + 1).',
          'The inverse transform gives y(t) = 1 − e^(−t).',
        ],
        answer: 'The solution of the problem is y(t) = 1 − e^(−t).',
      },
      pitfall:
        'A common mistake is to replace L{y′} by sY and lose the initial value. Write the complete transform formula for every derivative before carrying out algebraic simplifications.',
      practice: {
        question:
          'Use the Laplace transform to solve y″ + y = 0 with y(0) = 0 and y′(0) = 1.',
        answer:
          'One obtains Y(s) = 1/(s² + 1), so y(t) = sin t.',
      },
    },
  },
};
