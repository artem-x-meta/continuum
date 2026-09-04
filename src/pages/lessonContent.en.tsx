import { Math } from '../components/Math';
import { ConceptCard, LearningGoals, QuickCheck, Reveal, WorkedExample } from '../components/LessonBlocks';
import { MatrixLab } from '../components/labs/MatrixLab';
import { DerivativeLab } from '../components/labs/DerivativeLab';
import { RiemannLab } from '../components/labs/RiemannLab';
import { FourierLab } from '../components/labs/FourierLab';

/**
 * Английские версии четырёх расширенных уроков. Раньше они существовали
 * только на русском, и англоязычный читатель молча получал обычный шаблон
 * на §§ 1, 20, 35 и 66 — тех самых, которые README называет ключевыми.
 */

export function MatricesLessonEn() {
  return (
    <>
      <LearningGoals items={[
        'read the size and the entries of a matrix',
        'add matrices and multiply them by a number',
        'see a matrix product as a composition of transformations',
        'predict the geometric effect of a 2 × 2 matrix',
      ]} />

      <section id="experiment">
        <h2>Act first</h2>
        <p>A matrix need not be a mere table for storing numbers. The matrix <Math>{'A=\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix}'}</Math> takes a vector and turns it into a new one. Its two columns show where the basis vectors land.</p>
        <MatrixLab />
      </section>

      <section id="definition">
        <h2>What a matrix is</h2>
        <p>A <strong>matrix</strong> is a rectangular table of numbers. If it has <Math>m</Math> rows and <Math>n</Math> columns, its size is said to be <Math>{'m\\times n'}</Math>.</p>
        <Math block>{'A=(a_{ij})_{m\\times n}=\\begin{pmatrix}a_{11}&a_{12}&\\cdots&a_{1n}\\\\a_{21}&a_{22}&\\cdots&a_{2n}\\\\\\vdots&\\vdots&\\ddots&\\vdots\\\\a_{m1}&a_{m2}&\\cdots&a_{mn}\\end{pmatrix}'}</Math>
        <p>The first index of an entry <Math>{'a_{ij}'}</Math> gives the row, the second the column. For instance, <Math>{'a_{23}'}</Math> sits in the second row and the third column.</p>
        <ConceptCard title="Equality of matrices" type="rule">
          <p>Two matrices are equal only when their sizes agree and every entry in a corresponding position agrees. The same collection of numbers is not enough: position matters.</p>
        </ConceptCard>
      </section>

      <section id="operations">
        <h2>Linear operations</h2>
        <p>Only matrices of the same size can be added, and the addition is entry by entry. Multiplying by a number applies that factor to every entry:</p>
        <Math block>{'(A+B)_{ij}=a_{ij}+b_{ij},\\qquad (\\lambda A)_{ij}=\\lambda a_{ij}'}</Math>
        <WorkedExample number="01" title="A linear combination of matrices">
          <p>Let <Math>{'A=\\begin{pmatrix}1&-2\\\\3&0\\end{pmatrix}'}</Math> and <Math>{'B=\\begin{pmatrix}4&1\\\\-1&2\\end{pmatrix}'}</Math>. Find <Math>2A-B</Math>.</p>
          <Math block>{'2A-B=\\begin{pmatrix}2&-4\\\\6&0\\end{pmatrix}-\\begin{pmatrix}4&1\\\\-1&2\\end{pmatrix}=\\begin{pmatrix}-2&-5\\\\7&-2\\end{pmatrix}'}</Math>
          <p>The check is easy: all three matrices are <Math>{'2\\times2'}</Math>, and every position was computed independently of the others.</p>
        </WorkedExample>
      </section>

      <section id="multiplication">
        <h2>Why the product is not entry by entry</h2>
        <p>The product <Math>AB</Math> has to describe two linear actions performed in order: first <Math>B</Math>, then <Math>A</Math>. That is why an entry of the result is the dot product of a row of the first matrix with a column of the second.</p>
        <Math block>{'c_{ij}=\\sum_{k=1}^{n}a_{ik}b_{kj}'}</Math>
        <ConceptCard title="The shapes have to match" type="rule"><p>If <Math>A</Math> is <Math>{'m\\times n'}</Math> and <Math>B</Math> is <Math>{'n\\times p'}</Math>, then <Math>AB</Math> exists and is <Math>{'m\\times p'}</Math>. The inner dimensions must coincide.</p></ConceptCard>
        <ConceptCard title="Order cannot be swapped" type="mistake"><p>In general <Math>{'AB\\ne BA'}</Math>. Matrices encode actions, and “rotate, then stretch” is not the same as “stretch, then rotate”.</p></ConceptCard>
      </section>

      <QuickCheck
        question="What is the size of the product of A₃ₓ₂ and B₂ₓ₄?"
        correctIndex={1}
        options={[
          { label: '2 × 2', explanation: 'The inner dimensions of 2 do agree, but it is the outer ones that survive: 3 and 4.' },
          { label: '3 × 4', explanation: 'The outer dimensions give the result: three rows from A and four columns from B.' },
          { label: 'The product does not exist', explanation: 'It does: the number of columns of A equals the number of rows of B.' },
        ]}
      />

      <section id="practice">
        <h2>Try it yourself</h2>
        <ol className="practice-list">
          <li>For <Math>{'A=\\begin{pmatrix}2&0&-1\\\\4&3&5\\end{pmatrix}'}</Math> name the size, <Math>{'a_{13}'}</Math> and <Math>{'a_{22}'}</Math>.</li>
          <li>Compute <Math>A+B</Math> for <Math>{'A=\\begin{pmatrix}1&2\\\\0&-1\\end{pmatrix}'}</Math>, <Math>{'B=\\begin{pmatrix}3&-2\\\\4&1\\end{pmatrix}'}</Math>.</li>
          <li>Describe geometrically what <Math>{'\\begin{pmatrix}-1&0\\\\0&1\\end{pmatrix}'}</Math> does.</li>
        </ol>
        <Reveal label="Check the answers">
          <ol><li>Size <Math>{'2\\times3'}</Math>, <Math>{'a_{13}=-1'}</Math>, <Math>{'a_{22}=3'}</Math>.</li><li><Math>{'A+B=\\begin{pmatrix}4&0\\\\4&0\\end{pmatrix}'}</Math>.</li><li>It reflects the plane in the <Math>Oy</Math> axis: the first coordinate changes sign.</li></ol>
        </Reveal>
      </section>
    </>
  );
}

export function DerivativeLessonEn() {
  return (
    <>
      <LearningGoals items={['see the derivative as an instantaneous rate of change', 'pass from a secant to a tangent line', 'compute a derivative from the definition in simple cases', 'read the sign of the derivative off a graph']} />
      <section id="experiment"><h2>From average speed to instantaneous speed</h2><p>Two points of a graph determine a secant line. If the function is differentiable at the chosen point, then as the points approach each other the slope of the secant tends to the slope of the tangent.</p><DerivativeLab /></section>
      <section id="definition"><h2>The limit of the difference quotient</h2><p>Write <Math>h</Math> for the increment of the argument. The increment of the function is then <Math>f(x+h)-f(x)</Math>, and their ratio is the average rate of change over a short interval.</p><Math block>{"f'(x)=\\lim_{h\\to0}\\frac{f(x+h)-f(x)}{h}"}</Math><ConceptCard title="One quantity, three readings" type="idea"><p>Algebraically it is the limit of a ratio of increments; geometrically it is the slope of the tangent line; physically it is instantaneous velocity, when the function gives a coordinate.</p></ConceptCard></section>
      <WorkedExample number="01" title="The derivative of a square, from the definition"><p>For <Math>f(x)=x^2</Math>:</p><Math block>{"\\frac{(x+h)^2-x^2}{h}=\\frac{2xh+h^2}{h}=2x+h"}</Math><p>Letting <Math>h</Math> tend to zero gives <Math>{"f'(x)=2x"}</Math>. Dividing by <Math>h</Math> before the limit is legitimate, because inside the quotient <Math>{'h\\ne0'}</Math>.</p></WorkedExample>
      <section id="meaning"><h2>What the sign of the derivative tells you</h2><p>A positive derivative means the function is locally increasing, a negative one that it is decreasing. Zero marks a horizontal tangent, but does not guarantee an extremum.</p><ConceptCard title="A zero derivative is only a candidate" type="mistake"><p>For <Math>f(x)=x^3</Math> the derivative vanishes at zero, yet the function keeps increasing. To confirm a maximum or a minimum you have to examine how the sign changes.</p></ConceptCard></section>
      <QuickCheck question="If f′(2) = −3, what does that mean geometrically?" correctIndex={2} options={[{ label: 'The graph must lie below the Ox axis', explanation: 'The value of a function and the slope of its tangent are different things: the derivative says nothing about the sign of the function itself.' }, { label: 'The function has a minimum at x = 2', explanation: 'At an interior minimum the derivative of a differentiable function has to vanish — that is Fermat’s theorem.' }, { label: 'The tangent line there has slope −3', explanation: 'Correct: the tangent slopes downward, and increasing x by one lowers its height by exactly 3, and the value of the function by roughly the same.' }]} />
    </>
  );
}

export function RiemannLessonEn() {
  return (
    <>
      <LearningGoals items={['assemble a Riemann sum over a partition', 'explain the role of the limit', 'tell geometric area from oriented area', 'estimate the error of a numerical approximation']} />
      <section id="experiment"><h2>Area as the limit of a sum</h2><p>A curved region is hard to measure whole, but easy to cover with narrow rectangles. The finer the partition, the smaller the pieces left unaccounted for.</p><RiemannLab /></section>
      <section id="definition"><h2>The Riemann sum</h2><p>Split <Math>[a,b]</Math> into parts of width <Math>{'\\Delta x_i'}</Math> and pick a point <Math>{'\\xi_i'}</Math> inside each one. The total local contribution is</p><Math block>{'S_n=\\sum_{i=1}^{n} f(\\xi_i)\\,\\Delta x_i'}</Math><p>If the sums tend to one and the same number as any partition is refined, that number is called the definite integral.</p><Math block>{'\\int_a^b f(x)\\,dx=\\lim_{\\max \\Delta x_i\\to0}\\sum_{i=1}^{n}f(\\xi_i)\\Delta x_i'}</Math></section>
      <ConceptCard title="dx is not decoration" type="idea"><p>The symbol <Math>dx</Math> records which variable the accumulation runs over and where the width of a small element comes from. A change of variable changes the differential too.</p></ConceptCard>
      <section id="oriented"><h2>Area with a sign</h2><p>A Riemann sum adds products <Math>{'f(\\xi_i)\\,\\Delta x_i'}</Math>, not areas of pieces. Wherever the function is negative the term is negative, so a definite integral gives <strong>oriented</strong> area: parts below the axis enter with a minus sign.</p><Math block>{'\\int_{-1}^{1} x\\,dx = 0,\\qquad \\int_{-1}^{1}|x|\\,dx = 1'}</Math><p>Both integrals run over the same interval and the integrands look alike, but the first answers “how much accumulated” and the second “what is the geometric area”. When it is the area of a figure you want, integrate the absolute value or split the interval at the zeros of the function.</p></section>
      <section id="error"><h2>How crude a finite sum is</h2><p>The laboratory above reports not only the sum but its distance from the exact value. For the midpoint rule on a smooth function the error falls off like <Math>{'1/n^2'}</Math>: doubling the number of rectangles cuts it roughly fourfold.</p><ConceptCard title="Check it on the model" type="rule"><p>Set <Math>n = 4</Math> in the laboratory and note the error, then set <Math>n = 8</Math>. The ratio should come out close to four — that is the order of accuracy of the method, not an accident of this example.</p></ConceptCard></section>
      <QuickCheck question="Why is one very large n not enough to define the integral?" correctIndex={1} options={[{ label: 'Because n has to be odd', explanation: 'The parity of the number of parts has nothing to do with Riemann’s definition.' }, { label: 'A limit under unbounded refinement is required', explanation: 'Correct: a single finite sum may even hit the exact value by chance, but the definition demands a common limit as the mesh of the partition tends to zero.' }, { label: 'Because rectangles cannot be added', explanation: 'Their areas are exactly what a Riemann sum adds up.' }]} />
    </>
  );
}

export function FourierLessonEn() {
  return (
    <>
      <LearningGoals items={['represent a periodic signal as a sum of harmonics', 'understand what the Fourier coefficients measure', 'tell frequency, amplitude and phase apart', 'explain the Gibbs phenomenon at a jump']} />
      <section id="experiment"><h2>A complicated shape out of simple waves</h2><p>Even a square signal can be approximated by sines. Each further odd harmonic flattens the plateaus and sharpens the transition.</p><FourierLab /></section>
      <section id="definition"><h2>The trigonometric series</h2><Math block>{'f(x)\\sim\\frac{a_0}{2}+\\sum_{n=1}^{\\infty}\\left(a_n\\cos nx+b_n\\sin nx\\right)'}</Math><p>The coefficients measure how strongly the function resembles each basic wave. Because sines and cosines are orthogonal, each one can be extracted independently of the others.</p><Math block>{'a_n=\\frac1\\pi\\int_{-\\pi}^{\\pi}f(x)\\cos(nx)\\,dx,\\qquad b_n=\\frac1\\pi\\int_{-\\pi}^{\\pi}f(x)\\sin(nx)\\,dx'}</Math></section>
      <section id="amplitude"><h2>Frequency, amplitude and phase</h2><p>The two terms of one frequency fold neatly into a single wave:</p><Math block>{'a_n\\cos nx+b_n\\sin nx=A_n\\cos(nx-\\varphi_n),\\qquad A_n=\\sqrt{a_n^2+b_n^2},\\quad \\tan\\varphi_n=\\frac{b_n}{a_n}'}</Math><p>Here <Math>n</Math> is the frequency, that is, how many full oscillations fit into the interval; <Math>A_n</Math> is the amplitude, the weight of this harmonic in the sum; <Math>{'\\varphi_n'}</Math> is the phase, the shift of the wave along the axis. The collection of pairs <Math>{'(A_n, \\varphi_n)'}</Math> is called the spectrum of the function.</p><ConceptCard title="What phase changes" type="rule"><p>The amplitudes decide which waves the signal is built from; the phases decide how those waves line up against one another. Two signals with identical amplitudes but different phases contain the same frequencies and still have completely different graphs.</p></ConceptCard></section>
      <ConceptCard title="The ripples at a jump never fully vanish" type="mistake"><p>Adding harmonics squeezes the region of oscillation, but the relative overshoot remains. This is the classical Gibbs phenomenon.</p></ConceptCard>
      <QuickCheck question="Which coefficients vanish for an odd function on [−π, π]?" correctIndex={0} options={[{ label: 'All aₙ, including a₀', explanation: 'Correct: an odd function times cos(nx) stays odd, and its integral over a symmetric interval is zero.' }, { label: 'All bₙ', explanation: 'The product of the two odd functions f(x) and sin(nx) is even, so these coefficients are in general non-zero.' }, { label: 'Both aₙ and bₙ', explanation: 'Then the series would be identically zero and would not describe the function at all.' }]} />
    </>
  );
}
