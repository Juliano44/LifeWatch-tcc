-- =====================================================================
-- Dashboard de Saúde (TCC) — banco de dados completo (MariaDB)
--
-- Como usar no HeidiSQL:
--   1. Conecte na sua sessão (usuário senai, porta 3307).
--   2. Menu Arquivo -> "Executar arquivo SQL..." e escolha este arquivo
--      (ou abra uma aba de consulta com Ctrl+T, cole tudo e aperte F9).
--   3. Clique com o botão direito em "Bancos de dados" -> Atualizar (F5).
--
-- O script pode ser executado várias vezes sem apagar nada: usa
-- CREATE ... IF NOT EXISTS.
-- =====================================================================

CREATE DATABASE IF NOT EXISTS dashboard_saude
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE dashboard_saude;

-- =====================================================================
-- 1) USUÁRIOS
-- A senha NUNCA é guardada em texto puro: password_hash recebe o hash
-- bcrypt gerado pelo backend. Por isso crie usuários pelo site
-- ("Criar conta") ou com `npm run db:seed`, e não direto no HeidiSQL.
-- =====================================================================
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(180) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  avatar_initials VARCHAR(4) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- =====================================================================
-- 2) CATEGORIAS QUE APARECEM NO RESUMO (já ligadas ao backend)
-- Padrão: 1 registro por usuário por dia (UNIQUE user_id + entry_date).
-- =====================================================================

-- Atividade (Movimento / Exercício / Em Pé)
CREATE TABLE IF NOT EXISTS activity_entries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  entry_date DATE NOT NULL,
  movement_cal DECIMAL(6,1) NOT NULL DEFAULT 0,
  movement_goal DECIMAL(6,1) NOT NULL DEFAULT 500,
  exercise_min INT NOT NULL DEFAULT 0,
  exercise_goal INT NOT NULL DEFAULT 30,
  stand_hours DECIMAL(4,1) NOT NULL DEFAULT 0,
  stand_goal DECIMAL(4,1) NOT NULL DEFAULT 12,
  recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY uq_activity_user_date (user_id, entry_date)
) ENGINE=InnoDB;

-- Acompanhamento de Ciclo
CREATE TABLE IF NOT EXISTS cycle_entries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  entry_date DATE NOT NULL,
  cycle_day INT DEFAULT NULL,
  phase VARCHAR(60) DEFAULT NULL,
  symptoms VARCHAR(255) DEFAULT NULL,
  recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY uq_cycle_user_date (user_id, entry_date)
) ENGINE=InnoDB;

-- Audição: níveis de exposição sonora (fones de ouvido)
-- levels_json guarda uma lista, ex.: [38,52,45,61,40,55,48]
CREATE TABLE IF NOT EXISTS audio_entries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  entry_date DATE NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'OK',
  exposure_label VARCHAR(60) DEFAULT 'Exposição de 7 Dias',
  levels_json JSON NOT NULL,
  recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY uq_audio_user_date (user_id, entry_date)
) ENGINE=InnoDB;

-- Coração: batimentos em repouso
-- series_json guarda os batimentos ao longo do dia, ex.: [58,60,59,63]
CREATE TABLE IF NOT EXISTS heart_rate_entries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  entry_date DATE NOT NULL,
  value_bpm INT NOT NULL,
  series_json JSON DEFAULT NULL,
  recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY uq_heart_user_date (user_id, entry_date)
) ENGINE=InnoDB;

-- Sono
-- stages_json guarda os estágios, ex.: [{"label":"REM","value":1.6,"color":"#6A6BFF"}]
CREATE TABLE IF NOT EXISTS sleep_entries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  entry_date DATE NOT NULL,
  hours INT NOT NULL DEFAULT 0,
  minutes INT NOT NULL DEFAULT 0,
  stages_json JSON DEFAULT NULL,
  recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY uq_sleep_user_date (user_id, entry_date)
) ENGINE=InnoDB;

-- Bem-estar Mental / Estado Emocional (mood_score: 1 a 5)
CREATE TABLE IF NOT EXISTS emotional_entries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  entry_date DATE NOT NULL,
  headline VARCHAR(120) NOT NULL,
  mood_score TINYINT NOT NULL DEFAULT 3,
  tags_json JSON DEFAULT NULL,
  recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY uq_emotional_user_date (user_id, entry_date)
) ENGINE=InnoDB;

-- =====================================================================
-- 3) DEMAIS CATEGORIAS DA SIDEBAR
-- (tabelas prontas; o backend e o site ainda usam dados fixos para elas)
-- =====================================================================

-- Medicamentos: lista de remédios do usuário...
CREATE TABLE IF NOT EXISTS medications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  name VARCHAR(120) NOT NULL,
  dose VARCHAR(60) DEFAULT NULL,
  schedule_time TIME NOT NULL,
  active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_medications_user (user_id)
) ENGINE=InnoDB;

-- ...e o registro de cada dose (tomado / pendente / ignorado) por dia
CREATE TABLE IF NOT EXISTS medication_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  medication_id INT NOT NULL,
  user_id INT NOT NULL,
  log_date DATE NOT NULL,
  status ENUM('tomado','pendente','ignorado') NOT NULL DEFAULT 'pendente',
  taken_at DATETIME DEFAULT NULL,
  FOREIGN KEY (medication_id) REFERENCES medications(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY uq_medlog_med_date (medication_id, log_date)
) ENGINE=InnoDB;

-- Medidas Corporais (o IMC é calculado: peso / altura²)
CREATE TABLE IF NOT EXISTS body_measurement_entries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  entry_date DATE NOT NULL,
  weight_kg DECIMAL(5,2) NOT NULL,
  height_m DECIMAL(3,2) DEFAULT NULL,
  recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY uq_body_user_date (user_id, entry_date)
) ENGINE=InnoDB;

-- Mobilidade
CREATE TABLE IF NOT EXISTS mobility_entries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  entry_date DATE NOT NULL,
  walking_speed_ms DECIMAL(4,2) DEFAULT NULL,
  step_length_cm DECIMAL(5,1) DEFAULT NULL,
  asymmetry_pct DECIMAL(4,1) DEFAULT NULL,
  distance_km DECIMAL(5,2) DEFAULT NULL,
  steps INT DEFAULT NULL,
  recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY uq_mobility_user_date (user_id, entry_date)
) ENGINE=InnoDB;

-- Nutrição (água e calorias do dia)
CREATE TABLE IF NOT EXISTS nutrition_entries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  entry_date DATE NOT NULL,
  water_l DECIMAL(4,2) NOT NULL DEFAULT 0,
  water_goal_l DECIMAL(4,2) NOT NULL DEFAULT 2.5,
  calories_kcal INT DEFAULT NULL,
  meals INT DEFAULT NULL,
  recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY uq_nutrition_user_date (user_id, entry_date)
) ENGINE=InnoDB;

-- Respiração
CREATE TABLE IF NOT EXISTS respiratory_entries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  entry_date DATE NOT NULL,
  resp_rate_rpm INT NOT NULL,
  spo2_pct TINYINT DEFAULT NULL,
  sleep_resp_rpm INT DEFAULT NULL,
  breathing_sessions INT NOT NULL DEFAULT 0,
  recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY uq_respiratory_user_date (user_id, entry_date)
) ENGINE=InnoDB;

-- Sintomas (pode haver vários no mesmo dia, por isso não tem UNIQUE por dia)
CREATE TABLE IF NOT EXISTS symptom_entries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  entry_date DATE NOT NULL,
  symptom VARCHAR(80) NOT NULL,
  intensity ENUM('leve','moderada','intensa') NOT NULL DEFAULT 'leve',
  recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_symptoms_user_date (user_id, entry_date)
) ENGINE=InnoDB;

-- =====================================================================
-- 4) COMPARTILHAMENTO
-- owner_id = quem compartilha os próprios dados.
-- recipient_user_id = preenchido se a pessoa também tem conta no sistema.
-- =====================================================================
CREATE TABLE IF NOT EXISTS shares (
  id INT AUTO_INCREMENT PRIMARY KEY,
  owner_id INT NOT NULL,
  recipient_user_id INT DEFAULT NULL,
  recipient_name VARCHAR(120) NOT NULL,
  recipient_role VARCHAR(60) DEFAULT NULL,
  status ENUM('ativo','pendente','revogado') NOT NULL DEFAULT 'ativo',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (recipient_user_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_shares_owner (owner_id)
) ENGINE=InnoDB;

-- =====================================================================
-- 5) ATUALIZAÇÃO DE BANCOS CRIADOS EM VERSÕES ANTERIORES
-- (não faz nada se a coluna já existir)
-- =====================================================================
ALTER TABLE emotional_entries
  ADD COLUMN IF NOT EXISTS mood_score TINYINT NOT NULL DEFAULT 3 AFTER headline;
