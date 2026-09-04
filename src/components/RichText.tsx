import { Fragment } from 'react';
import { Math } from './Math';

/**
 * Проза с формулами: фрагменты между одинарными `$` набираются KaTeX.
 * До этого вся математика внутри абзацев была юникодом («∫ₐˣf(t)dt»),
 * а матрицы — массивами JavaScript, и рядом стояла одна безупречно
 * свёрстанная опорная формула.
 */
export function splitMath(source: string) {
  return source.split('$').map((piece, index) => ({ text: piece, math: index % 2 === 1 }));
}

export function hasMath(source: string) {
  return source.includes('$');
}

/** Текст без разметки — для поискового индекса, заголовков и alt-подписей. */
export function plainMath(source: string) {
  return source.replaceAll('$', '');
}

export function RichText({ children }: { children: string }) {
  if (!hasMath(children)) return <>{children}</>;
  return (
    <>
      {splitMath(children).map((piece, index) => (
        <Fragment key={index}>
          {piece.math ? <Math>{piece.text}</Math> : piece.text}
        </Fragment>
      ))}
    </>
  );
}
