import {
  PiFlowerLotusFill,
  PiFireFill,
  PiEarFill,
  PiBrainFill,
  PiHeartFill,
  PiPillFill,
  PiRulerFill,
  PiPersonSimpleWalkFill,
  PiForkKnifeFill,
  PiWindFill,
  PiThermometerFill,
  PiBedFill,
  PiSparkleFill,
  PiDropFill,
} from 'react-icons/pi';

// Mapa central de ícones: permite guardar apenas o nome (string) nos
// dados fictícios e resolver o componente de ícone real aqui.
export const iconMap = {
  PiFlowerLotusFill,
  PiFireFill,
  PiEarFill,
  PiBrainFill,
  PiHeartFill,
  PiPillFill,
  PiRulerFill,
  PiPersonSimpleWalkFill,
  PiForkKnifeFill,
  PiWindFill,
  PiThermometerFill,
  PiBedFill,
  PiSparkleFill,
  PiDropFill,
};

export function CategoryIcon({ name, ...props }) {
  const Icon = iconMap[name];
  if (!Icon) return null;
  return <Icon {...props} />;
}
