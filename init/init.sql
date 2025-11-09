-- ==========================================
-- SCRIPT DE INICIALIZAÇÃO DO BANCO DE DADOS
-- ==========================================

-- Criação da tabela de intenções
CREATE TABLE IF NOT EXISTS intentions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  message TEXT,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Criação da tabela de convites
CREATE TABLE IF NOT EXISTS invites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  intention_id UUID REFERENCES intentions(id) ON DELETE CASCADE,
  token VARCHAR(255) NOT NULL UNIQUE,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Criação da tabela de membros
CREATE TABLE IF NOT EXISTS members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  company_name VARCHAR(100),
  business_area VARCHAR(100),
  joined_at TIMESTAMP DEFAULT NOW(),
  active BOOLEAN DEFAULT TRUE
);

-- ==========================================
-- FINAL DO SCRIPT
-- ==========================================
