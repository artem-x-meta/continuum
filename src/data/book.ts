import tocSource from '../../oglavlenie-vysshaya-matematika.md?raw';

export type Topic = {
  number: string;
  title: string;
  page: number;
};

export type BookSection = {
  number: number;
  title: string;
  page: number;
  topics: Topic[];
};

export type Chapter = {
  number: number;
  roman: string;
  title: string;
  sections: BookSection[];
};

export type ChapterMeta = {
  kicker: string;
  shortTitle: string;
  description: string;
  outcome: string;
  formula: string;
  symbol: string;
  track: string;
  accent: 'blue' | 'violet' | 'coral' | 'green';
  hours: number;
};

const romanValues: Record<string, number> = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
};

function romanToNumber(roman: string) {
  return [...roman].reduce((total, letter, index, letters) => {
    const current = romanValues[letter] ?? 0;
    const next = romanValues[letters[index + 1]] ?? 0;
    return total + (current < next ? -current : current);
  }, 0);
}

function splitPage(value: string): [string, number] {
  const match = value.trim().match(/^(.*?)\s+—\s+(\d+)$/);
  return match ? [match[1].trim(), Number(match[2])] : [value.trim(), 0];
}

export function typography(value: string) {
  return value
    .replaceAll('$', '')
    .replaceAll('\\to', '→')
    .replaceAll('\\infty', '∞')
    .replaceAll('\\int', '∫')
    .replaceAll('\\sin', 'sin')
    .replaceAll('\\cos', 'cos')
    .replaceAll('\\sqrt', '√')
    .replaceAll('\\cdot', '·')
    .replaceAll('\\,', ' ')
    .replaceAll('{', '')
    .replaceAll('}', '');
}

export function parseBook(source: string): Chapter[] {
  const chapters: Chapter[] = [];
  let chapter: Chapter | undefined;
  let section: BookSection | undefined;

  for (const rawLine of source.split(/\r?\n/)) {
    const line = rawLine.trim();
    const chapterMatch = line.match(/^## Глава ([IVXLC]+)\.\s+(.+)$/);
    if (chapterMatch) {
      chapter = {
        roman: chapterMatch[1],
        number: romanToNumber(chapterMatch[1]),
        title: typography(chapterMatch[2]),
        sections: [],
      };
      chapters.push(chapter);
      section = undefined;
      continue;
    }

    const sectionMatch = line.match(/^### §\s+(\d+)\.\s+(.+)$/);
    if (sectionMatch && chapter) {
      const [title, page] = splitPage(sectionMatch[2]);
      section = {
        number: Number(sectionMatch[1]),
        title: typography(title),
        page,
        topics: [],
      };
      chapter.sections.push(section);
      continue;
    }

    const topicMatch = line.match(/^-\s+(\d+\.\d+)\.\s+(.+)$/);
    if (topicMatch && section) {
      const [title, page] = splitPage(topicMatch[2]);
      section.topics.push({
        number: topicMatch[1],
        title: typography(title),
        page,
      });
    }
  }

  return chapters;
}

export const chapters = parseBook(tocSource);

export const chapterMeta: Record<number, ChapterMeta> = {
  1: {
    kicker: 'Структура', shortTitle: 'Линейная алгебра',
    description: 'Матрицы, определители и системы уравнений — единый язык для данных и линейных моделей.',
    outcome: 'Научишься превращать большие системы в последовательность понятных операций.',
    formula: 'A x = b', symbol: 'A', track: 'Фундамент', accent: 'blue', hours: 8,
  },
  2: {
    kicker: 'Направление', shortTitle: 'Векторная алгебра',
    description: 'Векторы, проекции и три вида произведений связывают числа с геометрией пространства.',
    outcome: 'Сможешь вычислять длины, углы, площади и объёмы через координаты.',
    formula: 'a · b = |a||b| cos α', symbol: '→', track: 'Фундамент', accent: 'green', hours: 7,
  },
  3: {
    kicker: 'Форма', shortTitle: 'Геометрия на плоскости',
    description: 'Прямые и конические сечения как множества точек, заданные уравнениями.',
    outcome: 'Научишься читать геометрию прямо из коэффициентов уравнения.',
    formula: 'Ax + By + C = 0', symbol: '○', track: 'Фундамент', accent: 'coral', hours: 7,
  },
  4: {
    kicker: 'Пространство', shortTitle: 'Геометрия в 3D',
    description: 'Плоскости, прямые и поверхности второго порядка в трёхмерной системе координат.',
    outcome: 'Сможешь решать задачи о взаимном положении объектов в пространстве.',
    formula: 'Ax + By + Cz + D = 0', symbol: '◇', track: 'Фундамент', accent: 'violet', hours: 8,
  },
  5: {
    kicker: 'Изменение', shortTitle: 'Введение в анализ',
    description: 'Предел, непрерывность и производная — три идеи, на которых держится математический анализ.',
    outcome: 'Научишься описывать поведение функции в точке и на целом промежутке.',
    formula: "f′(x) = lim Δf/Δx", symbol: '∂', track: 'Анализ', accent: 'blue', hours: 18,
  },
  6: {
    kicker: 'Расширение', shortTitle: 'Комплексные числа',
    description: 'Числа с двумя координатами, для которых вращение и умножение оказываются одной операцией.',
    outcome: 'Освоишь алгебраическую, тригонометрическую и показательную формы записи.',
    formula: 'z = r(cos φ + i sin φ)', symbol: 'i', track: 'Анализ', accent: 'violet', hours: 4,
  },
  7: {
    kicker: 'Обратный ход', shortTitle: 'Неопределённый интеграл',
    description: 'Первообразные и методы интегрирования: от таблицы до хитрых замен переменной.',
    outcome: 'Научишься распознавать структуру подынтегрального выражения и выбирать метод.',
    formula: '∫ f(x) dx = F(x) + C', symbol: '∫', track: 'Анализ', accent: 'green', hours: 10,
  },
  8: {
    kicker: 'Накопление', shortTitle: 'Определённый интеграл',
    description: 'Площадь, путь, объём и масса как предел суммы бесконечно малых вкладов.',
    outcome: 'Сможешь строить интегральную модель для геометрических и физических задач.',
    formula: '∫ₐᵇ f(x) dx = F(b) − F(a)', symbol: '∫', track: 'Анализ', accent: 'coral', hours: 9,
  },
  9: {
    kicker: 'Много измерений', shortTitle: 'Функции многих переменных',
    description: 'Поверхности, частные производные, касательные плоскости и многомерный экстремум.',
    outcome: 'Научишься исследовать зависимость результата сразу от нескольких факторов.',
    formula: 'df = fₓ dx + fᵧ dy', symbol: '∇', track: 'Анализ', accent: 'violet', hours: 7,
  },
  10: {
    kicker: 'Динамика', shortTitle: 'Дифференциальные уравнения',
    description: 'Уравнения, в которых неизвестна функция, а закон связывает её с производными.',
    outcome: 'Сможешь строить и решать базовые модели движения, роста и колебаний.',
    formula: "y′ = f(x, y)", symbol: 'ẏ', track: 'Анализ', accent: 'blue', hours: 11,
  },
  11: {
    kicker: 'Объём', shortTitle: 'Двойные и тройные интегралы',
    description: 'Суммирование по областям и телам в декартовых, полярных и сферических координатах.',
    outcome: 'Научишься находить объёмы, массы и центры тяжести многомерных объектов.',
    formula: '∬ᴰ f(x,y) dA', symbol: '∬', track: 'Накопление', accent: 'green', hours: 7,
  },
  12: {
    kicker: 'По пути', shortTitle: 'Криволинейные интегралы',
    description: 'Интегрирование вдоль кривых и по поверхностям, теоремы Грина, Гаусса и Стокса.',
    outcome: 'Увидишь, как локальные свойства поля превращаются в глобальные величины.',
    formula: '∮ F · dr', symbol: '∮', track: 'Накопление', accent: 'coral', hours: 10,
  },
  13: {
    kicker: 'Бесконечная сумма', shortTitle: 'Числовые ряды',
    description: 'Сходимость бесконечных сумм и признаки, позволяющие не вычислять сумму напрямую.',
    outcome: 'Научишься уверенно определять, имеет ли бесконечный процесс конечный результат.',
    formula: 'Σₙ₌₁∞ aₙ', symbol: 'Σ', track: 'Накопление', accent: 'blue', hours: 6,
  },
  14: {
    kicker: 'Функция как сумма', shortTitle: 'Степенные ряды',
    description: 'Ряды Тейлора и Маклорена: сложная функция собирается из простых степеней.',
    outcome: 'Сможешь приближать функции многочленами и контролировать область сходимости.',
    formula: 'f(x) = Σ aₙ(x−x₀)ⁿ', symbol: 'T', track: 'Накопление', accent: 'violet', hours: 6,
  },
  15: {
    kicker: 'Спектр', shortTitle: 'Ряды Фурье',
    description: 'Разложение сигнала на гармоники и переход от периодических функций к интегралу Фурье.',
    outcome: 'Научишься видеть в сложном колебании набор простых частот.',
    formula: 'f(x) = a₀/2 + Σ(aₙ cos nx + bₙ sin nx)', symbol: 'ƒ', track: 'Накопление', accent: 'green', hours: 6,
  },
  16: {
    kicker: 'Потоки', shortTitle: 'Теория поля',
    description: 'Градиент, дивергенция и ротор описывают направление, источники и вращение поля.',
    outcome: 'Сможешь переводить геометрическую картину поля на язык дифференциальных операций.',
    formula: '∇ = i∂ₓ + j∂ᵧ + k∂𝓏', symbol: '∇', track: 'Поля и преобразования', accent: 'coral', hours: 7,
  },
  17: {
    kicker: 'Комплексный анализ', shortTitle: 'Функции комплексного переменного',
    description: 'Аналитические функции, интеграл Коши, ряды Лорана и теория вычетов.',
    outcome: 'Увидишь, почему комплексная дифференцируемость обладает особой жёсткостью.',
    formula: 'f(z) = Σ aₙ(z−z₀)ⁿ', symbol: 'ℂ', track: 'Поля и преобразования', accent: 'violet', hours: 10,
  },
  18: {
    kicker: 'Смена языка', shortTitle: 'Операционное исчисление',
    description: 'Преобразование Лапласа превращает дифференцирование в алгебраические действия.',
    outcome: 'Научишься решать линейные дифференциальные уравнения в пространстве изображений.',
    formula: 'F(s) = ∫₀∞ f(t)e⁻ˢᵗ dt', symbol: 'ℒ', track: 'Поля и преобразования', accent: 'blue', hours: 5,
  },
};

export const tracks = [
  {
    name: 'Фундамент',
    label: '01 · Геометрия структур',
    description: 'Сначала научимся видеть форму в таблицах чисел, векторах и уравнениях.',
    chapters: [1, 2, 3, 4],
  },
  {
    name: 'Анализ',
    label: '02 · Изменение',
    description: 'Пределы, производные, интегралы и уравнения движения.',
    chapters: [5, 6, 7, 8, 9, 10],
  },
  {
    name: 'Накопление',
    label: '03 · Суммы и сигналы',
    description: 'Интегрируем в нескольких измерениях и складываем бесконечные процессы.',
    chapters: [11, 12, 13, 14, 15],
  },
  {
    name: 'Поля и преобразования',
    label: '04 · Поля и преобразования',
    description: 'Финальный маршрут связывает локальные изменения, комплексные функции и образы.',
    chapters: [16, 17, 18],
  },
] as const;

export const bookStats = {
  chapters: chapters.length,
  sections: chapters.reduce((sum, chapter) => sum + chapter.sections.length, 0),
  topics: chapters.reduce(
    (sum, chapter) => sum + chapter.sections.reduce((sectionSum, section) => sectionSum + section.topics.length, 0),
    0,
  ),
};

export function findSection(sectionNumber: number) {
  for (const chapter of chapters) {
    const section = chapter.sections.find((item) => item.number === sectionNumber);
    if (section) return { chapter, section };
  }
  return undefined;
}
