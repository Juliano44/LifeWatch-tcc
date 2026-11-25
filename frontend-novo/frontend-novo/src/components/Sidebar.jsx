import { useState } from 'react';
import {
  PiPencilSimpleFill,
  PiMagnifyingGlass,
  PiHeartFill,
  PiUsersFill,
  PiUserCircleFill,
  PiMoonFill,
  PiSunFill,
  PiCaretDownFill,
  PiSidebarSimpleFill,
  PiXFill,
  PiSignOutBold,
} from 'react-icons/pi';
import { categories } from '../data/healthData';
import { CategoryIcon } from './iconMap';
import { useTheme } from '../context/ThemeContext';
import './Sidebar.css';

function Sidebar({
  selected,
  onSelect,
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile,
  onLogout,
}) {
  const { isDark, toggleTheme } = useTheme();
  const [search, setSearch] = useState('');
  const [categoriesOpen, setCategoriesOpen] = useState(true);

  const filteredCategories = categories.filter((c) =>
    c.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {mobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}
      <aside
        className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''} ${
          mobileOpen ? 'sidebar--mobile-open' : ''
        }`}
        aria-label="Navegação de categorias de saúde"
      >
        <div className="sidebar__top">
          <button className="sidebar__edit-btn" type="button">
            <PiPencilSimpleFill aria-hidden="true" />
            {!collapsed && <span>Editar</span>}
          </button>

          <button
            className="sidebar__collapse-btn"
            type="button"
            onClick={onToggleCollapse}
            aria-label={collapsed ? 'Expandir barra lateral' : 'Recolher barra lateral'}
          >
            <PiSidebarSimpleFill aria-hidden="true" />
          </button>

          <button
            className="sidebar__close-mobile"
            type="button"
            onClick={onCloseMobile}
            aria-label="Fechar menu"
          >
            <PiXFill aria-hidden="true" />
          </button>
        </div>

        <div className="sidebar__search">
          <PiMagnifyingGlass className="sidebar__search-icon" aria-hidden="true" />
          {!collapsed && (
            <input
              type="search"
              placeholder="Buscar"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Buscar categoria de saúde"
            />
          )}
        </div>

        <nav className="sidebar__nav">
          <button
            type="button"
            className={`sidebar__item ${selected === 'resumo' ? 'sidebar__item--selected' : ''}`}
            onClick={() => onSelect('resumo')}
          >
            <span className="sidebar__item-icon" style={{ color: '#FF3B5C' }}>
              <PiHeartFill aria-hidden="true" />
            </span>
            {!collapsed && <span className="sidebar__item-label">Resumo</span>}
          </button>

          <button
            type="button"
            className={`sidebar__item ${
              selected === 'compartilhamento' ? 'sidebar__item--selected' : ''
            }`}
            onClick={() => onSelect('compartilhamento')}
          >
            <span className="sidebar__item-icon" style={{ color: '#269DDB' }}>
              <PiUsersFill aria-hidden="true" />
            </span>
            {!collapsed && <span className="sidebar__item-label">Compartilhamento</span>}
          </button>

          <button
            type="button"
            className={`sidebar__item ${selected === 'perfil' ? 'sidebar__item--selected' : ''}`}
            onClick={() => onSelect('perfil')}
            title={collapsed ? 'Perfil' : undefined}
          >
            <span className="sidebar__item-icon" style={{ color: '#8861E8' }}>
              <PiUserCircleFill aria-hidden="true" />
            </span>
            {!collapsed && <span className="sidebar__item-label">Perfil</span>}
          </button>

          <div className="sidebar__section">
            <button
              type="button"
              className="sidebar__section-header"
              onClick={() => setCategoriesOpen((v) => !v)}
              aria-expanded={categoriesOpen}
            >
              {!collapsed && <span>Categorias de Saúde</span>}
              <PiCaretDownFill
                className={`sidebar__section-caret ${
                  categoriesOpen ? '' : 'sidebar__section-caret--closed'
                }`}
                aria-hidden="true"
              />
            </button>

            {categoriesOpen && (
              <ul className="sidebar__list">
                {filteredCategories.map((cat) => (
                  <li key={cat.id}>
                    <button
                      type="button"
                      className={`sidebar__item ${
                        selected === cat.id ? 'sidebar__item--selected' : ''
                      }`}
                      onClick={() => onSelect(cat.id)}
                      title={collapsed ? cat.label : undefined}
                    >
                      <span className="sidebar__item-icon" style={{ color: cat.color }}>
                        <CategoryIcon name={cat.icon} aria-hidden="true" />
                      </span>
                      {!collapsed && <span className="sidebar__item-label">{cat.label}</span>}
                    </button>
                  </li>
                ))}
                {filteredCategories.length === 0 && !collapsed && (
                  <li className="sidebar__empty">Nenhuma categoria encontrada</li>
                )}
              </ul>
            )}
          </div>
        </nav>

        <div className="sidebar__footer">
          <button
            type="button"
            className="sidebar__item"
            onClick={toggleTheme}
            title={collapsed ? (isDark ? 'Modo claro' : 'Modo escuro') : undefined}
          >
            <span className="sidebar__item-icon">
              {isDark ? <PiSunFill aria-hidden="true" /> : <PiMoonFill aria-hidden="true" />}
            </span>
            {!collapsed && (
              <span className="sidebar__item-label">{isDark ? 'Modo claro' : 'Modo escuro'}</span>
            )}
          </button>

          <button
            type="button"
            className="sidebar__item sidebar__logout"
            onClick={onLogout}
            title={collapsed ? 'Sair' : undefined}
          >
            <span className="sidebar__item-icon">
              <PiSignOutBold aria-hidden="true" />
            </span>
            {!collapsed && <span className="sidebar__item-label">Sair</span>}
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
