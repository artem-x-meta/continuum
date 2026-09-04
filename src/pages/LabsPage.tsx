import { MatrixLab } from '../components/labs/MatrixLab';
import { DerivativeLab } from '../components/labs/DerivativeLab';
import { RiemannLab } from '../components/labs/RiemannLab';
import { FourierLab } from '../components/labs/FourierLab';
import { useLocale } from '../i18n/LocaleContext';

export function LabsPage() {
  const { copy } = useLocale();
  const c = copy.labsPage;
  return (
    <main className="labs-page page-width">
      <header className="labs-page__hero">
        <span className="eyebrow">{c.kicker}</span>
        <h1>{c.title}</h1>
        <p>{c.text}</p>
      </header>
      <div className="labs-page__grid">
        <MatrixLab />
        <DerivativeLab />
        <RiemannLab />
        <FourierLab />
      </div>
    </main>
  );
}
