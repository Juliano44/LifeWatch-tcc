import { PiSquaresFourFill, PiCaretRightFill } from 'react-icons/pi';
import './ShowAllDataBar.css';

function ShowAllDataBar({ onClick }) {
  return (
    <button className="show-all-bar" type="button" onClick={onClick}>
      <span className="show-all-bar__icon">
        <PiSquaresFourFill aria-hidden="true" />
      </span>
      <span className="show-all-bar__label">Mostrar Todos os Dados de Saúde</span>
      <PiCaretRightFill className="show-all-bar__caret" aria-hidden="true" />
    </button>
  );
}

export default ShowAllDataBar;
