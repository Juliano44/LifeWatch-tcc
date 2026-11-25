import { PiListFill } from 'react-icons/pi';
import './ProfileHeader.css';

function ProfileHeader({ user, name, photo, lastSync, onOpenMobileMenu, onOpenProfile }) {
  const shownName = name || user.name;
  const initials = user.avatar_initials || shownName?.[0]?.toUpperCase() || '?';
  return (
    <header className="profile-header">
      <button
        className="profile-header__menu-btn"
        type="button"
        onClick={onOpenMobileMenu}
        aria-label="Abrir menu de categorias"
      >
        <PiListFill aria-hidden="true" />
      </button>

      <div className="profile-header__avatar" aria-hidden="true">
        {photo ? <img src={photo} alt="" /> : initials}
      </div>

      <div className="profile-header__info">
        <h1 className="profile-header__name">{shownName}</h1>
        <button className="profile-header__link" type="button" onClick={onOpenProfile}>
          Perfil <span aria-hidden="true">›</span>
        </button>
        <p className="profile-header__sync">
          {lastSync ? `Última sincronização: ${lastSync}` : 'Ainda sem sincronização'}
        </p>
      </div>
    </header>
  );
}

export default ProfileHeader;
