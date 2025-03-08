-- Criando a tabela de usuários
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criando a tabela de produtos
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    quantity INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criando a tabela de fornecedores
CREATE TABLE suppliers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    contact VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criando a tabela de pedidos de compra
CREATE TABLE purchase_orders (
    id SERIAL PRIMARY KEY,
    supplier_id INT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE CASCADE
);

-- Criando a tabela de itens dos pedidos de compra
CREATE TABLE purchase_order_items (
    id SERIAL PRIMARY KEY,
    purchase_order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (purchase_order_id) REFERENCES purchase_orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Criando a tabela de doadores
CREATE TABLE donors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    contact VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criando a tabela de doações
CREATE TABLE donations (
    id SERIAL PRIMARY KEY,
    donor_id INT NOT NULL,
    donation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (donor_id) REFERENCES donors(id) ON DELETE SET NULL
);

-- Criando a tabela de itens das doações
CREATE TABLE donation_items (
    id SERIAL PRIMARY KEY,
    donation_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (donation_id) REFERENCES donations(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Criando a tabela de movimentação de estoque
CREATE TABLE stock_movements (
    id SERIAL PRIMARY KEY,
    product_id INT NOT NULL,
    movement_type VARCHAR(50) NOT NULL CHECK (movement_type IN ('IN', 'OUT')),
    movement_source VARCHAR(50) NOT NULL CHECK (movement_source IN ('BUY', 'DONATION')),
    source_id INT, -- ID da compra ou doação
    quantity INT NOT NULL,
    movement_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
