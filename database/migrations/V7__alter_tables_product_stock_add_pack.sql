-- Tabela Products- adiciona coluna has_pack
ALTER TABLE Products
ADD COLUMN has_pack BOOLEAN DEFAULT FALSE,
ADD COLUMN pack_value INT DEFAULT 0;