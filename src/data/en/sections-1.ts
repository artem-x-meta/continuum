import type { EnglishSectionBundle } from './types';

export const englishSections1: Record<number, EnglishSectionBundle> = {
  1: {
    title: 'Matrices',
    topics: ['Basic Concepts', 'Matrix Operations'],
    guide: {
      summary: 'A matrix is a rectangular array of elements whose dimensions are specified by its number of rows and columns. Only matrices of the same dimensions can be added, while the product AB is defined when the number of columns of A equals the number of rows of B.',
      keyIdea: 'Matrix operations encode transformations of data, and the order of the factors generally matters.',
      formula: '(AB)_{ij}=\\sum_{k=1}^{n}a_{ik}b_{kj}',
      question: 'Why can the matrix product AB exist while the product BA does not?',
    },
    detail: {
      hook: 'An expense table, the coefficients of a system, and the pixels of an image may look different, yet they are all processed in the same language. Matrices give that language rigorous rules.',
      explanation: [
        'An m×n matrix A consists of m rows and n columns. The element aᵢⱼ is located in row i and column j. Two matrices are equal when their dimensions agree and all corresponding elements are equal.',
        'Addition and scalar multiplication are performed element by element. The product AB is defined when the number of columns of A equals the number of rows of B, and each entry of the result is obtained by taking the dot product of a row of A with a column of B. In general, AB and BA are different, or one of these products is undefined.',
      ],
      terms: [
        { term: 'Matrix', definition: 'A rectangular array of elements with a fixed number of rows and columns.' },
        { term: 'Matrix dimensions', definition: 'The ordered pair m×n, where m is the number of rows and n is the number of columns.' },
        { term: 'Transpose', definition: 'The operation that replaces the rows of a matrix with its columns, denoted by Aᵀ.' },
        { term: 'Identity matrix', definition: 'A square matrix with ones on the main diagonal and zeros everywhere else.' },
      ],
      example: {
        title: 'Product of Two 2×2 Matrices',
        problem: 'Compute AB for A = [[1, 2], [−1, 3]] and B = [[2, 0], [1, 4]].',
        steps: [
          'The first row of A and the first column of B give 1·2 + 2·1 = 4; with the second column, they give 1·0 + 2·4 = 8.',
          'The second row of A and the first column of B give −1·2 + 3·1 = 1; with the second column, they give −1·0 + 3·4 = 12.',
          'Place the four results in the rows and columns for which they were computed.',
        ],
        answer: 'AB = [[4, 8], [1, 12]].',
      },
      pitfall: 'A common mistake is to multiply corresponding entries instead of multiplying a row by a column. Before calculating, write down the dimensions of the result and explicitly select the required row and column for each of its entries.',
      practice: {
        question: 'Find A + B if A = [[2, −1], [0, 3]] and B = [[1, 4], [5, −2]].',
        answer: 'A + B = [[3, 3], [5, 1]].',
      },
    },
  },
  2: {
    title: 'Determinants',
    topics: ['Basic Concepts', 'Properties of Determinants'],
    guide: {
      summary: 'A determinant is a number associated with a square matrix that characterizes the change in oriented volume under the corresponding linear transformation. Interchanging two rows changes its sign; it is linear in each row when the others are fixed; and it is zero when the rows are linearly dependent.',
      keyIdea: 'A nonzero determinant means that the linear transformation does not collapse space into a lower dimension.',
      formula: '\\det\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix}=ad-bc',
      question: 'How does the determinant change if one row of the matrix is multiplied by a scalar λ?',
    },
    detail: {
      hook: 'A single number can reveal whether a matrix preserves volume and whether the corresponding transformation can be reversed. That number is the determinant.',
      explanation: [
        'The determinant is defined only for a square matrix. For a 2×2 matrix it equals ad−bc; in higher dimensions it can be computed by cofactor expansion along a row or column, or by reducing the matrix to triangular form.',
        'Interchanging two rows changes the sign of the determinant, multiplying a row by λ multiplies the determinant by λ, and adding a multiple of one row to another leaves it unchanged. The determinant is zero if and only if the rows, and therefore the columns, are linearly dependent.',
      ],
      terms: [
        { term: 'Determinant', definition: 'A scalar characteristic of a square matrix, denoted by det A or |A|.' },
        { term: 'Minor of an entry', definition: 'The determinant of the matrix obtained by deleting the row and column containing that entry.' },
        { term: 'Cofactor', definition: 'The number Aᵢⱼ = (−1)ⁱ⁺ʲMᵢⱼ, which combines the minor with the sign determined by its position.' },
      ],
      example: {
        title: 'Expansion Along a Convenient Row',
        problem: 'Find the determinant of [[1, 2, 0], [3, −1, 1], [2, 0, 4]].',
        steps: [
          'Expand along the first row: the third term vanishes because its coefficient is zero.',
          'The first minor is (−1)·4 − 1·0 = −4.',
          'The second minor is 3·4 − 1·2 = 10, and its sign in the expansion is negative.',
          'Thus det A = 1·(−4) − 2·10 = −24.',
        ],
        answer: 'The determinant is −24.',
      },
      pitfall: 'When expanding a determinant, it is easy to forget the checkerboard pattern of signs +, −, +. Write the factor (−1)ⁱ⁺ʲ before computing each minor, especially when expanding along a row other than the first.',
      practice: {
        question: 'Compute the determinant of [[4, −2], [3, 5]].',
        answer: 'det A = 4·5 − (−2)·3 = 26.',
      },
    },
  },
  3: {
    title: 'Nonsingular Matrices',
    topics: ['Basic Concepts', 'Inverse Matrix', 'Rank of a Matrix'],
    guide: {
      summary: 'A square matrix is nonsingular if and only if its determinant is nonzero, and only then does it have a unique inverse. The rank of a matrix is the largest order of any nonzero minor and, equivalently, the dimension of its row space or column space.',
      keyIdea: 'Invertibility, full rank, and a nonzero determinant are three equivalent criteria for a nonsingular square matrix.',
      formula: 'A^{-1}=\\frac{1}{\\det A}\\operatorname{adj}A,\\quad \\det A\\ne0',
      question: 'What must the rank of an n×n matrix be for the matrix to have an inverse?',
    },
    detail: {
      hook: 'Can the input be recovered uniquely after a matrix transformation? Nonsingularity, the inverse matrix, and rank provide a complete answer.',
      explanation: [
        'A square matrix A is nonsingular if det A ≠ 0. In that case there is a unique matrix A⁻¹ such that AA⁻¹ = A⁻¹A = E, and it can be found by Gaussian elimination or from the adjugate matrix.',
        'The rank is the maximum number of linearly independent rows or columns and is unchanged by elementary row operations. For an n×n matrix, the conditions det A ≠ 0, rank A = n, and the existence of A⁻¹ are equivalent.',
      ],
      terms: [
        { term: 'Nonsingular matrix', definition: 'A square matrix with a nonzero determinant.' },
        { term: 'Inverse matrix', definition: 'A matrix A⁻¹ whose product with A in either order is the identity matrix.' },
        { term: 'Rank of a matrix', definition: 'The dimension of the span of its rows, which equals the dimension of the span of its columns.' },
        { term: 'Adjugate matrix', definition: 'The transpose of the matrix of cofactors of the entries of the original matrix.' },
      ],
      example: {
        title: 'Inverse of a 2×2 Matrix',
        problem: 'Find the inverse of A = [[2, 1], [5, 3]].',
        steps: [
          'Compute det A = 2·3 − 1·5 = 1, so the matrix is nonsingular.',
          'Interchange the diagonal entries and change the signs of the off-diagonal entries: [[3, −1], [−5, 2]].',
          'Divide the resulting matrix by det A = 1.',
          'A multiplication check gives AA⁻¹ = [[1, 0], [0, 1]].',
        ],
        answer: 'A⁻¹ = [[3, −1], [−5, 2]].',
      },
      pitfall: 'Do not apply the inverse-matrix formula without first checking the determinant. If det A = 0, division by it is invalid and the inverse matrix does not exist.',
      practice: {
        question: 'Find the rank of [[1, 2], [2, 4]].',
        answer: 'The rank is 1: the second row is twice the first, but the matrix is not the zero matrix.',
      },
    },
  },
  4: {
    title: 'Systems of Linear Equations',
    topics: [
      'Basic Concepts',
      'Solving Systems of Linear Equations. The Rouché–Capelli Theorem',
      'Solving Nonsingular Linear Systems. Cramer\'s Rule',
      'Solving Systems of Linear Equations by Gaussian Elimination',
      'Systems of Homogeneous Linear Equations',
    ],
    guide: {
      summary: 'A system Ax=b is consistent if and only if the rank of its coefficient matrix equals the rank of its augmented matrix. Gaussian elimination applies to any linear system, whereas Cramer\'s rule requires a square nonsingular coefficient matrix.',
      keyIdea: 'Elementary row operations preserve the solution set and reduce the system to a form that reveals consistency and the number of free variables.',
      formula: '\\operatorname{rank}A=\\operatorname{rank}(A\\mid b)',
      question: 'Under what conditions does a consistent system with n unknowns have a unique solution?',
    },
    detail: {
      hook: 'A system of equations may have one solution, infinitely many solutions, or no solution at all. Linear algebra can identify the case before lengthy computation begins.',
      explanation: [
        'A system of m linear equations in n unknowns is written as Ax = b. By the Rouché–Capelli theorem, it is consistent exactly when rank A = rank(A|b), and a consistent system has n − rank A free variables.',
        'Gaussian elimination uses elementary row operations to reduce the augmented matrix to row-echelon form. For a square system with det A ≠ 0, the solution is unique and can also be found by Cramer\'s rule or as x = A⁻¹b.',
      ],
      terms: [
        { term: 'Consistent system', definition: 'A system of equations that has at least one solution.' },
        { term: 'Augmented matrix', definition: 'The matrix (A|b) formed by appending the column of right-hand sides to the coefficient matrix.' },
        { term: 'Free variable', definition: 'An unknown that may independently be assigned admissible values in the general solution.' },
        { term: 'Homogeneous system', definition: 'A system Ax = 0, which always has the zero solution.' },
      ],
      example: {
        title: 'Solving by Elimination',
        problem: 'Solve the system x + y = 5, 2x − y = 1.',
        steps: [
          'Add the equations to eliminate y: 3x = 6.',
          'Find x = 2.',
          'Substitute into the first equation: 2 + y = 5, so y = 3.',
          'Check the second equation: 2·2 − 3 = 1.',
        ],
        answer: 'The unique solution is x = 2, y = 3.',
      },
      pitfall: 'When transforming a row of an augmented matrix, one may change only the coefficients and forget the right-hand side. Apply every row operation to the entire row, including the column b.',
      practice: {
        question: 'Solve the system x + 2y = 7, 3x − y = 7.',
        answer: 'x = 3, y = 2.',
      },
    },
  },
  5: {
    title: 'Vectors',
    topics: [
      'Basic Concepts',
      'Linear Operations on Vectors',
      'Projection of a Vector onto an Axis',
      'Decomposition of a Vector Along the Unit Vectors of the Coordinate Axes. Vector Magnitude. Direction Cosines',
      'Operations on Vectors Given by Their Projections',
    ],
    guide: {
      summary: 'A nonzero vector has magnitude and direction, while the zero vector has zero magnitude; in a chosen basis, every vector is uniquely determined by its coordinates. Vector addition and scalar multiplication are performed coordinatewise; the Pythagorean coordinate formula for magnitude applies in an orthonormal Cartesian basis.',
      keyIdea: 'Choosing a basis turns geometric operations on vectors into computations with their coordinates.',
      formula: '\\vec a=a_1\\vec e_1+\\cdots+a_n\\vec e_n',
      question: 'How is the magnitude of a vector found from its Cartesian coordinates?',
    },
    detail: {
      hook: 'A drone\'s displacement, a force, and a velocity all have magnitude and direction. Vectors turn such directed data into convenient coordinate calculations.',
      explanation: [
        'A free vector may be translated parallel to itself without changing it, and in a chosen basis it is uniquely specified by its coordinates. Addition and scalar multiplication are performed coordinatewise. In an orthonormal Cartesian basis, the magnitude of a = (a₁,a₂,a₃) is √(a₁²+a₂²+a₃²); in an arbitrary basis, the magnitude also depends on the Gram matrix.',
        'A projection onto an axis is a signed number that describes the contribution of the vector in the selected direction. In an orthonormal Cartesian coordinate system, the direction cosines of a nonzero vector are the ratios of its coordinates to its magnitude and satisfy cos²α + cos²β + cos²γ = 1.',
      ],
      terms: [
        { term: 'Free vector', definition: 'A class of equally directed segments of the same length, independent of an initial point.' },
        { term: 'Basis', definition: 'A linearly independent system of vectors in terms of which every vector in the space has a unique representation.' },
        { term: 'Vector coordinates', definition: 'The coefficients in the decomposition of a vector with respect to a chosen basis.' },
        { term: 'Projection onto an axis', definition: 'A scalar equal to the vector\'s magnitude multiplied by the cosine of its oriented angle with the axis.' },
      ],
      example: {
        title: 'Vector Between Two Points',
        problem: 'For A(1, −2, 3) and B(4, 2, 1), find the vector AB and its magnitude.',
        steps: [
          'Subtract the coordinates of the initial point from those of the terminal point: AB = (4−1, 2−(−2), 1−3).',
          'Thus AB = (3, 4, −2).',
          'Compute the magnitude: |AB| = √(3² + 4² + (−2)²) = √29.',
        ],
        answer: 'AB = (3, 4, −2), |AB| = √29.',
      },
      pitfall: 'For the vector AB, it is easy to subtract the coordinates in the reverse order and obtain BA. Keep the rule “terminal point minus initial point” in mind, and verify that reversing the points changes the sign of every coordinate.',
      practice: {
        question: 'Find 2a − b for a = (1, −2, 3) and b = (4, 0, −1).',
        answer: '2a − b = (−2, −4, 7).',
      },
    },
  },
  6: {
    title: 'The Dot Product of Vectors and Its Properties',
    topics: [
      'Definition of the Dot Product',
      'Properties of the Dot Product',
      'Coordinate Formula for the Dot Product',
      'Selected Applications of the Dot Product',
    ],
    guide: {
      summary: 'The dot product of two vectors equals the product of their magnitudes and the cosine of the angle between them; in an orthonormal basis, it is computed as the sum of the products of corresponding coordinates. It can be used to find angles, orthogonal projections, and the work done by a constant force.',
      keyIdea: 'Two nonzero vectors are perpendicular if and only if their dot product is zero.',
      formula: '\\vec a\\cdot\\vec b=\\sum_{i=1}^{n}a_i b_i=|\\vec a|\\,|\\vec b|\\cos\\varphi',
      question: 'How can the dot product be used to determine the angle between two nonzero vectors?',
    },
    detail: {
      hook: 'A single calculation distinguishes an acute angle from an obtuse one and tests perpendicularity without a protractor. That calculation is the dot product.',
      explanation: [
        'In an orthonormal basis, the dot product is a·b = a₁b₁ + a₂b₂ + a₃b₃. Geometrically, it equals |a||b|cos φ, so for nonzero vectors it determines the angle between them.',
        'The equation a·b = 0 is the criterion for two nonzero vectors to be perpendicular. The scalar projection of a onto the direction of a unit vector e is a·e, and the work done by a constant force F over a displacement s is F·s.',
      ],
      terms: [
        { term: 'Dot product', definition: 'The scalar a·b, equal to the sum of the products of corresponding coordinates in an orthonormal basis.' },
        { term: 'Orthogonality', definition: 'Perpendicularity of vectors; for nonzero vectors, it is equivalent to a·b = 0.' },
        { term: 'Scalar projection', definition: 'The signed length of the projection of a vector onto a specified unit direction.' },
      ],
      example: {
        title: 'Angle from Coordinates',
        problem: 'Determine whether the angle between a = (1, 2, −1) and b = (2, 0, 3) is acute or obtuse, and find its cosine.',
        steps: [
          'Compute a·b = 1·2 + 2·0 + (−1)·3 = −1.',
          'Find the magnitudes |a| = √6 and |b| = √13.',
          'Thus cos φ = −1/(√6·√13) = −1/√78.',
          'The cosine is negative, so the angle is obtuse.',
        ],
        answer: 'cos φ = −1/√78, and the angle between the vectors is obtuse.',
      },
      pitfall: 'The condition a·b = 0 does not permit division by the magnitudes if either vector is zero: the angle with the zero vector is undefined. Before computing an angle, verify that both vectors have nonzero magnitude.',
      practice: {
        question: 'For what value of k are the vectors (1, 2, k) and (2, −1, 3) perpendicular?',
        answer: 'Their dot product is 2−2+3k = 3k, so k = 0.',
      },
    },
  },
  7: {
    title: 'The Cross Product of Vectors and Its Properties',
    topics: [
      'Definition of the Cross Product',
      'Properties of the Cross Product',
      'Coordinate Formula for the Cross Product',
      'Selected Applications of the Cross Product',
    ],
    guide: {
      summary: 'The cross product of two vectors in oriented three-dimensional space is perpendicular to both factors, and its direction is determined by the right-hand rule. Its magnitude equals the area of the parallelogram spanned by the original vectors, and reversing the factors changes its sign.',
      keyIdea: 'The cross product simultaneously encodes a normal to a plane, oriented area, and the relative orientation of two vectors.',
      formula: '\\vec a\\times\\vec b=\\begin{vmatrix}\\vec i&\\vec j&\\vec k\\\\a_1&a_2&a_3\\\\b_1&b_2&b_3\\end{vmatrix}',
      question: 'When is the cross product of two vectors the zero vector?',
    },
    detail: {
      hook: 'Constructing a normal to a plane or finding the area of a tilted parallelogram requires a new vector. The cross product produces it.',
      explanation: [
        'The vector a×b is defined in oriented three-dimensional Euclidean space, is perpendicular to both a and b, and points according to the right-hand rule. Its magnitude is |a||b|sin φ, the area of the parallelogram spanned by the original vectors.',
        'The cross product is anticommutative: b×a = −a×b, and it is distributive over addition. It equals the zero vector exactly when the factors are collinear or at least one of them is the zero vector.',
      ],
      terms: [
        { term: 'Cross product', definition: 'The oriented vector a×b perpendicular to both factors.' },
        { term: 'Collinear vectors', definition: 'Vectors lying on parallel lines and therefore linearly dependent.' },
        { term: 'Right-hand rule', definition: 'The convention that determines the positive direction of a×b as one turns from a toward b.' },
      ],
      example: {
        title: 'Normal Vector and Area',
        problem: 'For a = (1, 2, 0) and b = (0, 1, 3), find a×b and the area of the parallelogram.',
        steps: [
          'By the coordinate formula, the first component is 2·3 − 0·1 = 6.',
          'The second component is 0·0 − 1·3 = −3, and the third is 1·1 − 2·0 = 1.',
          'Thus a×b = (6, −3, 1).',
          'The area is the magnitude of this vector: √(36+9+1) = √46.',
        ],
        answer: 'a×b = (6, −3, 1), and the area of the parallelogram is √46.',
      },
      pitfall: 'Reversing the factors does not leave the answer unchanged; it changes its sign. Fix the order a×b before expanding the determinant, and check the result using (a×b)·a = 0 and (a×b)·b = 0.',
      practice: {
        question: 'Find (2, 0, 0)×(0, 3, 0).',
        answer: 'The product is (0, 0, 6).',
      },
    },
  },
  8: {
    title: 'The Scalar Triple Product of Vectors',
    topics: [
      'Definition and Geometric Meaning of the Scalar Triple Product',
      'Properties of the Scalar Triple Product',
      'Coordinate Formula for the Scalar Triple Product',
      'Selected Applications of the Scalar Triple Product',
    ],
    guide: {
      summary: 'The scalar triple product of three vectors is the dot product of the first vector with the cross product of the other two. Its absolute value equals the volume of the parallelepiped spanned by the vectors, while its sign determines the orientation of the ordered triple.',
      keyIdea: 'Three vectors are coplanar if and only if their scalar triple product is zero.',
      formula: '(\\vec a,\\vec b,\\vec c)=\\vec a\\cdot(\\vec b\\times\\vec c)=\\begin{vmatrix}a_1&a_2&a_3\\\\b_1&b_2&b_3\\\\c_1&c_2&c_3\\end{vmatrix}',
      question: 'How is the volume of a tetrahedron obtained from the scalar triple product of three edges issuing from one vertex?',
    },
    detail: {
      hook: 'Three edges determine a volume only if they do not lie in the same plane. The scalar triple product tests this condition and immediately computes oriented volume.',
      explanation: [
        'The scalar triple product is defined as a·(b×c); in coordinates, it equals the determinant whose rows are the coordinates of the three vectors. Its absolute value is the volume of the parallelepiped, while its sign distinguishes positive and negative orientations of the ordered triple.',
        'A cyclic permutation of the factors leaves the scalar triple product unchanged, whereas interchanging two factors reverses its sign. A zero value is the exact criterion for three vectors to be coplanar.',
      ],
      terms: [
        { term: 'Scalar triple product', definition: 'The scalar a·(b×c), whose value depends on the order of the three vectors.' },
        { term: 'Coplanarity', definition: 'The possibility of placing vectors in a single plane after bringing their initial points together.' },
        { term: 'Orientation of an ordered triple', definition: 'The sign of an ordered basis, which reverses when two of its vectors are interchanged.' },
      ],
      example: {
        title: 'Volumes of a Parallelepiped and a Tetrahedron',
        problem: 'For a = (1, 0, 0), b = (0, 2, 0), and c = (1, 1, 3), find the volumes of the parallelepiped and tetrahedron spanned by these edges.',
        steps: [
          'Compute b×c = (6, 0, −2).',
          'Find a·(b×c) = (1,0,0)·(6,0,−2) = 6.',
          'The volume of the parallelepiped is |6| = 6.',
          'The volume of the tetrahedron with a common vertex is one sixth as large: 6/6 = 1.',
        ],
        answer: 'The volume of the parallelepiped is 6, and the volume of the tetrahedron is 1.',
      },
      pitfall: 'A negative scalar triple product must not be used directly as a volume: the sign encodes orientation, whereas geometric volume is nonnegative. Take the absolute value first and only then divide by 6 if necessary.',
      practice: {
        question: 'Are a = (1,0,1), b = (0,1,1), and c = (1,1,2) coplanar?',
        answer: 'Yes. Since c = a+b, their scalar triple product is zero.',
      },
    },
  },
  9: {
    title: 'A Coordinate System in the Plane',
    topics: ['Basic Concepts', 'Principal Applications of the Coordinate Method in the Plane', 'Transformation of Coordinates'],
    guide: {
      summary: 'A Cartesian coordinate system assigns an ordered pair of numbers to every point in the plane and makes it possible to express geometric relationships algebraically. Translating or rotating the coordinate system changes point coordinates but preserves distances and angles.',
      keyIdea: 'The coordinate method solves a geometric problem by translating figures into equations and then interpreting the result geometrically.',
      formula: 'AB=\\sqrt{(x_B-x_A)^2+(y_B-y_A)^2}',
      question: 'Which geometric quantities are preserved when a Cartesian coordinate system is translated or rotated?',
    },
    detail: {
      hook: 'A geometric diagram becomes computable when every point receives a two-number address. Coordinates allow lengths, midpoints, and transformations to be checked without measuring the drawing.',
      explanation: [
        'In a Cartesian system, a point M is represented by the pair (x,y), and the vector AB has coordinates (x_B−x_A, y_B−y_A). These facts yield formulas for distance, midpoint coordinates, and division of a segment in a given ratio.',
        'Translating the origin changes coordinates by a constant vector, while rotating the axes combines them through the sine and cosine of the rotation angle. These transformations preserve distances and angles, so they can be chosen to simplify the equation of a figure.',
      ],
      terms: [
        { term: 'Cartesian coordinate system', definition: 'An origin and two mutually perpendicular oriented axes with a chosen scale.' },
        { term: 'Abscissa', definition: 'The first coordinate of a point, measured along the x-axis.' },
        { term: 'Ordinate', definition: 'The second coordinate of a point, measured along the y-axis.' },
        { term: 'Coordinate transformation', definition: 'Formulas relating the coordinates of the same point in an old and a new coordinate system.' },
      ],
      example: {
        title: 'Distance and Midpoint of a Segment',
        problem: 'For A(−1,2) and B(3,−4), find the length AB and the midpoint of the segment.',
        steps: [
          'The coordinate differences are 3−(−1) = 4 and −4−2 = −6.',
          'The length is AB = √(4²+(−6)²) = √52 = 2√13.',
          'The midpoint coordinates are ((−1+3)/2, (2−4)/2) = (1,−1).',
        ],
        answer: 'AB = 2√13, and the midpoint is (1,−1).',
      },
      pitfall: 'In the midpoint formula, one may mistakenly halve the difference of the coordinates instead of their sum. Think of the midpoint coordinate as the arithmetic mean of the endpoint coordinates, and check that the answer lies between them.',
      practice: {
        question: 'What coordinates does the point P(2,−3) have after reflection across the x-axis?',
        answer: 'After reflection, the point is (2,3).',
      },
    },
  },
  10: {
    title: 'Lines in the Plane',
    topics: ['Basic Concepts', 'Equations of a Line in the Plane', 'A Line in the Plane: Fundamental Problems'],
    guide: {
      summary: 'A line in the plane is described by a linear equation Ax+By+C=0, where A and B are not both zero. The normal, parametric, canonical, and slope-intercept forms of the same equation are convenient for different problems involving intersection, parallelism, perpendicularity, and distance.',
      keyIdea: 'The pair of coefficients (A,B) is a normal vector to the line and determines its direction.',
      formula: 'Ax+By+C=0,\\quad (A,B)\\ne(0,0)',
      question: 'How can the normal vectors of two lines be used to determine whether the lines are parallel?',
    },
    detail: {
      hook: 'A route on a map, a property boundary, and a linear graph are all described by the same object. Different equations of a line let us choose the shortest route to a particular solution.',
      explanation: [
        'The general equation of a line is Ax+By+C = 0, where A and B are not both zero, and the vector (A,B) is normal to the line. Through a point M₀ with direction vector s = (m,n), the line is given parametrically by x = x₀+mt, y = y₀+nt.',
        'Parallelism is tested by checking whether direction vectors or normal vectors are collinear, and perpendicularity by checking whether the dot product of the directions is zero. The distance from (x₀,y₀) to the line is |Ax₀+By₀+C|/√(A²+B²).',
      ],
      terms: [
        { term: 'Normal vector to a line', definition: 'Any nonzero vector perpendicular to the direction of the line.' },
        { term: 'Direction vector', definition: 'Any nonzero vector parallel to the line.' },
        { term: 'Slope', definition: 'The number k in y = kx+b, equal to the tangent of the inclination angle of a nonvertical line.' },
        { term: 'Pencil of lines', definition: 'A family of lines passing through one fixed point.' },
      ],
      example: {
        title: 'A Line Through Two Points',
        problem: 'Find the general equation of the line through P(1,2) and Q(3,−1).',
        steps: [
          'The direction vector is PQ = (3−1, −1−2) = (2,−3).',
          'A perpendicular normal vector may be chosen as n = (3,2), since (2,−3)·(3,2) = 0.',
          'Substitute the point P into 3(x−1)+2(y−2) = 0.',
          'Expand the parentheses to obtain 3x+2y−7 = 0.',
        ],
        answer: 'The required line is 3x+2y−7 = 0.',
      },
      pitfall: 'The form y = kx+b does not represent vertical lines, so trying to find their slope leads to division by zero. In such cases, use the general equation x = c or a parametric form.',
      practice: {
        question: 'Find the intersection point of the lines x+y = 3 and x−y = 1.',
        answer: 'Adding the equations gives x = 2, and then y = 1; the intersection point is (2,1).',
      },
    },
  },
  11: {
    title: 'Second-Order Curves in the Plane',
    topics: ['Basic Concepts', 'The Circle', 'The Ellipse', 'The Hyperbola', 'The Parabola', 'The General Equation of a Second-Order Curve'],
    guide: {
      summary: 'A second-order curve is described by a general quadratic equation in two variables, which can be reduced to canonical form by translating and rotating the coordinate system. The nondegenerate canonical cases are the circle, ellipse, hyperbola, and parabola, while degenerate cases may describe points, lines, or the empty set.',
      keyIdea: 'Canonical form makes the center, axes, foci, and other geometric parameters of a conic visible.',
      formula: 'Ax^2+Bxy+Cy^2+Dx+Ey+F=0,\\quad(A,B,C)\\ne(0,0,0)',
      question: 'What is the sign of B²−4AC for a nondegenerate hyperbola?',
    },
    detail: {
      hook: 'Orbits, telescope mirrors, and acoustic reflectors are built from several related curves. Their differences become transparent once a quadratic equation is reduced to canonical form.',
      explanation: [
        'The general equation of a second-order curve is Ax²+Bxy+Cy²+Dx+Ey+F = 0, where A, B, and C are not all zero. An orthogonal rotation of the axes eliminates the mixed term Bxy when necessary. A subsequent translation completes squares and moves the center or vertex: for a central conic it eliminates both linear terms, whereas for a parabola one essential linear term remains.',
        'For a nondegenerate conic, the sign of B²−4AC distinguishes the elliptic, parabolic, and hyperbolic types. The canonical equation reveals the center or vertex, semiaxes, foci, and symmetries, but degeneracy must be checked separately.',
      ],
      terms: [
        { term: 'Ellipse', definition: 'The set of points for which the sum of the distances to two foci is constant and greater than the distance between the foci.' },
        { term: 'Hyperbola', definition: 'The set of points for which the absolute difference of the distances to two foci is a positive constant strictly smaller than the distance between the foci.' },
        { term: 'Parabola', definition: 'The set of points equidistant from a fixed point, the focus, and a fixed line, the directrix, which does not pass through the focus.' },
        { term: 'Eccentricity', definition: 'A dimensionless characteristic of a conic equal to the ratio of the distance to a focus to the distance to the corresponding directrix.' },
      ],
      example: {
        title: 'Reducing an Ellipse to Canonical Form',
        problem: 'Identify the curve 4x²+9y²−8x+36y+4 = 0 and find its center and semiaxes.',
        steps: [
          'Group the variables: 4(x²−2x)+9(y²+4y)+4 = 0.',
          'Complete the squares: x²−2x = (x−1)²−1 and y²+4y = (y+2)²−4.',
          'This gives 4(x−1)²+9(y+2)² = 36.',
          'Divide by 36: (x−1)²/9 + (y+2)²/4 = 1.',
        ],
        answer: 'The curve is an ellipse with center (1,−2) and semiaxes 3 and 2.',
      },
      pitfall: 'The signs of the coefficients of x² and y² alone do not reliably identify a real curve: the constant term may produce the empty set, and a Bxy term requires rotation of the axes. First reduce the equation to canonical form and only then classify it.',
      practice: {
        question: 'Which nondegenerate curve is described by x²−y² = 1?',
        answer: 'It is a hyperbola centered at the origin with its transverse semiaxis along the x-axis.',
      },
    },
  },
  12: {
    title: 'Equations of Surfaces and Curves in Space',
    topics: [
      'Basic Concepts',
      'Equations of a Plane in Space',
      'A Plane: Fundamental Problems',
      'Equations of a Line in Space',
      'A Line in Space: Fundamental Problems',
      'A Line and a Plane in Space: Fundamental Problems',
      'Cylindrical Surfaces',
      'Surfaces of Revolution. Conical Surfaces',
      'Canonical Equations of Quadric Surfaces',
    ],
    guide: {
      summary: 'A surface in space can be specified by an equation F(x,y,z)=0, and a curve can be given parametrically or as the intersection of two surfaces. A plane is determined by a normal vector, a line by a direction vector, and quadric surfaces are recognized from their canonical equations.',
      keyIdea: 'Normal and direction vectors reduce spatial problems about angles, parallelism, and perpendicularity to vector operations.',
      formula: 'Ax+By+Cz+D=0,\\quad (A,B,C)\\ne(0,0,0)',
      question: 'What condition relates the direction vector of a line to the normal vector of a plane when the line is parallel to the plane?',
    },
    detail: {
      hook: 'A three-dimensional model must describe a wall, a trajectory, and a curved shell with equal confidence. Equations of planes, lines, and surfaces turn a spatial drawing into a system of verifiable conditions.',
      explanation: [
        'A plane with normal n = (A,B,C) passing through M₀ is given by n·(r−r₀) = 0. A line through M₀ with direction vector s is written as r = r₀+ts and may also be represented as the intersection of two nonparallel planes.',
        'Angles and relative positions are determined by dot products of normals and directions. Cylindrical and conical surfaces, surfaces of revolution, and quadrics are recognized by which coordinates occur in their equations and by the canonical forms to which those equations reduce.',
      ],
      terms: [
        { term: 'Level surface', definition: 'The set of points in space satisfying the equation F(x,y,z) = c.' },
        { term: 'Normal to a plane', definition: 'A nonzero vector perpendicular to every direction lying in the plane.' },
        { term: 'Line in parametric form', definition: 'The set of points r₀+ts for all real values of the parameter t.' },
        { term: 'Quadric', definition: 'A surface described by a second-degree equation in spatial coordinates.' },
      ],
      example: {
        title: 'A Plane from a Point and a Normal',
        problem: 'Find the equation of the plane through P(1,−1,2) with normal n = (2,1,−3).',
        steps: [
          'Write the condition n·((x,y,z)−P) = 0.',
          'This gives 2(x−1)+(y+1)−3(z−2) = 0.',
          'After expanding the parentheses, obtain 2x+y−3z+5 = 0.',
          'Substitution of P verifies that 2−1−6+5 = 0.',
        ],
        answer: 'The equation of the plane is 2x+y−3z+5 = 0.',
      },
      pitfall: 'A direction vector of a line and a normal vector of a plane play opposite roles. Before applying a formula, identify whether the chosen vector must be parallel or perpendicular to the object.',
      practice: {
        question: 'Which point on the parametric line r = (1,0,2)+t(2,−1,3) corresponds to t = −1?',
        answer: 'For t = −1, the point is (−1,1,−1).',
      },
    },
  },
  13: {
    title: 'Sets. Real Numbers',
    topics: ['Basic Concepts', 'Number Sets. The Set of Real Numbers', 'Intervals. A Neighborhood of a Point'],
    guide: {
      summary: 'A set specifies a collection of objects on which the operations of union, intersection, difference, and complement are defined. The real numbers form an ordered number line, while intervals and neighborhoods describe the positions of numbers relative to selected points.',
      keyIdea: 'A neighborhood makes it possible to formulate local properties of numbers and functions without tying them to a particular scale.',
      formula: 'U_{\\varepsilon}(a)=\\{x\\in\\mathbb R:|x-a|<\\varepsilon\\}',
      question: 'How does the open interval (a,b) differ from the closed interval [a,b]?',
    },
    detail: {
      hook: 'Analysis begins not with a derivative, but with a precise answer to the question of which numbers are under consideration. The language of sets and neighborhoods establishes the scope of every statement that follows.',
      explanation: [
        'Sets can be united, intersected, subtracted, and complemented relative to a chosen universal set. The inclusion A ⊆ B means that every element of A belongs to B, while equality of sets requires inclusion in both directions.',
        'The real numbers form a complete ordered field and are represented as points on the number line. Intervals describe global ranges, while the ε-neighborhood Uε(a) = (a−ε,a+ε) describes local proximity to the point a.',
      ],
      terms: [
        { term: 'Subset', definition: 'A set A every element of which belongs to a set B, written A ⊆ B.' },
        { term: 'Intersection', definition: 'The set of elements that belong to both original sets simultaneously.' },
        { term: 'Interval', definition: 'A connected subset of the real line whose endpoints may be included or excluded.' },
        { term: 'ε-neighborhood', definition: 'The open interval (a−ε,a+ε), where ε > 0.' },
      ],
      example: {
        title: 'Intersection of a Neighborhood and a Ray',
        problem: 'Find U₃(2) ∩ [0,+∞).',
        steps: [
          'From |x−2| < 3, obtain the compound inequality −3 < x−2 < 3.',
          'Add 2: −1 < x < 5, so U₃(2) = (−1,5).',
          'Intersect this interval with the condition x ≥ 0.',
        ],
        answer: 'U₃(2) ∩ [0,+∞) = [0,5).',
      },
      pitfall: 'Parentheses and square brackets change whether an endpoint belongs to an interval. After solving an inequality, check each endpoint separately against the strict or nonstrict sign in the original statement.',
      practice: {
        question: 'Find the intersection of (−∞,2] and (0,5).',
        answer: 'The intersection is (0,2].',
      },
    },
  },
  14: {
    title: 'Functions',
    topics: [
      'The Concept of a Function',
      'Real-Valued Functions. The Graph of a Function. Ways of Defining a Function',
      'Fundamental Characteristics of a Function',
      'The Inverse Function',
      'The Composite Function',
      'Basic Elementary Functions and Their Graphs',
    ],
    guide: {
      summary: 'A function assigns exactly one value in the codomain to every element of its domain. Its graph, monotonicity, parity, periodicity, inverse, and composition describe different aspects of the behavior of this correspondence.',
      keyIdea: 'Before analyzing a formula, determine the domain of the function; only then should its values and graph be studied.',
      formula: '(f\\circ g)(x)=f(g(x))',
      question: 'What property must a function have on its domain for an inverse to exist on its range?',
    },
    detail: {
      hook: 'A formula becomes a mathematical model only after its admissible inputs and the meaning of its outputs have been specified. The concept of a function preserves this relationship and allows it to be studied as a single object.',
      explanation: [
        'A function f from X to Y assigns exactly one value f(x) in Y to every x in its domain X. The set of values actually attained may be smaller than Y, and the graph of a real-valued function consists of the points (x,f(x)).',
        'Monotonicity, boundedness, parity, and periodicity describe the behavior of a function. An inverse on the range exists when the original function is injective, while the composition f∘g is defined wherever g(x) belongs to the domain of f.',
      ],
      terms: [
        { term: 'Domain', definition: 'The set of all admissible arguments of a function.' },
        { term: 'Range', definition: 'The set of all values f(x) attained on the domain.' },
        { term: 'Injectivity', definition: 'The property that distinct arguments have distinct function values.' },
        { term: 'Composition', definition: 'The function (f∘g)(x) = f(g(x)), defined wherever both successive operations are admissible.' },
      ],
      example: {
        title: 'Domain of a Square-Root Function',
        problem: 'Find the domain and range of f(x) = √(5−2x), and compute f(2).',
        steps: [
          'The radicand must be nonnegative: 5−2x ≥ 0.',
          'Thus x ≤ 5/2, so D(f) = (−∞,5/2].',
          'The square root is nonnegative and grows without bound as x→−∞, so E(f) = [0,+∞).',
          'f(2) = √(5−4) = 1.',
        ],
        answer: 'D(f) = (−∞,5/2], E(f) = [0,+∞), f(2) = 1.',
      },
      pitfall: 'The inverse function is often confused with the reciprocal 1/f(x). Check the meaning: f⁻¹ reverses the action of f and interchanges arguments with values, whereas 1/f merely takes a numerical reciprocal.',
      practice: {
        question: 'For f(x) = 2x+1 and g(x) = x², find (f∘g)(2) and (g∘f)(2).',
        answer: '(f∘g)(2) = 9, while (g∘f)(2) = 25.',
      },
    },
  },
  15: {
    title: 'Sequences',
    topics: [
      'Real Sequences',
      'The Limit of a Real Sequence',
      'Passing to the Limit in Inequalities',
      'The Limit of a Bounded Monotone Sequence. The Number e. Natural Logarithms',
    ],
    guide: {
      summary: 'A real sequence is a function of a natural-number argument whose values are written successively as a₁, a₂, and so on. A sequence converges to A if, from some index onward, all its terms lie in every ε-neighborhood of A; moreover, every bounded monotone sequence has a limit.',
      keyIdea: 'A limit describes not the first few individual terms, but the inevitable behavior of all sufficiently far-out terms of a sequence.',
      formula: '\\lim_{n\\to\\infty}a_n=A\\iff\\forall\\varepsilon>0\\;\\exists N\\;\\forall n\\ge N:\\ |a_n-A|<\\varepsilon',
      question: 'Once ε has been specified, what exactly must be chosen to prove convergence from the definition?',
    },
    detail: {
      hook: 'The first few terms are not enough to determine the distant behavior of a sequence. A limit states what inevitably happens to all sufficiently late terms.',
      explanation: [
        'A real sequence is a function of a natural-number argument and is denoted by (aₙ). The statement aₙ→A means that for every ε > 0 there is an index N such that |aₙ−A| < ε for every n ≥ N.',
        'A convergent sequence has a unique limit and is necessarily bounded. An increasing sequence bounded above and a decreasing sequence bounded below converge by the completeness of the real numbers.',
      ],
      terms: [
        { term: 'Real sequence', definition: 'A function defined on the natural numbers and taking real values.' },
        { term: 'Limit of a sequence', definition: 'A number A such that every neighborhood of A contains all terms from some index onward.' },
        { term: 'Monotonicity', definition: 'Preservation of one direction of change: the terms are nondecreasing or nonincreasing.' },
        { term: 'Boundedness', definition: 'The existence of finite lower and upper bounds for all terms of the sequence.' },
      ],
      example: {
        title: 'Limit of a Rational Sequence',
        problem: 'Find the limit of aₙ = (3n+1)/(n+2) as n→∞.',
        steps: [
          'Divide the numerator and denominator by n: aₙ = (3+1/n)/(1+2/n).',
          'As n→∞, the quantities 1/n and 2/n tend to zero.',
          'Pass to the limit of the quotient because the denominator tends to 1, which is nonzero.',
        ],
        answer: 'The limit of the sequence is 3.',
      },
      pitfall: 'The symbol ∞ is not a number, so “substitute n = ∞” is not a proof. Divide by the highest power of n or apply limit theorems to finite expressions.',
      practice: {
        question: 'Find the limit of (2n²−1)/(n²+4) as n→∞.',
        answer: 'After division by n², the limit is (2−1/n²)/(1+4/n²) = 2.',
      },
    },
  },
  16: {
    title: 'The Limit of a Function',
    topics: ['The Limit of a Function at a Point', 'One-Sided Limits', 'The Limit of a Function as x → ∞', 'An Infinitely Large Function'],
    guide: {
      summary: 'If a is a limit point of the domain, then the limit of a function as x→a is L when f(x) becomes arbitrarily close to L at every domain point sufficiently close to, but distinct from, a. A two-sided limit exists if and only if both one-sided limits exist and are equal. As x→+∞ one requires x>M, and as x→−∞ one requires x<−M; the condition |x|>M belongs to the separate regime |x|→∞. A limit of +∞ or −∞ requires unbounded growth with the corresponding fixed sign.',
      keyIdea: 'The value of the function at a itself has no effect on its limit as x→a.',
      formula: '\\forall\\varepsilon>0\\;\\exists\\delta>0\\;\\forall x\\in D(f):\\ 0<|x-a|<\\delta\\Rightarrow|f(x)-L|<\\varepsilon',
      question: 'What can be concluded about the two-sided limit if the left-hand and right-hand limits are finite but unequal?',
    },
    detail: {
      hook: 'A function may be undefined at a point and still have completely determined limiting behavior there. The limit separates what happens nearby from the value at the point itself.',
      explanation: [
        'The limit of f(x) as x→a is L if for every ε > 0 there is a δ > 0 such that 0 < |x−a| < δ, with x in the domain, implies |f(x)−L| < ε. The punctured condition excludes x = a, so the value f(a) does not affect this limit.',
        'A two-sided limit exists if and only if the left-hand and right-hand limits both exist and are equal. As x→+∞, x must be sufficiently large and positive; as x→−∞, it must be negative with sufficiently large magnitude. A limit of +∞ means f(x)>E for every prescribed E>0, whereas a limit of −∞ means f(x)<−E.',
      ],
      terms: [
        { term: 'Punctured neighborhood', definition: 'A neighborhood of a point with the central point itself removed.' },
        { term: 'One-sided limit', definition: 'A limit obtained by approaching a point only from the left or only from the right.' },
        { term: 'Limit at infinity', definition: 'A description of the behavior of f(x) as x→+∞ or x→−∞; these two regimes are examined separately.' },
        { term: 'Infinite limit', definition: 'A limit of +∞ or −∞, in which the function values pass every bound with the corresponding fixed sign.' },
      ],
      example: {
        title: 'Resolving an Indeterminate Form',
        problem: 'Find the limit of (x²−4)/(x−2) as x→2.',
        steps: [
          'Direct substitution gives the form 0/0, which is not the value of the limit.',
          'For x ≠ 2, factor the numerator: x²−4 = (x−2)(x+2).',
          'Cancel the common factor to obtain x+2 in a punctured neighborhood of 2.',
          'The limit of x+2 as x→2 is 4.',
        ],
        answer: 'The limit is 4.',
      },
      pitfall: 'The form 0/0 does not mean that the limit is zero or does not exist; it only says that direct substitution is insufficient. First transform the expression, then study the resulting function near the point.',
      practice: {
        question: 'Find the limit of (x²+x)/x as x→0.',
        answer: 'For x ≠ 0 the expression equals x+1, so the limit is 1.',
      },
    },
  },
  17: {
    title: 'Infinitesimal Functions',
    topics: [
      'Definitions and Fundamental Theorems',
      'The Relationship Between a Function, Its Limit, and an Infinitesimal Function',
      'Fundamental Theorems on Limits',
      'Criteria for the Existence of Limits',
      'The First Fundamental Limit',
      'The Second Fundamental Limit',
    ],
    guide: {
      summary: 'An infinitesimal function tends to zero, and a function with finite limit A can be represented as the sum of A and an infinitesimal. The sum of finitely many infinitesimals and the product of an infinitesimal with a bounded function are again infinitesimal.',
      keyIdea: 'Passing to the infinitesimal part separates the constant limit from the vanishing error.',
      formula: 'f(x)\\to A\\iff f(x)=A+\\alpha(x),\\quad\\alpha(x)\\to0',
      question: 'Why do α(x)→0 and the boundedness of g(x) imply α(x)g(x)→0?',
    },
    detail: {
      hook: 'A complicated limit often consists of a constant part and an error that vanishes. Infinitesimal functions make it possible to work directly with that disappearing part.',
      explanation: [
        'A function α is infinitesimal in a given limiting process if α→0. The statement f→A is equivalent to a representation f = A+α, where α is infinitesimal, so many limit theorems reduce to rules for manipulating such remainders.',
        'The sum of finitely many infinitesimals and the product of an infinitesimal with a bounded function are again infinitesimal. The basic reference limits are sin x/x = 1 as x→0 and (1+1/x)ˣ = e as x→+∞.',
      ],
      terms: [
        { term: 'Infinitesimal function', definition: 'A function whose limit in the limiting process under consideration is zero.' },
        { term: 'Infinitely large function', definition: 'A function whose magnitude exceeds every prescribed positive bound sufficiently close to the limiting regime; without an eventual fixed sign, this does not imply a limit of +∞ or −∞.' },
        { term: 'First fundamental limit', definition: 'The equality lim sin x/x = 1 as x→0, with the angle measured in radians.' },
        { term: 'Second fundamental limit', definition: 'The equality lim (1+1/x)ˣ = e as x→+∞ on the domain where the expression is defined.' },
      ],
      example: {
        title: 'A Combination of a Fundamental Limit',
        problem: 'Find the limit of (sin x+x²)/x as x→0.',
        steps: [
          'Split the fraction: (sin x+x²)/x = sin x/x + x for x ≠ 0.',
          'By the first fundamental limit, sin x/x→1.',
          'The function x is infinitesimal, so x→0.',
          'The limit of the sum is 1+0 = 1.',
        ],
        answer: 'The limit is 1.',
      },
      pitfall: 'The quotient of two infinitesimals need not be infinitesimal: it may have a finite limit, be infinite, or have no limit. Compare the rates at which the numerator and denominator vanish instead of formally dividing “zero by zero.”',
      practice: {
        question: 'Find the limit of (1−cos x)/x as x→0.',
        answer: 'Multiplying by (1+cos x)/(1+cos x) gives sin²x/[x(1+cos x)], whose limit is 0.',
      },
    },
  },
  18: {
    title: 'Equivalent Infinitesimal Functions',
    topics: ['Comparison of Infinitesimal Functions', 'Equivalent Infinitesimals and Their Fundamental Theorems', 'Applications of Equivalent Infinitesimal Functions'],
    guide: {
      summary: 'Two infinitesimal functions α and β are equivalent if β is nonzero in some punctured neighborhood and the ratio α/β tends to one. Equivalent substitution may be used in products and quotients under a limit, but an unjustified replacement of individual terms can destroy an essential cancellation.',
      keyIdea: 'Equivalence preserves the leading asymptotic term of a function.',
      formula: '\\alpha(x)\\sim\\beta(x)\\iff\\lim\\frac{\\alpha(x)}{\\beta(x)}=1',
      question: 'Why can equivalent infinitesimals not be substituted for one another inside a difference without further verification?',
    },
    detail: {
      hook: 'In a limit, a complicated function can often be replaced by its simplest local counterpart. Equivalent infinitesimals make such a replacement rigorous rather than intuitive.',
      explanation: [
        'Infinitesimals α and β are equivalent if α/β→1 and the denominator is nonzero in some punctured neighborhood. The notation α∼β means that they have the same leading order of smallness; for example, sin x∼x, 1−cos x∼x²/2, and ln(1+x)∼x as x→0.',
        'Equivalent factors may be substituted in products and quotients when evaluating a limit. In sums and differences, such a substitution requires a separate check because the leading terms may cancel and the answer may then be determined by the next order of smallness.',
      ],
      terms: [
        { term: 'Equivalent infinitesimals', definition: 'Functions α and β whose ratio tends to one.' },
        { term: 'Order of smallness', definition: 'The comparative rate at which a function tends to zero relative to a chosen reference function.' },
        { term: 'Little o', definition: 'The notation α = o(β), meaning that α/β→0 in the limiting process under consideration.' },
      ],
      example: {
        title: 'A Limit from Local Equivalents',
        problem: 'Find the limit of (1−cos x)/(x sin x) as x→0.',
        steps: [
          'Use 1−cos x∼x²/2.',
          'Use sin x∼x, so x sin x∼x².',
          'Substitute these equivalent factors in the quotient to obtain (x²/2)/x².',
        ],
        answer: 'The limit is 1/2.',
      },
      pitfall: 'Replacing sin x with x in the difference sin x−x eliminates both leading terms and incorrectly gives the identically zero expression. For a difference, first find the next nonzero term of the expansion or transform the expression in another way.',
      practice: {
        question: 'Find the limit of ln(1+3x)/sin(2x) as x→0.',
        answer: 'Since ln(1+3x)∼3x and sin(2x)∼2x, the limit is 3/2.',
      },
    },
  },
  19: {
    title: 'Continuity of a Function',
    topics: [
      'Continuity of a Function at a Point',
      'Continuity of a Function on an Open and a Closed Interval',
      'Discontinuities and Their Classification',
      'Fundamental Theorems on Continuous Functions. Continuity of Elementary Functions',
      'Properties of Functions Continuous on a Closed Interval',
    ],
    guide: {
      summary: 'A function is continuous at a point a if it is defined at a and its limit as x→a equals f(a). A function continuous on a closed interval is bounded, attains its greatest and least values, and takes every intermediate value between its endpoint values.',
      keyIdea: 'Continuity means that the limiting behavior of a function agrees with its actual value at the point.',
      formula: '\\lim_{x\\to a}f(x)=f(a)',
      question: 'How can a removable discontinuity be recognized, and how can the function be redefined to remove it?',
    },
    detail: {
      hook: 'A limit describes a function\'s tendency to approach a number, while continuity checks whether that tendency agrees with the actual value. Continuity is precisely what rules out sudden breaks under a small change of the argument.',
      explanation: [
        'A function is continuous at a point a if it is defined at a, has a finite limit as x→a, and that limit equals f(a). Equivalently, the increment of the function tends to zero together with the increment of the argument.',
        'Sums, products, quotients with nonzero denominator, and compositions of continuous functions are continuous. A function continuous on a closed interval is bounded, attains its extreme values, and takes every intermediate value between its values at the endpoints.',
      ],
      terms: [
        { term: 'Continuity at a point', definition: 'The equality lim f(x) = f(a) as x→a, together with the existence of both sides.' },
        { term: 'Removable discontinuity', definition: 'A point where a finite two-sided limit exists, but the function value is absent or differs from that limit.' },
        { term: 'Discontinuity of the first kind', definition: 'A point with finite one-sided limits; if they are unequal, the discontinuity is a jump.' },
        { term: 'Discontinuity of the second kind', definition: 'A point where at least one one-sided limit does not exist as a finite number.' },
      ],
      example: {
        title: 'Removing a Discontinuity by Choosing a Parameter',
        problem: 'A function equals (x²−1)/(x−1) for x ≠ 1 and equals a for x = 1. Find a so that the function is continuous.',
        steps: [
          'For x ≠ 1, factor x²−1 = (x−1)(x+1) and cancel the common factor.',
          'The limit of the function as x→1 is the limit of x+1, namely 2.',
          'For continuity, the value at the point must equal the limit, so a = 2.',
        ],
        answer: 'The function is continuous when a = 2.',
      },
      pitfall: 'The existence of a limit is not enough for continuity if the function is undefined at the point or has a different value there. Always check all three conditions: the value exists, the limit exists, and they are equal.',
      practice: {
        question: 'On what set is the function f(x) = 1/x continuous?',
        answer: 'It is continuous on (−∞,0) and (0,+∞), that is, for every x ≠ 0.',
      },
    },
  },
  20: {
    title: 'The Derivative of a Function',
    topics: [
      'Problems Leading to the Concept of a Derivative',
      'Definition of the Derivative; Its Physical and Geometric Interpretations. Equations of the Tangent and Normal Lines to a Curve',
      'The Relationship Between Continuity and Differentiability',
      'The Derivative of a Sum, Difference, Product, and Quotient of Functions',
      'The Derivative of a Composite and an Inverse Function',
      'Derivatives of Basic Elementary Functions',
      'Hyperbolic Functions and Their Derivatives',
      'Table of Derivatives',
    ],
    guide: {
      summary: 'The derivative of a function at a point is the limit of the ratio of the increment of the function to the increment of its argument, provided this finite limit exists. Geometrically it gives the slope of the tangent line; in mechanics, it gives instantaneous velocity, and differentiation rules make it possible to find derivatives without recomputing the limit each time.',
      keyIdea: 'The derivative measures the linear rate of change of a function on an infinitesimal scale.',
      formula: 'f\'(x)=\\lim_{h\\to0}\\frac{f(x+h)-f(x)}{h}',
      question: 'Does differentiability at a point imply continuity there, and is the converse true?',
    },
    detail: {
      hook: 'Average velocity describes an entire interval, but a speedometer reports what happens at a single instant. The derivative turns such instantaneous change into an exact number.',
      explanation: [
        'The derivative f′(x) is the limit of [f(x+h)−f(x)]/h as h→0, provided this finite limit exists. It equals the slope of the tangent line to the graph and the instantaneous rate of change of a quantity. Differentiability at a point implies continuity, but continuity alone does not guarantee a derivative.',
        'Linearity, the product and quotient rules, and the chain rule reduce the calculation of derivatives to a table of elementary functions. The tangent line at x₀ has equation y−f(x₀) = f′(x₀)(x−x₀), while the normal line, when f′(x₀) ≠ 0, has slope −1/f′(x₀).',
      ],
      terms: [
        { term: 'Derivative', definition: 'The finite limit of the ratio of the increment of a function to a nonzero increment of its argument.' },
        { term: 'Differentiability', definition: 'The existence of a finite derivative of a function at the point under consideration.' },
        { term: 'Tangent line', definition: 'The limiting position of secant lines, whose slope equals the derivative of the function.' },
        { term: 'Normal line', definition: 'The line through the point of tangency perpendicular to the tangent line.' },
      ],
      example: {
        title: 'Derivative and Tangent Line',
        problem: 'For f(x) = x²+3x, find f′(2) and the equation of the tangent line at x = 2.',
        steps: [
          'By the differentiation rules, f′(x) = 2x+3.',
          'Compute the slope: f′(2) = 7.',
          'Find the point on the graph: f(2) = 4+6 = 10.',
          'Substitute into y−10 = 7(x−2) to obtain y = 7x−4.',
        ],
        answer: 'f′(2) = 7, and the tangent line has equation y = 7x−4.',
      },
      pitfall: 'A common error in the tangent-line formula is to substitute f′(x₀) where f(x₀) belongs, producing a line that does not pass through the graph. Compute the point coordinate f(x₀) and the slope f′(x₀) separately, then check the result by substituting x = x₀.',
      practice: {
        question: 'A particle moves according to s(t) = t³−3t. Find its velocity at t = 2.',
        answer: 'v(t) = s′(t) = 3t²−3, so v(2) = 9.',
      },
    },
  },
  21: {
    title: 'Differentiation of Implicitly and Parametrically Defined Functions',
    topics: ['An Implicitly Defined Function', 'A Parametrically Defined Function'],
    guide: {
      summary: 'If F is continuously differentiable near (x₀,y₀), F(x₀,y₀)=0, and Fᵧ(x₀,y₀)≠0, then the equation locally defines a function y(x), whose derivative is found by differentiating the equation with respect to x. For a parametric curve x=x(t), y=y(t), the derivative dy/dx is the ratio of the derivatives with respect to t when dx/dt≠0.',
      keyIdea: 'Whatever form is used to define the function, differentiation must be performed with respect to the independent variable and must account for every hidden dependence.',
      formula: 'y\'=-\\frac{F_x}{F_y}\\ (F_y\\ne0),\\qquad\\frac{dy}{dx}=\\frac{dy/dt}{dx/dt}\\ (dx/dt\\ne0)',
      question: 'Which denominators must be nonzero in the formulas for implicit and parametric derivatives?',
    },
    detail: {
      hook: 'A curve cannot always be represented conveniently, or at all, by a single formula y = f(x). An implicit equation or a parameter preserves the geometry, and special rules still make it possible to find the slope.',
      explanation: [
        'If F(x,y) = 0 locally defines a differentiable function y(x) and Fᵧ ≠ 0, differentiating the equation gives y′ = −Fₓ/Fᵧ. Every term involving y is differentiated by the chain rule because y depends on x.',
        'For a parametric curve x = x(t), y = y(t), when x′(t) ≠ 0 we have dy/dx = y′(t)/x′(t). The second derivative with respect to x requires one more differentiation with respect to t followed by division by x′(t).',
      ],
      terms: [
        { term: 'Implicit function', definition: 'A local dependence of y on x defined by an equation F(x,y) = 0 without solving explicitly for y.' },
        { term: 'Parametric curve', definition: 'A curve whose coordinates are given as functions of a common parameter t.' },
        { term: 'Regular point of a parametrization', definition: 'A point at which the velocity vector (x′(t),y′(t)) is nonzero.' },
      ],
      example: {
        title: 'Slope of the Tangent to a Circle',
        problem: 'For the circle x²+y² = 25, find y′ at the point (3,4).',
        steps: [
          'Differentiate with respect to x: 2x+2y·y′ = 0.',
          'Solve for the derivative: y′ = −x/y when y ≠ 0.',
          'Substitute the point coordinates: y′ = −3/4.',
        ],
        answer: 'The slope of the tangent at (3,4) is −3/4.',
      },
      pitfall: 'In implicit differentiation, the derivative of y² is sometimes incorrectly written as 2y, ignoring the dependence y(x). The correct result 2y·y′ follows from the chain rule.',
      practice: {
        question: 'The curve is given by x = t²+1, y = t³. Find dy/dx at t = 1.',
        answer: 'dy/dx = 3t²/(2t), so at t = 1 the value is 3/2.',
      },
    },
  },
  22: {
    title: 'Logarithmic Differentiation',
    topics: [],
    guide: {
      summary: 'Logarithmic differentiation converts products, quotients, and powers into sums and products after taking a logarithm. The method is especially useful for a function u(x)^{v(x)} with both a variable base and a variable exponent; for a real logarithm, u(x)>0 is required.',
      keyIdea: 'The logarithm converts the complicated multiplicative structure of a function into a simpler additive structure.',
      formula: '(u^v)\'=u^v\\left(v\'\\ln u+v\\frac{u\'}{u}\\right),\\quad u>0',
      question: 'Why is it convenient to write ln|y| before logarithmically differentiating a product of nonzero functions?',
    },
    detail: {
      hook: 'A variable may appear in both the base and the exponent, where the ordinary derivative table no longer applies directly. A logarithm exposes the hidden structure of such an expression.',
      explanation: [
        'For a nonzero differentiable function on an interval, one may differentiate the identity ln|y| and use y′/y. A logarithm converts a product into a sum, a quotient into a difference, and a power into the product of the exponent and the logarithm of the base.',
        'For y = u(x)^(v(x)), real analysis usually assumes u(x) > 0 and gives y′ = u^v[v′ln u+v·u′/u]. After finding the logarithmic derivative, one must multiply the result by the original function y.',
      ],
      terms: [
        { term: 'Logarithmic differentiation', definition: 'A method of computing a derivative after taking the logarithm of the original equation.' },
        { term: 'Logarithmic derivative', definition: 'The ratio y′/y, equal to the derivative of ln|y| wherever y ≠ 0.' },
        { term: 'Power-exponential function', definition: 'A function u(x)^(v(x)) whose base and exponent both depend on x.' },
      ],
      example: {
        title: 'Derivative of xˣ',
        problem: 'Find the derivative of y = xˣ for x > 0.',
        steps: [
          'Take logarithms: ln y = x ln x.',
          'Differentiate: y′/y = ln x+1.',
          'Multiply by y = xˣ.',
        ],
        answer: 'y′ = xˣ(ln x+1), x > 0.',
      },
      pitfall: 'After differentiating ln y, one often leaves y′/y as the final derivative. Multiply both sides by y and only then substitute the original expression for the function.',
      practice: {
        question: 'Find the value of the derivative of y = x^(2x) at x = 1, where x > 0.',
        answer: 'y′ = x^(2x)(2ln x+2), so y′(1) = 2.',
      },
    },
  },
  23: {
    title: 'Higher-Order Derivatives',
    topics: [
      'Higher-Order Derivatives of an Explicitly Defined Function',
      'The Physical Interpretation of the Second Derivative',
      'Higher-Order Derivatives of an Implicitly Defined Function',
      'Higher-Order Derivatives of Parametrically Defined Functions',
    ],
    guide: {
      summary: 'The nth derivative is obtained by successively differentiating the derivative of order n−1, provided all required derivatives exist. For a law of motion s(t), the first derivative gives velocity and the second gives acceleration; implicit and parametric functions are differentiated repeatedly with due regard for the way they are defined.',
      keyIdea: 'Higher-order derivatives measure successive levels of change in a function.',
      formula: 'f^{(n)}(x)=\\left(f^{(n-1)}(x)\\right)\'',
      question: 'What is the physical meaning of the second derivative of a body\'s position with respect to time?',
    },
    detail: {
      hook: 'Velocity itself changes, and acceleration may also be nonconstant. Higher-order derivatives measure each successive layer of change.',
      explanation: [
        'The nth derivative is defined recursively as the derivative of f⁽ⁿ⁻¹⁾ and is denoted by f⁽ⁿ⁾. For a position s(t), the first derivative is velocity, the second is acceleration, and the third describes the rate of change of acceleration.',
        'For an implicitly defined function, each repeated differentiation again accounts for the dependence of y on x. For a parametric curve, the operator of differentiation with respect to x is (1/x′(t))·d/dt wherever x′(t) ≠ 0.',
      ],
      terms: [
        { term: 'nth derivative', definition: 'The result of differentiating a function n successive times.' },
        { term: 'Acceleration', definition: 'The second derivative of position with respect to time, equal to the derivative of velocity.' },
        { term: 'Jerk', definition: 'The third derivative of position with respect to time, measuring the rate of change of acceleration.' },
      ],
      example: {
        title: 'Velocity and Acceleration',
        problem: 'For s(t) = t³−6t²+9t, find the velocity and acceleration at t = 2.',
        steps: [
          'Differentiate once: v(t) = s′(t) = 3t²−12t+9.',
          'Differentiate a second time: a(t) = s″(t) = 6t−12.',
          'Substitute t = 2: v(2) = 12−24+9 = −3.',
          'Then a(2) = 12−12 = 0.',
        ],
        answer: 'At t = 2, the velocity is −3 and the acceleration is 0.',
      },
      pitfall: 'The notation f⁽ⁿ⁾ denotes the nth derivative, not the power [f(x)]ⁿ. Pay attention to the placement of the index, and when in doubt write out the first iterations with prime marks.',
      practice: {
        question: 'Find the third derivative of f(x) = e^(2x).',
        answer: 'f′ = 2e^(2x), f″ = 4e^(2x), f‴ = 8e^(2x).',
      },
    },
  },
  24: {
    title: 'The Differential of a Function',
    topics: [
      'The Concept of the Differential of a Function',
      'The Geometric Meaning of the Differential of a Function',
      'Fundamental Theorems on Differentials',
      'Table of Differentials',
      'Using Differentials in Approximate Calculations',
      'Higher-Order Differentials',
    ],
    guide: {
      summary: 'For a differentiable function, its increment is the sum of the principal linear part f′(x)Δx and a remainder that is infinitesimal relative to Δx. The differential dy=f′(x)dx is used to approximate a small change in the function linearly, and higher-order differentials are obtained by repeated differentiation.',
      keyIdea: 'The differential is the best linear approximation to a small increment of a function.',
      formula: '\\Delta y=f\'(x)\\Delta x+o(\\Delta x)\\ (\\Delta x\\to0),\\qquad dy=f\'(x)\\,dx',
      question: 'How can a differential be used to approximate f(x+Δx) from known values of f(x) and f′(x)?',
    },
    detail: {
      hook: 'An exact computation may be expensive even though the argument has changed only slightly. The differential provides a simple linear replacement with a small, well-understood error.',
      explanation: [
        'For a differentiable function, as Δx→0 we have Δy = f′(x)Δx+o(Δx). The principal linear part dy = f′(x)dx is called the differential, where dx = Δx is usually taken for an independent variable.',
        'This yields the approximation f(x+Δx) ≈ f(x)+f′(x)Δx. Its absolute error is of smaller order than Δx, although the quality of the numerical approximation still depends on the size of the increment and the behavior of higher derivatives.',
      ],
      terms: [
        { term: 'Increment of a function', definition: 'The exact difference Δy = f(x+Δx)−f(x).' },
        { term: 'Differential', definition: 'The part of the increment that is linear in dx: dy = f′(x)dx.' },
        { term: 'Linearization', definition: 'Replacement of a function near a point by its tangent line f(x₀)+f′(x₀)(x−x₀).' },
        { term: 'Relative error', definition: 'The ratio of the absolute error to the magnitude of a nonzero exact value, or of a value treated as exact.' },
      ],
      example: {
        title: 'Approximating a Square Root',
        problem: 'Estimate √4.1 using the differential of f(x) = √x at x = 4.',
        steps: [
          'Take x = 4 and Δx = 0.1, with f(4) = 2.',
          'The derivative is f′(x) = 1/(2√x), so f′(4) = 1/4.',
          'The differential is dy = (1/4)·0.1 = 0.025.',
          'The linearization gives √4.1 ≈ 2+0.025 = 2.025.',
        ],
        answer: '√4.1 ≈ 2.025.',
      },
      pitfall: 'An approximate-equality sign cannot be replaced by an equality sign without an error estimate. Use the differential for small Δx and, when accuracy matters, control the remainder using higher derivatives.',
      practice: {
        question: 'Use the linearization of ∛x at x = 8 to estimate ∛8.12.',
        answer: 'f(8) = 2, f′(8) = 1/12, and Δx = 0.12, so ∛8.12 ≈ 2+0.01 = 2.01.',
      },
    },
  },
  25: {
    title: 'Analyzing Functions with Derivatives',
    topics: [
      'Selected Theorems on Differentiable Functions',
      'L’Hôpital\'s Rules',
      'Increasing and Decreasing Functions',
      'Maximum and Minimum of Functions',
      'Greatest and Least Values of a Function on a Closed Interval',
      'Concavity of a Function Graph. Inflection Points',
      'Asymptotes of a Function Graph',
      'General Procedure for Analyzing a Function and Sketching Its Graph',
    ],
    guide: {
      summary: 'The sign of the first derivative determines intervals of monotonicity and helps locate extrema, while the second derivative describes changes in slope and makes it possible to study concavity and inflection points. Limits reveal asymptotes, and L’Hôpital\'s rules, when their hypotheses are satisfied, reduce certain indeterminate forms to a limit of a quotient of derivatives.',
      keyIdea: 'Derivatives translate geometric features of a graph into verifiable sign and limit conditions.',
      formula: 'f\'(x)>0\\text{ for all }x\\in I\\Rightarrow f\\text{ is strictly increasing on }I',
      question: 'Which points must be checked along with the critical points when finding the greatest and least values of a function on a closed interval?',
    },
    detail: {
      hook: 'A formula alone makes it difficult to see every turn of a graph, its extrema, and its asymptotes. Derivatives turn graph sketching into a sequence of verifiable tests.',
      explanation: [
        'Rolle\'s, Lagrange\'s, and Cauchy\'s theorems relate the average change of a function to its derivative inside an interval. The sign of f′ determines intervals of monotonicity, and a change of that sign at a critical point classifies a local extremum.',
        'The sign of f″ describes how the slope changes, while a change in concavity at a point of the graph identifies an inflection point. Limits locate vertical, horizontal, and oblique asymptotes; L’Hôpital\'s rules apply to the forms 0/0 and ∞/∞ only when their hypotheses are satisfied.',
      ],
      terms: [
        { term: 'Critical point', definition: 'An interior point of the domain at which the derivative is zero or does not exist.' },
        { term: 'Local extremum', definition: 'A function value that is greatest or least compared with all sufficiently nearby values.' },
        { term: 'Inflection point', definition: 'A point of the graph at which the character of concavity changes.' },
        { term: 'Asymptote', definition: 'A line whose distance from a point M on an unbounded branch of the graph tends to zero as |M|→∞.' },
      ],
      example: {
        title: 'Complete Analysis of a Cubic Function',
        problem: 'Find the intervals of monotonicity, extrema, and inflection point of f(x) = x³−3x.',
        steps: [
          'f′(x) = 3x²−3 = 3(x−1)(x+1), so the critical points are −1 and 1.',
          'The sign of f′ is positive on (−∞,−1) and (1,+∞), and negative on (−1,1).',
          'Therefore f increases, then decreases, and then increases again.',
          'f(−1) = 2 is a local maximum, while f(1) = −2 is a local minimum.',
          'f″(x) = 6x changes sign at x = 0, so (0,0) is an inflection point.',
        ],
        answer: 'Increasing on (−∞,−1) and (1,+∞), decreasing on (−1,1), local maximum at (−1,2), local minimum at (1,−2), and inflection point at (0,0).',
      },
      pitfall: 'The equality f′(x₀) = 0 by itself does not guarantee an extremum: for x³, the derivative is zero at the origin, yet the function continues to increase. Check for a sign change in f′ or apply a sufficient criterion involving the first higher derivative that is nonzero.',
      practice: {
        question: 'Find the least value of f(x) = x²−4x+1 on the real line.',
        answer: 'f′(x) = 2x−4 is zero at x = 2, and f″ = 2 > 0, so the minimum is f(2) = −3.',
      },
    },
  },
  26: {
    title: 'Taylor’s Formula',
    topics: ['Taylor’s Formula for a Polynomial', 'Taylor’s Formula for an Arbitrary Function'],
    guide: {
      summary: 'The Taylor polynomial of order n at a has degree at most n and the same derivative values through order n as the original function. The remainder describes the approximation error and, under sufficient smoothness, can be written in Lagrange form using the derivative of order n+1.',
      keyIdea: 'Taylor’s formula replaces a smooth function locally by a polynomial with a controlled error.',
      formula: 'f(x)=\\sum_{k=0}^{n}\\frac{f^{(k)}(a)}{k!}(x-a)^k+R_n(x)',
      question: 'Why is the coefficient of (x−a)^k in the Taylor polynomial equal to f⁽ᵏ⁾(a)/k!?',
    },
    detail: {
      hook: 'Near a point, a complicated smooth function behaves almost like a polynomial. Taylor’s formula displays that polynomial and accounts separately for the error of the replacement.',
      explanation: [
        'The Taylor polynomial of order n centered at a is constructed from the values f(a), f′(a), …, f⁽ⁿ⁾(a), with coefficients 1/k!, and has degree at most n. Its derivatives through order n at a agree with those of the original function.',
        'The equality f(x) = Σₖ₌₀ⁿ f⁽ᵏ⁾(a)(x−a)ᵏ/k! + Rₙ(x) becomes an estimation tool once a form of the remainder is chosen. If f has n+1 continuous derivatives on the interval between a and x, the Lagrange remainder is f⁽ⁿ⁺¹⁾(ξ)(x−a)ⁿ⁺¹/(n+1)! for some ξ between a and x.',
      ],
      terms: [
        { term: 'Taylor polynomial', definition: 'A polynomial matching a function and its derivatives through a prescribed order at the center of expansion.' },
        { term: 'Maclaurin series', definition: 'A Taylor expansion centered at a = 0.' },
        { term: 'Remainder term', definition: 'The difference between the exact function value and the chosen Taylor polynomial.' },
        { term: 'Order of approximation', definition: 'The power of the small increment at which the approximation error first appears.' },
      ],
      example: {
        title: 'Approximating the Exponential Function',
        problem: 'Approximate e^(0.1) with the third-degree Maclaurin polynomial.',
        steps: [
          'For eˣ, all derivatives at zero equal 1.',
          'The third-degree polynomial is 1+x+x²/2+x³/6.',
          'Substitute x = 0.1: 1+0.1+0.01/2+0.001/6.',
          'The sum is approximately 1.1051667.',
        ],
        answer: 'Using the third-degree polynomial, e^(0.1) ≈ 1.1051667.',
      },
      pitfall: 'It is easy to omit the factorial in the coefficients or to use powers of x instead of x−a. First write the center a and the general term f⁽ᵏ⁾(a)(x−a)ᵏ/k! explicitly, then substitute the derivatives.',
      practice: {
        question: 'Write the Maclaurin polynomial for sin x through degree 3.',
        answer: 'P₃(x) = x−x³/6.',
      },
    },
  },
  27: {
    title: 'The Concept and Representations of Complex Numbers',
    topics: ['Basic Concepts', 'Geometric Representation of Complex Numbers', 'Forms of Complex-Number Representation'],
    guide: {
      summary: 'A complex number has the form z=x+iy, where i²=−1, while x and y are its real and imaginary parts. In the complex plane, a number is represented by a point or a position vector and can be written in algebraic, trigonometric, and exponential forms.',
      keyIdea: 'For a nonzero number, the modulus gives the distance to the origin, while the argument gives the direction of the position vector up to the addition of 2πk.',
      formula: 'z=x+iy=r(\\cos\\varphi+i\\sin\\varphi)=re^{i\\varphi}',
      question: 'Why is the argument of a nonzero complex number not determined by a unique real number?',
    },
    detail: {
      hook: 'The equation x²+1 = 0 has no real root, but the calculation does not end there. Complex numbers extend the real line to a plane while preserving the familiar algebraic operations.',
      explanation: [
        'A complex number is written as z = x+iy, where i² = −1 and x and y are the real and imaginary parts. Two complex numbers are equal exactly when both corresponding parts are equal, and each number is represented by the point (x,y) in the complex plane.',
        'The modulus is r = √(x²+y²), while the argument of a nonzero number gives the direction of its position vector up to 2πk. Thus z has the trigonometric form r(cos φ+i sin φ) and the exponential form r e^(iφ).',
      ],
      terms: [
        { term: 'Imaginary unit', definition: 'The number i defined by the equality i² = −1.' },
        { term: 'Modulus of a complex number', definition: 'The nonnegative distance √(x²+y²) from the point z = x+iy to the origin.' },
        { term: 'Argument', definition: 'Any angle φ giving the direction of a nonzero complex number, determined up to 2πk.' },
        { term: 'Complex conjugate', definition: 'The number z̄ = x−iy obtained by reflecting z = x+iy across the real axis.' },
      ],
      example: {
        title: 'Conversion to Polar Form',
        problem: 'Express z = −1+i√3 in trigonometric and exponential forms.',
        steps: [
          'The modulus is r = √((−1)²+(√3)²) = 2.',
          'The point lies in the second quadrant, and the reference angle is π/3.',
          'The principal argument may be taken as φ = 2π/3.',
          'Substitute r and φ into both forms of representation.',
        ],
        answer: 'z = 2(cos(2π/3)+i sin(2π/3)) = 2e^(i·2π/3).',
      },
      pitfall: 'The value arctan(y/x), if used without regard to the quadrant, may produce an argument differing by π. First note the signs of x and y in the complex plane, then choose an angle in the correct quadrant.',
      practice: {
        question: 'For z = 3−4i, find the modulus and the complex conjugate.',
        answer: '|z| = 5, and z̄ = 3+4i.',
      },
    },
  },
};
