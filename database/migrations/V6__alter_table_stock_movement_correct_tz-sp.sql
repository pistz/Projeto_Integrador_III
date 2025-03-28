-- Altera a coluna movement_date para TIMESTAMPTZ
ALTER TABLE stock_movements 
ALTER COLUMN movement_date TYPE TIMESTAMPTZ USING movement_date AT TIME ZONE 'America/Sao_Paulo';

-- Define o DEFAULT corretamente no fuso horário de Brasília
ALTER TABLE stock_movements 
ALTER COLUMN movement_date SET DEFAULT NOW() AT TIME ZONE 'America/Sao_Paulo';
