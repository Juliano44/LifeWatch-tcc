import { PiUsersFill, PiPlusBold } from 'react-icons/pi';
import './CategoryPage.css';
import './SharingPage.css';

const sharedWith = [
  { name: 'Dra. Helena Martins', role: 'Cardiologista', initials: 'HM', color: '#FF3B5C' },
  { name: 'Marcos Silva', role: 'Familiar', initials: 'MS', color: '#269DDB' },
];

const sharingYou = [{ name: 'Joana Alves', role: 'Mãe', initials: 'JA', color: '#8861E8' }];

function SharingPage() {
  return (
    <section className="category-page">
      <header className="category-page__header">
        <div className="category-page__icon" style={{ background: '#269DDB' }}>
          <PiUsersFill aria-hidden="true" />
        </div>
        <div>
          <h2 className="category-page__title">Compartilhamento</h2>
          <p className="category-page__subtitle">
            Escolha com quem seus dados de saúde são compartilhados.
          </p>
        </div>
      </header>

      <div className="cat-panel">
        <h3 className="cat-panel__title">Você está compartilhando com</h3>
        <ul className="sharing-list">
          {sharedWith.map((person) => (
            <li className="sharing-list__item" key={person.name}>
              <span className="sharing-list__avatar" style={{ background: person.color }}>
                {person.initials}
              </span>
              <span className="sharing-list__info">
                <strong>{person.name}</strong>
                <small>{person.role}</small>
              </span>
              <span className="sharing-list__status">Ativo</span>
            </li>
          ))}
        </ul>
        <button className="sharing-add" type="button">
          <PiPlusBold aria-hidden="true" />
          Compartilhar com alguém
        </button>
      </div>

      <div className="cat-panel">
        <h3 className="cat-panel__title">Compartilhando com você</h3>
        <ul className="sharing-list">
          {sharingYou.map((person) => (
            <li className="sharing-list__item" key={person.name}>
              <span className="sharing-list__avatar" style={{ background: person.color }}>
                {person.initials}
              </span>
              <span className="sharing-list__info">
                <strong>{person.name}</strong>
                <small>{person.role}</small>
              </span>
              <span className="sharing-list__status">Ativo</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default SharingPage;
