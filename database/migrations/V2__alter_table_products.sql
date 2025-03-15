-- Remove registros inválidos antes de aplicar NOT NULL
DELETE FROM products WHERE brand_id IS NULL OR category_id IS NULL;

-- Remove constraints antigas (se existirem)
ALTER TABLE products DROP CONSTRAINT IF EXISTS products_brand_id_fkey;
ALTER TABLE products DROP CONSTRAINT IF EXISTS products_category_id_fkey;

-- Torna as colunas NOT NULL
ALTER TABLE products ALTER COLUMN brand_id SET NOT NULL;
ALTER TABLE products ALTER COLUMN category_id SET NOT NULL;

-- Adiciona constraints com ON DELETE CASCADE
ALTER TABLE products
    ADD CONSTRAINT products_brand_id_fkey FOREIGN KEY (brand_id)
    REFERENCES brands(id) ON DELETE CASCADE;

ALTER TABLE products
    ADD CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id)
    REFERENCES categories(id) ON DELETE CASCADE;
