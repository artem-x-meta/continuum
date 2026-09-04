import { Check, Target } from 'lucide-react';
import { useLocale } from '../../i18n/LocaleContext';

/**
 * Лаборатории показывали модель, но ничего не спрашивали: подсказка под
 * графиком описывала происходящее, а проверить себя было негде.
 * Задание даёт цель, которую видно по тем же показаниям.
 */
export function LabTask({ text, done }: { text: string; done: boolean }) {
  const c = useLocale().copy.labs;
  return (
    <p className={done ? 'lab-task is-done' : 'lab-task'}>
      {done ? <Check size={15} aria-hidden="true" /> : <Target size={15} aria-hidden="true" />}
      <span><b>{c.task}</b> {text}</span>
      <strong role="status" aria-live="polite">{done ? c.taskDone : ''}</strong>
    </p>
  );
}
