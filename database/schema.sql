CREATE TABLE products (
  product_id INT NOT NULL,
  product_name VARCHAR ( 100 ),
  slogan VARCHAR ( 250 ),
  product_description VARCHAR ( 500 ),
  category VARCHAR ( 100 ),
  default_price INT,
  PRIMARY KEY(product_id)
);

\copy products from '/Users/darianchan/Downloads/product.csv' delimiter ',' csv header;

CREATE TABLE styles (
  style_id INT NOT NULL,
  product_id INT,
  style_name VARCHAR ( 100 ),
  sale_price INT ,
  original_price INT,
  default_style BOOLEAN,
  PRIMARY KEY(style_id),
  FOREIGN KEY (product_id)
  REFERENCES products(product_id)
);

\copy styles from '/Users/darianchan/Downloads/styles.csv' delimiter ',' NULL as 'null' csv header;

CREATE TABLE related_products (
  id INT NOT NULL,
  current_product_id INT,
  related_product_id INT,
  PRIMARY KEY(id),
  FOREIGN KEY (current_product_id)
  REFERENCES products(product_id)
);

\copy related_products from '/Users/darianchan/Downloads/related.csv' delimiter ',' csv header;

CREATE TABLE style_skus (
  id INT NOT NULL,
  style_id INT,
  size VARCHAR ( 50 ),
  quantity INT,
  PRIMARY KEY(id),
  FOREIGN KEY (style_id)
  REFERENCES styles(style_id)
);

\copy style_skus from '/Users/darianchan/Downloads/skus.csv' delimiter ',' csv header;

CREATE TABLE style_photos (
  id serial,
  photo_id INT,
  style_id INT,
  large_url VARCHAR ( 1000 ),
  thumbnail_url VARCHAR,
  PRIMARY KEY(id),
  FOREIGN KEY (style_id)
  REFERENCES styles(style_id)
);

\copy style_photos (photo_id, style_id, large_url, thumbnail_url) from '/Users/darianchan/Downloads/photos.csv' delimiter ',' csv header;

CREATE Table features (
  id INT NOT NULL,
  product_id INT,
  feature VARCHAR(500),
  attribute VARCHAR(500),
  PRIMARY KEY (id),
  FOREIGN KEY (product_id)
  REFERENCES products(product_id)
);

\copy features from '/Users/darianchan/Downloads/features.csv' delimiter ',' csv header;

create index products_index on products (product_id);
create index related_index on related_products (current_product_id);
create index photos_index on style_photos (style_id, photo_id);
create index skus_index on style_skus (style_id);
create index styles_index on styles (style_id, product_id);


/* select product_id, JSON_AGG(json_build_object('feature', features.feature, 'value', features.attribute)
order by product_id) as feature
from features
group by product_id */


-- psql -U postgres -h localhost

-- psql -U postgres

-- su postgres psql < database/schema.sql

-- psql -h localhost -d allproducts -U darian1 < database/schema.sql

-- \copy products from '/Users/darianchan/Desktop/Hack Reactor Bootcamp/products/data/product.csv' delimiter ',' csv header;

-- select products.product_id,
-- products.product_name,
-- products.slogan,
-- products.product_description,
-- products.category,
-- products.default_price,
-- select products.product_id,
-- products.product_name,
-- products.slogan,
-- products.product_description,
-- products.category,
-- products.default_price,
-- features.feature,
-- features.attribute
-- from products join features on products.product_id = features.product_id;

-- select products.product_id,
-- products.product_name,
-- products.slogan,
-- products.product_description,
-- products.category,
-- products.default_price,
-- json_build_object(features.feature, features.attribute)
-- from products join features on products.product_id = features.product_id;