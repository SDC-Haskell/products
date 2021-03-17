CREATE TABLE products (
  product_id INT NOT NULL,
  product_name VARCHAR ( 100 ),
  slogan VARCHAR ( 250 ),
  product_description VARCHAR ( 500 ),
  category VARCHAR ( 100 ),
  default_price INT,
  -- features json,
  PRIMARY KEY(product_id)
);


-- CREATE TABLE styles (
--   style_id INT NOT NULL,
--   style_name VARCHAR ( 50 ),
--   original_price INT,
--   sale_price INT,
--   default_bool BOOLEAN,
--   PRIMARY KEY(style_id)
--   CONSTRAINT style_fk
--   FOREIGN KEY (product_id)
--   REFERENCES products_general(product_id)
-- );

CREATE TABLE related_products (
  id INT NOT NULL,
  current_product_id INT,
  related_product_id INT,
  PRIMARY KEY(id),
  FOREIGN KEY (current_product_id)
  REFERENCES products(product_id)
);

-- CREATE TABLE style_skus (
--   id INT NOT NULL,
--   style_id INT,
--   size VARCHAR ( 50 ),
--   quantity VARCHAR ( 50 )
--   PRIMARY KEY(id)
--   CONSTRAINT sku_fk
--   FOREIGN KEY (style_id)
--   REFERENCES products_styles(style_id)
-- );

-- CREATE TABLE style_photos (
--   id INT NOT NULL,
--   style_id INT,
--   thumbnail_url VARCHAR ( 250 ),
--   photo_url VARCHAR ( 250 )
--   PRIMARY KEY(id)
--   CONSTRAINT photo_fk
--   FOREIGN KEY (style_id)
--   REFERENCES products_styles(style_id)
-- );

-- psql -U postgres -h localhost

-- psql -U postgres

-- su postgres psql < database/schema.sql

-- psql -h localhost -d allproducts -U darian1 < database/schema.sql

-- \copy products from '/Users/darianchan/Desktop/Hack Reactor Bootcamp/products/data/product.csv' delimiter ',' csv header;