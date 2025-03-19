-- Remove a constraint antiga que limita apenas a BUY e DONATION
ALTER TABLE stock_movements 
DROP CONSTRAINT stock_movements_movement_source_check;

-- Adiciona uma nova constraint combinando tipo e origem do movimento
ALTER TABLE stock_movements 
ADD CONSTRAINT movement_type_source_check 
CHECK (
    (movement_type = 'IN' AND movement_source IN ('BUY', 'DONATION')) OR
    (movement_type = 'OUT' AND movement_source IN ('USE', 'EXPIRED'))
);
