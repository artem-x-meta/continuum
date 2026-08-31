import katex from 'katex';

type MathProps = {
  children: string;
  block?: boolean;
  className?: string;
};

export function Math({ children, block = false, className = '' }: MathProps) {
  const html = katex.renderToString(children, {
    displayMode: block,
    throwOnError: false,
    strict: false,
    output: 'htmlAndMathml',
  });

  return (
    <span
      className={`${block ? 'math math--block' : 'math'} ${className}`.trim()}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
