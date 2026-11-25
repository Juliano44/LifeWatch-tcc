// Dados fictícios utilizados apenas para fins de demonstração do TCC.
// Nenhum valor aqui representa informação médica real.

export const categories = [
  { id: 'ciclo', label: 'Acompanhamento de Ciclo', icon: 'PiFlowerLotusFill', color: '#FF5F9E' },
  { id: 'atividade', label: 'Atividade', icon: 'PiFireFill', color: '#FF7A00' },
  { id: 'audicao', label: 'Audição', icon: 'PiEarFill', color: '#20D6C0' },
  { id: 'mental', label: 'Bem-estar Mental', icon: 'PiBrainFill', color: '#269DDB' },
  { id: 'coracao', label: 'Coração', icon: 'PiHeartFill', color: '#FF3B5C' },
  { id: 'medicamentos', label: 'Medicamentos', icon: 'PiPillFill', color: '#FF9F0A' },
  { id: 'medidas', label: 'Medidas Corporais', icon: 'PiRulerFill', color: '#8861E8' },
  { id: 'mobilidade', label: 'Mobilidade', icon: 'PiPersonSimpleWalkFill', color: '#32C673' },
  { id: 'nutricao', label: 'Nutrição', icon: 'PiForkKnifeFill', color: '#6FCB4D' },
  { id: 'respiracao', label: 'Respiração', icon: 'PiWindFill', color: '#20D6C0' },
  { id: 'sintomas', label: 'Sintomas', icon: 'PiThermometerFill', color: '#FF6A5F' },
  { id: 'sono', label: 'Sono', icon: 'PiBedFill', color: '#8861E8' },
];

export const profile = {
  name: 'Adriana',
  lastSync: 'Hoje, 09:41',
  initials: 'A',
};

export const activity = {
  movementCal: 375,
  movementGoal: 500,
  exerciseMin: 19,
  exerciseGoal: 30,
  standHours: 4,
  standGoal: 12,
  time: '09:41',
};

export const cycle = {
  status: 'Fadiga e Dor de Cabeça',
  updated: 'Ontem',
  day: 14,
  phase: 'Fase Folicular',
};

export const audio = {
  status: 'OK',
  time: '09:16',
  exposureLabel: 'Exposição de 7 Dias',
  levels: [38, 52, 45, 61, 40, 55, 48],
};

export const heartRate = {
  value: 62,
  unit: 'BPM',
  time: '07:00',
  series: [58, 60, 59, 63, 61, 64, 62, 65, 62],
};

export const sleep = {
  hours: 7,
  minutes: 20,
  time: '06:30',
  stages: [
    { label: 'Acordado', value: 0.3, color: '#FF9F0A' },
    { label: 'REM', value: 1.6, color: '#8861E8' },
    { label: 'Leve', value: 3.9, color: '#A98BF0' },
    { label: 'Profundo', value: 1.5, color: '#5A3FC4' },
  ],
};

export const emotional = {
  time: '09:15',
  headline: 'Um Momento Agradável',
  tags: ['Animação', 'Amizades'],
};

export const trends = [
  {
    id: 't1',
    label: 'Frequência Cardíaca',
    value: '62–98 BPM',
    change: '+4%',
    positive: false,
    color: '#FF3B5C',
    icon: 'PiHeartFill',
    series: [64, 70, 66, 74, 69, 78, 72],
  },
  {
    id: 't2',
    label: 'Sono',
    value: '7h 20min',
    change: '+12min',
    positive: true,
    color: '#8861E8',
    icon: 'PiBedFill',
    series: [6.2, 6.8, 7.1, 6.9, 7.4, 7.0, 7.3],
  },
  {
    id: 't3',
    label: 'Atividade',
    value: '375 cal',
    change: '+8%',
    positive: true,
    color: '#FF7A00',
    icon: 'PiFireFill',
    series: [300, 340, 310, 360, 375, 355, 390],
  },
  {
    id: 't4',
    label: 'Exercícios',
    value: '19 min/dia',
    change: '-3%',
    positive: false,
    color: '#32C673',
    icon: 'PiPersonSimpleWalkFill',
    series: [22, 20, 24, 18, 21, 19, 19],
  },
  {
    id: 't5',
    label: 'Bem-estar',
    value: 'Estável',
    change: '=',
    positive: true,
    color: '#20D6C0',
    icon: 'PiSparkleFill',
    series: [3, 4, 3, 4, 5, 4, 4],
  },
];

export const allHealthData = [
  { label: 'Passos', value: '8.412', unit: 'passos', icon: 'PiPersonSimpleWalkFill', color: '#32C673' },
  { label: 'Distância', value: '6,1', unit: 'km', icon: 'PiPersonSimpleWalkFill', color: '#32C673' },
  { label: 'Calorias Ativas', value: '375', unit: 'cal', icon: 'PiFireFill', color: '#FF7A00' },
  { label: 'Frequência Cardíaca', value: '62', unit: 'BPM', icon: 'PiHeartFill', color: '#FF3B5C' },
  { label: 'Sono', value: '7h 20min', unit: '', icon: 'PiBedFill', color: '#8861E8' },
  { label: 'Exposição Sonora', value: '48', unit: 'dB', icon: 'PiEarFill', color: '#20D6C0' },
  { label: 'Respiração', value: '16', unit: 'rpm', icon: 'PiWindFill', color: '#20D6C0' },
  { label: 'Hidratação', value: '1,8', unit: 'L', icon: 'PiDropFill', color: '#269DDB' },
];
