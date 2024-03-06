-- Create the clients table
CREATE TABLE IF NOT EXISTS clients (
    id CHAR(36) PRIMARY KEY NOT NULL,
    -- Personal Info
    gov_id VARCHAR(255) NOT NULL UNIQUE,
    name TEXT NOT NULL,
    phone VARCHAR(100),
    email VARCHAR(100),
    address TEXT,
    -- Timestamps for record creation and last update
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create the receipts table
CREATE TABLE IF NOT EXISTS receipts (
    id CHAR(36) PRIMARY KEY NOT NULL,
    -- Receipt fields (add as needed)
    total_amount DECIMAL(10, 2) NOT NULL,
    -- N:1 relationship with clients
    client_id CHAR(36) NOT NULL,
    FOREIGN KEY (client_id) REFERENCES clients(id),
    -- Timestamps for record creation and last update
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create the items table
CREATE TABLE IF NOT EXISTS items (
    id CHAR(36) PRIMARY KEY NOT NULL,
    -- Item fields (add as needed)
    description VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    -- Timestamps for record creation and last update
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create the receipts_items table (Tabla de enlace)
CREATE TABLE IF NOT EXISTS receipts_items (
    receipt_id CHAR(36) NOT NULL,
    item_id CHAR(36) NOT NULL,
    PRIMARY KEY (receipt_id, item_id),
    FOREIGN KEY (receipt_id) REFERENCES receipts(id),
    FOREIGN KEY (item_id) REFERENCES items(id)
);