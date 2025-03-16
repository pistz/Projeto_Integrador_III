-- include column created_by

ALTER TABLE stock_movements
ADD COLUMN created_by VARCHAR(100) NOT NULL;