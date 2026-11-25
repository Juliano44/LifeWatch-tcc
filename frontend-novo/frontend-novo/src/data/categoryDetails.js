// Dados fictícios detalhados de cada categoria da sidebar.
// Usados nas telas individuais (ao clicar em uma categoria).
// Nenhum valor aqui representa informação médica real — servem apenas
// para demonstração visual do TCC.

export const categoryDetails = {
  ciclo: {
    summary: { label: 'Dia do ciclo', value: '14', unit: 'de 28' },
    highlights: [
      { label: 'Fase atual', value: 'Folicular' },
      { label: 'Duração média', value: '28 dias' },
      { label: 'Próxima previsão', value: 'em 14 dias' },
    ],
    chart: { type: 'bars', data: [26, 28, 27, 29, 28, 28, 27], color: '#FF5F9E' },
    chartLabel: 'Duração dos últimos 7 ciclos (dias)',
    records: [
      { date: 'Hoje', value: 'Fadiga e Dor de Cabeça' },
      { date: 'Ontem', value: 'Fadiga leve' },
      { date: '2 dias atrás', value: 'Sem sintomas' },
      { date: '3 dias atrás', value: 'Cólica leve' },
    ],
  },

  atividade: {
    summary: { label: 'Movimento hoje', value: '375', unit: 'cal' },
    highlights: [
      { label: 'Exercício', value: '19 min' },
      { label: 'Em pé', value: '4 h' },
      { label: 'Passos', value: '8.412' },
    ],
    chart: { type: 'bars', data: [300, 340, 310, 360, 375, 355, 390], color: '#FF7A00' },
    chartLabel: 'Calorias ativas nos últimos 7 dias',
    records: [
      { date: 'Hoje', value: '375 cal · 19 min' },
      { date: 'Ontem', value: '355 cal · 21 min' },
      { date: '2 dias atrás', value: '390 cal · 24 min' },
      { date: '3 dias atrás', value: '360 cal · 18 min' },
    ],
  },

  audicao: {
    summary: { label: 'Exposição média', value: '48', unit: 'dB' },
    highlights: [
      { label: 'Status', value: 'OK' },
      { label: 'Pico da semana', value: '61 dB' },
      { label: 'Limite seguro', value: '80 dB' },
    ],
    chart: { type: 'bars', data: [38, 52, 45, 61, 40, 55, 48], color: '#20D6C0' },
    chartLabel: 'Níveis dos fones nos últimos 7 dias (dB)',
    records: [
      { date: 'Hoje', value: '48 dB · OK' },
      { date: 'Ontem', value: '55 dB · OK' },
      { date: '2 dias atrás', value: '40 dB · OK' },
      { date: '3 dias atrás', value: '61 dB · Atenção' },
    ],
  },

  mental: {
    summary: { label: 'Estado de hoje', value: 'Agradável', unit: '' },
    highlights: [
      { label: 'Minutos de reflexão', value: '12 min' },
      { label: 'Registros na semana', value: '6' },
      { label: 'Tendência', value: 'Estável' },
    ],
    chart: { type: 'line', data: [3, 4, 3, 4, 5, 4, 4], color: '#269DDB' },
    chartLabel: 'Humor registrado nos últimos 7 dias (1 a 5)',
    records: [
      { date: 'Hoje', value: 'Um Momento Agradável · Animação' },
      { date: 'Ontem', value: 'Neutro · Trabalho' },
      { date: '2 dias atrás', value: 'Agradável · Família' },
      { date: '3 dias atrás', value: 'Muito Agradável · Amizades' },
    ],
  },

  coracao: {
    summary: { label: 'Batimentos em repouso', value: '62', unit: 'BPM' },
    highlights: [
      { label: 'Mínimo do dia', value: '58 BPM' },
      { label: 'Máximo do dia', value: '98 BPM' },
      { label: 'Variabilidade', value: '42 ms' },
    ],
    chart: { type: 'line', data: [58, 60, 59, 63, 61, 64, 62], color: '#FF3B5C' },
    chartLabel: 'Frequência em repouso nos últimos 7 dias (BPM)',
    records: [
      { date: 'Hoje', value: '62 BPM' },
      { date: 'Ontem', value: '64 BPM' },
      { date: '2 dias atrás', value: '61 BPM' },
      { date: '3 dias atrás', value: '63 BPM' },
    ],
  },

  medicamentos: {
    summary: { label: 'Doses hoje', value: '2', unit: 'de 3' },
    highlights: [
      { label: 'Próxima dose', value: '20:00' },
      { label: 'Adesão na semana', value: '92%' },
      { label: 'Medicamentos ativos', value: '3' },
    ],
    chart: { type: 'bars', data: [3, 3, 2, 3, 3, 2, 2], color: '#FF9F0A' },
    chartLabel: 'Doses tomadas nos últimos 7 dias',
    records: [
      { date: 'Hoje, 08:00', value: 'Vitamina D · tomado' },
      { date: 'Hoje, 13:00', value: 'Suplemento de ferro · tomado' },
      { date: 'Hoje, 20:00', value: 'Vitamina B12 · pendente' },
      { date: 'Ontem', value: '3 de 3 doses' },
    ],
  },

  medidas: {
    summary: { label: 'Peso atual', value: '64,2', unit: 'kg' },
    highlights: [
      { label: 'Altura', value: '1,68 m' },
      { label: 'IMC', value: '22,7' },
      { label: 'Variação no mês', value: '-0,6 kg' },
    ],
    chart: { type: 'line', data: [64.8, 64.7, 64.5, 64.6, 64.4, 64.3, 64.2], color: '#8861E8' },
    chartLabel: 'Peso nos últimos 7 registros (kg)',
    records: [
      { date: 'Hoje', value: '64,2 kg' },
      { date: 'Ontem', value: '64,3 kg' },
      { date: '2 dias atrás', value: '64,4 kg' },
      { date: '3 dias atrás', value: '64,6 kg' },
    ],
  },

  mobilidade: {
    summary: { label: 'Velocidade de caminhada', value: '1,32', unit: 'm/s' },
    highlights: [
      { label: 'Comprimento do passo', value: '68 cm' },
      { label: 'Assimetria', value: '2,1%' },
      { label: 'Distância hoje', value: '6,1 km' },
    ],
    chart: { type: 'line', data: [1.28, 1.3, 1.29, 1.33, 1.31, 1.34, 1.32], color: '#32C673' },
    chartLabel: 'Velocidade de caminhada nos últimos 7 dias (m/s)',
    records: [
      { date: 'Hoje', value: '1,32 m/s · 6,1 km' },
      { date: 'Ontem', value: '1,34 m/s · 5,8 km' },
      { date: '2 dias atrás', value: '1,31 m/s · 6,4 km' },
      { date: '3 dias atrás', value: '1,33 m/s · 5,2 km' },
    ],
  },

  nutricao: {
    summary: { label: 'Água hoje', value: '1,8', unit: 'L' },
    highlights: [
      { label: 'Meta diária', value: '2,5 L' },
      { label: 'Calorias', value: '1.840 kcal' },
      { label: 'Refeições', value: '4' },
    ],
    chart: { type: 'bars', data: [2.1, 2.4, 1.9, 2.2, 2.0, 2.3, 1.8], color: '#6FCB4D' },
    chartLabel: 'Consumo de água nos últimos 7 dias (L)',
    records: [
      { date: 'Hoje', value: '1,8 L · 1.840 kcal' },
      { date: 'Ontem', value: '2,3 L · 1.920 kcal' },
      { date: '2 dias atrás', value: '2,0 L · 1.780 kcal' },
      { date: '3 dias atrás', value: '2,2 L · 2.010 kcal' },
    ],
  },

  respiracao: {
    summary: { label: 'Frequência respiratória', value: '16', unit: 'rpm' },
    highlights: [
      { label: 'Oxigenação (SpO₂)', value: '98%' },
      { label: 'Durante o sono', value: '14 rpm' },
      { label: 'Sessões de respiração', value: '3' },
    ],
    chart: { type: 'line', data: [15, 16, 15, 17, 16, 16, 16], color: '#20D6C0' },
    chartLabel: 'Frequência respiratória nos últimos 7 dias (rpm)',
    records: [
      { date: 'Hoje', value: '16 rpm · SpO₂ 98%' },
      { date: 'Ontem', value: '16 rpm · SpO₂ 97%' },
      { date: '2 dias atrás', value: '16 rpm · SpO₂ 98%' },
      { date: '3 dias atrás', value: '17 rpm · SpO₂ 97%' },
    ],
  },

  sintomas: {
    summary: { label: 'Sintomas hoje', value: '2', unit: 'registros' },
    highlights: [
      { label: 'Mais frequente', value: 'Fadiga' },
      { label: 'Registros na semana', value: '5' },
      { label: 'Intensidade média', value: 'Leve' },
    ],
    chart: { type: 'bars', data: [1, 0, 2, 1, 0, 1, 2], color: '#FF6A5F' },
    chartLabel: 'Sintomas registrados nos últimos 7 dias',
    records: [
      { date: 'Hoje', value: 'Fadiga · leve' },
      { date: 'Hoje', value: 'Dor de cabeça · leve' },
      { date: 'Ontem', value: 'Fadiga · leve' },
      { date: '3 dias atrás', value: 'Cólica · moderada' },
    ],
  },

  sono: {
    summary: { label: 'Tempo dormindo', value: '7h 20', unit: 'min' },
    highlights: [
      { label: 'Sono profundo', value: '1 h 30 min' },
      { label: 'REM', value: '1 h 36 min' },
      { label: 'Média da semana', value: '7 h 02 min' },
    ],
    chart: { type: 'bars', data: [6.2, 6.8, 7.1, 6.9, 7.4, 7.0, 7.3], color: '#8861E8' },
    chartLabel: 'Horas dormidas nos últimos 7 dias',
    records: [
      { date: 'Hoje', value: '7 h 20 min' },
      { date: 'Ontem', value: '7 h 00 min' },
      { date: '2 dias atrás', value: '7 h 24 min' },
      { date: '3 dias atrás', value: '6 h 54 min' },
    ],
  },
};
