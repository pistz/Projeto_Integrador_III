-- Criando a tabela de marcas
CREATE TABLE brand (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Adicionando a relação entre brand e products
ALTER TABLE products ADD COLUMN brand_id INT;
ALTER TABLE products ADD CONSTRAINT fk_brand_products FOREIGN KEY (brand_id) REFERENCES brand(id) ON DELETE SET NULL;

-- Adicionando a relação entre brand e donation_items
ALTER TABLE donation_items ADD COLUMN brand_id INT;
ALTER TABLE donation_items ADD CONSTRAINT fk_brand_donation_items FOREIGN KEY (brand_id) REFERENCES brand(id) ON DELETE SET NULL;

-- Adicionando a relação entre brand e purchase_order_items
ALTER TABLE purchase_order_items ADD COLUMN brand_id INT;
ALTER TABLE purchase_order_items ADD CONSTRAINT fk_brand_purchase_order_items FOREIGN KEY (brand_id) REFERENCES brand(id) ON DELETE SET NULL;
