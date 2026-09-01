import { describe, expect, it } from 'vitest';
import { sectionGuides1 } from '../src/data/guides-1';
import { sectionGuides2 } from '../src/data/guides-2';
import { sectionGuides3 } from '../src/data/guides-3';
import { lessonDetails1 } from '../src/data/details-1';
import { lessonDetails2 } from '../src/data/details-2';
import { lessonDetails3 } from '../src/data/details-3';
import { englishSections1 } from '../src/data/en/sections-1';
import { englishSections2 } from '../src/data/en/sections-2';
import { englishSections3 } from '../src/data/en/sections-3';

describe('математические гипотезы не теряются в кратком изложении', () => {
  it('сохраняет условия координатных формул, пределов и интегральной замены', () => {
    expect(sectionGuides1[5].summary).toContain('ортонормированном');
    expect(englishSections1[5].guide.summary).toContain('orthonormal');
    expect(sectionGuides1[16].summary).toMatch(/x>M.*x<−M.*фиксированным знаком/);
    expect(englishSections1[16].guide.summary).toMatch(/x>M.*x<−M.*fixed sign/);
    expect(sectionGuides2[39].formula).toContain('\\varphi\\in C^1');
    expect(englishSections2[39].guide.formula).toContain('\\varphi\\in C^1');
    expect(englishSections2[40].topics.join(' ')).toContain('unbounded function');
  });

  it('строго определяет линейные ОДУ и применимость специальных методов', () => {
    expect(lessonDetails2[47].explanation.join(' ')).toContain('aₙ(x)y⁽ⁿ⁾');
    expect(englishSections2[47].detail.explanation.join(' ')).toContain('aₙ(x)y⁽ⁿ⁾');
    expect(lessonDetails2[48].explanation.join(' ')).toContain('M, N ∈ C¹(D)');
    expect(lessonDetails2[51].explanation.join(' ')).toContain('постоянными коэффициентами');
    expect(englishSections2[51].detail.explanation.join(' ')).toContain('constant-coefficient');
  });

  it('фиксирует условия векторного и комплексного анализа и Лапласа', () => {
    const gaussRu = lessonDetails3[58].explanation.join(' ');
    const gaussEn = englishSections3[58].detail.explanation.join(' ');
    expect(gaussRu).toContain('C¹');
    expect(gaussRu).toMatch(/внешн/);
    expect(gaussEn).toContain('C¹');
    expect(gaussEn).toContain('outward');
    expect(sectionGuides3[75].formula).toContain('\\operatorname{Ind}');
    expect(sectionGuides3[77].formula).toContain('\\operatorname{Ind}');
    expect(lessonDetails3[78].explanation.join(' ')).toContain('Хевисайда');
    expect(englishSections3[78].detail.explanation.join(' ')).toContain('Heaviside');
    expect(sectionGuides3[80].formula).toContain('(0+)');
    expect(englishSections3[80].guide.formula).toContain('(0+)');
  });
});
