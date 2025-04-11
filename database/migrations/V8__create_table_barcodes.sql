-- Criação da tabela barcodes
CREATE TABLE barcodes (
    id SERIAL PRIMARY KEY,
    product_id INT NOT NULL,
    barcode VARCHAR(100) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
