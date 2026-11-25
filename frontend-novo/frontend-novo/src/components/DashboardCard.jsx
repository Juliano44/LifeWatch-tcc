import { PiCaretRightFill } from 'react-icons/pi';
import './DashboardCard.css';

function DashboardCard({ icon, iconColor, title, time, onClick, className = '', children }) {
  const Tag = onClick ? 'button' : 'div';

  return (
    <Tag
      className={`dcard ${className}`}
      onClick={onClick}
      type={onClick ? 'button' : undefined}
    >
      <div className="dcard__header">
        <div className="dcard__title-group">
          {icon && (
            <span className="dcard__icon" style={{ color: iconColor }}>
              {icon}
            </span>
          )}
          <span className="dcard__title">{title}</span>
        </div>
        <div className="dcard__meta">
          {time && <span className="dcard__time">{time}</span>}
          {onClick && <PiCaretRightFill className="dcard__caret" aria-hidden="true" />}
        </div>
      </div>
      <div className="dcard__body">{children}</div>
    </Tag>
  );
}

export default DashboardCard;
