import { useEffect, useRef } from 'react';
import { PiXFill } from 'react-icons/pi';
import { allHealthData } from '../data/healthData';
import { CategoryIcon } from './iconMap';
import './HealthDataModal.css';

function HealthDataModal({ onClose }) {
  const closeBtnRef = useRef(null);

  useEffect(() => {
    closeBtnRef.current?.focus();
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div className="health-modal-overlay" onClick={onClose}>
      <div
        className="health-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="health-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="health-modal__header">
          <h2 id="health-modal-title">Todos os Dados de Saúde</h2>
          <button
            ref={closeBtnRef}
            className="health-modal__close"
            type="button"
            onClick={onClose}
            aria-label="Fechar"
          >
            <PiXFill aria-hidden="true" />
          </button>
        </div>

        <ul className="health-modal__list">
          {allHealthData.map((item) => (
            <li key={item.label} className="health-modal__item">
              <span className="health-modal__item-icon" style={{ color: item.color }}>
                <CategoryIcon name={item.icon} aria-hidden="true" />
              </span>
              <span className="health-modal__item-label">{item.label}</span>
              <span className="health-modal__item-value">
                {item.value} <small>{item.unit}</small>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HealthDataModal;
