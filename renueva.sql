CREATE TABLE types_users(
	id_type_user serial not null primary key,
	type_user character varying(25) not null
);

CREATE TABLE states_orders(
	id_state_order serial NOT NULL PRIMARY KEY,
	state_order character varying(15) NOT NULL
);

CREATE TABLE categories(
	id_category serial NOT NULL PRIMARY KEY,
	category character varying (15) NOT NULL
);

CREATE TABLE states_products(
	id_state_product serial NOT NULL PRIMARY KEY,
	state_product character varying (15) NOT NULL
);
--depeden. tables
CREATE TABLE users(
	id_user serial not null primary key,
	username character varying(15) not null,
	password character varying(100) not null,
	email character varying(50) not null,
	photo character varying(500),
	id_type_user integer not null,
	constraint fk_type_user foreign key (id_type_user) references types_users(id_type_user) ON DELETE CASCADE ON UPDATE CASCADE
);

create table clients(
	id_client serial not null primary key,
	names character varying(25) not null,
	last_names character varying(25) not null,
	document character varying(10) not null,
	phone character varying(10) not null,
	address character varying(100) not null,
	id_user integer not null,
	constraint u_user_client unique(id_user),
	constraint fk_user_clients foreign key (id_user) references users(id_user) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE staffs(
	id_staff serial not null primary key,
	names character varying(25) not null,
	last_names character varying(25) not null,
	document character varying(10) not null,
	phone character varying(10) not null,
	id_user integer not null,
	constraint u_user_staff unique(id_user),
	constraint fk_user_staff foreign key (id_user) references users(id_user) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE orders(
	id_order serial not null primary key,
	id_client integer not null,
	date_order date not null,
	id_state_order integer not null,
	CONSTRAINT fk_client_order FOREIGN KEY (id_client) REFERENCES clients(id_client) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_state_order FOREIGN KEY (id_state_order) REFERENCES states_orders(id_state_order) ON DELETE CASCADE ON UPDATE CASCADE
);

--cuando un usuario agrege un producto al carrito va a crear la orden y después a la detalle con el producto
--cuando agrege otro producto al carrito al detalle
--cuando confirme la orden el state_order va a cambiar

CREATE TABLE products(
	id_product serial NOT NULL PRIMARY KEY,
	name character varying (30) NOT NULL,
	description character varying (200) NOT NULL,
	price decimal NOT NULL,
	image character varying(500) NULL,
	stock integer NOT NULL,
	id_category integer NOT NULL,
	id_state_product integer NOT NULL,
	CONSTRAINT fk_category FOREIGN KEY (id_category) REFERENCES categories(id_category) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_state_product FOREIGN KEY (id_state_product) REFERENCES states_products(id_state_product) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE reviews(
	id_review serial NOT NULL PRIMARY KEY,
	comment character varying (100) NOT NULL,
	id_client integer NOT NULL,
	id_order integer NOT NULL,
	id_product integer NOT NULL,
	CONSTRAINT fk_client_review FOREIGN KEY (id_client) REFERENCES clients(id_client) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_order_review FOREIGN KEY (id_order) REFERENCES orders(id_order) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_product_review FOREIGN KEY (id_product) REFERENCES products(id_product) ON DELETE CASCADE ON UPDATE CASCADE
					 
);

CREATE TABLE detail_orders(
	id_detail_order serial NOT NULL PRIMARY KEY,
	id_order integer NOT NULL,
	id_product integer NOT NULL,
	cuantitive integer NOT NULL,
	CONSTRAINT fk_order FOREIGN KEY (id_order) REFERENCES orders(id_order) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_product FOREIGN KEY (id_product) REFERENCES products(id_product) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO public.types_users(
	 type_user)
	VALUES 	( 'Admin'),
			('Client');

INSERT INTO public.states_orders(
	 state_order)
	VALUES 	('on the way'),
			('delivered'),
			('cancelled');
			
INSERT INTO public.categories(
	 category)
	VALUES 	('creams'),
			('soaps'),
			('salts'),
			('oils');

INSERT INTO public.states_products(
	 state_product)
	VALUES 	('available'),
			('sold out'),
			('coming soon');

INSERT INTO public.users(
	 username, password, email, id_type_user)
	VALUES 	('gjorge0', '9lbfUv1RGG', 'pgooble0@nih.gov', 1),
			('dsimononsky1', 'w0Qgav1Fg1', 'vtouhig1@nsw.gov.au', 1),
			( 'nruseworth2', 'PjKJ9ED', 'fcauldfield2@joomla.org', 1),
			('djknote3', 'YGASnsA@', 'matraca30@gmail.com', 1),
			('focus45', '#kaSKAase', 'suoldpark@gmail.com', 1),
			('laraman55', '@daHjkS#', 'lacostra35@gmail.com', 1),
			('avenaman69', 'ieoYSjdSs', 'avenaman3000@gmail.com', 1),
			('rodmanxv008', 'jdsSfgD', 'landerman@gmail.com', 1),
			('sportacus90535', 'O9dhSF7f', 'fermena@gmail.com', 1),
			('ebeggan3', 'OLs4OEyzOG', 'aaughtie3@over-blog.com', 1),			
			('m_antomk', 'asdSewSDD', 'antonio@gmail.com', 2),
			('adsool34', 'w3Qwah1Sg1', 'alfa@gmail.com', 2),
			( 'lexluther34', 'jdSakS', 'Lexi@gmail.com', 2),
			('dnquijote', 'sadgRSa@', 'quijotiyo@gmail.com', 2),
			('poku74', '#vAlbRdE', 'pekin@gmail.com', 2),
			('uBuntu', '@ldoEsc#', 'Aaron@gmail.com', 2),
			('cuchara', 'f5tSEfd3s', 'cucharin@gmail.com', 2),
			('dockipro', 'kd57SAjd0', 'dockiproxd@gmail.com', 2),
			('jiter78', '4S8adk@6ed', 'dloorem@gmail.com', 2),
			('Ker78', 'Ds93#ls&','uriel@gmail.com', 2);
			
			
INSERT INTO public.clients(
	 names, last_names, document, phone, address, id_user)
	VALUES 	('Stephine', 'Rutland', '904', '7415', 'Suite 69', 11),
			('Rodrigo', 'Alvarez', '892', '7596', 'Alameda 4', 12),
			('Isaac', 'Castro', '724', '7105', 'Alameda 2', 13),
			('Alisson', 'Zepeda', '645', '7325', 'Alameda 5', 14),
			('Valeria', 'Martinez', '532', '7882', 'Alameda7', 15),
			('Melvin', 'Diaz', '412', '7365', 'Alameda 34', 16),
			('Oscar', 'Ramirez', '378', '7985', 'Alameda Juan Pablo', 17),
			('Isis', 'Mendoza', '241', '7522', 'Alameda Benitp', 18),
			('Carlos', 'Quintanilla', '1226', '7526', 'Alameda  Gorrion', 19),
			('Valera', 'Shearston', '18', '85', 'Room 1696', 20);
			
			
INSERT INTO public.staffs(
	 names, last_names, document, phone, id_user)
	VALUES 	( 'Beverley', 'Tregien','70','850', 1),
			('Camila', 'Morales', '40', '235', 3),
			('Carlos', 'Romero', '65', '221',  8),
			('Liseth', 'Merlos', '55', '248',  9),
			('Oscar', 'Marroquin', '32', '547', 10),
			('Juan', 'Perez', '67', '654', 5),
			('Steve', 'Washintong', '69', '236', 4),
			('Monica', 'Quijano', '75', '852', 7),
			('Astrid', 'Tejada', '48', '951', 6),
			('Saidee', 'Grimsdike','88','490', 2);
			
INSERT INTO public.orders(
	id_client, date_order, id_state_order)
	VALUES 	(2, DATE '02/02/2023', 2),
			(3, DATE '03/03/2023', 1),
			(5, DATE '05/03/2023', 1),
			(4, DATE '08/03/2023', 3),
			(7, DATE '11/03/2023', 2),
			(6, DATE '11/03/2023', 3),
			(9, DATE '6/03/2023', 1),
			(8, DATE '08/02/2023', 2),
			(10, DATE '1/03/2023', 3),
			(1, DATE '07/02/2023', 1);
			
--SE AGREGAR "DATE%" antes de la fecha para especificar que se ingresara (date/time)
INSERT INTO public.products(
	 name, description, price, image, stock, id_category, id_state_product)
	VALUES 	('soap achiote', 'beautiful soap', 5.99, 1,  40,2, 1),
			('bath salts', 'soft salts', 8.00, 2, 30, 3, 2),
			('hand soap', 'take care of your hands', 5.99, 3, 50, 2, 3),
			('hair oil', 'a soft oil to strengthen your hair', 4.99, 4, 60, 4, 2),
			('body moisturizer', 'the best cream to moisturize your skin', 3.99, 5, 70, 1, 1),
			('Hair care shampoo', 'perfect product for your hair', 2.99, 6, 80, 2, 3),
			('makeup remover', 'to have your skin clean after makeup', 5.99, 7, 90, 1, 2),
			('Sunscreen', 'Product ready to take care of the sun in the summer', 7.99, 8,90, 1, 1),
			('body butter', 'butter that illuminates your skin', 3.99, 9, 100, 2, 3),
			('massage bar', 'we will give you the best massages',2.99,10,120,2,2);

INSERT INTO public.reviews(
	 comment, id_client, id_order, id_product)
	VALUES 	('I like that', 1, 10 , 9),
			('Very nice product, I love it', 2, 1, 6),
			('beautiful product', 3, 3, 1),
			('nice product', 4, 5, 2),
			('I expected more from the product', 6, 4, 3),
			('Very nice product, I love it', 5, 10, 4),
			('nice product', 8, 7, 7),
			('I expected more from the product', 10, 6, 5),
			('Very nice product, I love it', 7, 9, 10),
			('nice product', 9, 8, 9),
			('I expected more from the product', 1, 2, 8);
			
INSERT INTO public.detail_orders(
	 id_order, id_product, cuantitive)
	VALUES 	(15, 8, 4),
			(2, 9, 2),
			(3, 6, 2),
			(4, 8, 1),
			(5, 3, 3),
			(6, 5, 5),
			(7, 2, 1),
			(8, 4, 7),
			(9, 1, 2),
			(10, 10, 3),
			(9, 2, 1),
			(7, 5, 4),
			(8, 3, 6),
			(5, 4, 3),
			(6, 6, 3),
			(3, 9, 9),
			(4, 7, 2),
			(2, 8, 1),
			(10, 10, 6),
			(1,1,9);
			
	--ORDER BY, GROUP BY, INNER JOIN
			
--MOSTRAR LOS PRODUCTOS MÁS COMPRADOS, DEL MÁß COMPRADO AL MENOS
SELECT p."name", P.price, p.description, count(d.id_product) AS Consumption
FROM products p
INNER JOIN detail_orders d ON p.id_product = d.id_product
GROUP BY p."name", p.price, p.description
having count(d.id_product) >= 0
ORDER BY count(p.id_product) DESC


--MOSTRAR LOS PRODUCTOS QUE COMPRÓ UN CLIENTE "(QUE PERTENEZCA A LA MISMA ORDEN, 
--SACAR EL TOTAL DE LA CANTIDAD POR EL PRECIO UNITARIO "
SELECT CONCAT(c.names, ' ', c.last_names) as client , p."name", p.price, /*SUM(*/d.cuantitive/*) AS cuantitive*/, /*SUM(*/p.price/*) AS total*/, o.id_order
FROM detail_orders d
INNER JOIN orders o ON o.id_order = d.id_order
INNER JOIN products p ON p.id_product = d.id_product
INNER JOIN clients c ON c.id_client = o.id_client
WHERE o.id_client = c.id_client AND o.id_order = 1
GROUP BY CONCAT(c.names, ' ',  c.last_names),p."name", p.price,d.cuantitive, o.id_order
ORDER BY COUNT(d.cuantitive) DESC


--MOSTRAR HISTORIAL DE PRODUCTOS DE UN CLIENTE
SELECT c."names", c.last_names, c."document", o.date_order, p."name", p.price 
FROM detail_orders d
INNER JOIN products p ON p.id_product = d.id_product
INNER JOIN orders o ON o.id_order = d.id_order
INNER JOIN clients c ON c.id_client = o.id_client
WHERE c.id_client = 2
ORDER BY o.date_order DESC

	--STORE PROCEDURE
	
--STORE PROCEDURE: CREAR UN DETALLE OBTENIENDO EL ID_PRODUCT, CUANTITIVE Y EL ID_CLIENT
CREATE OR REPLACE PROCEDURE createDetail(
	product integer, 
	cuantitive integer,
	client integer
)
language plpgsql
as 
$$
declare
	_order_ integer;
begin
--ASIGNAR EL VALOR QUE RETORNE ESA CONSULTA A '_order_' CON "INTO"
--CURRENT SIRVE PARA OBTENER LA FECHA ACTUAL (SELECCIONAR EL ID_ORDER CUANDO LA FECHA SEA A LA DE AHORA) 
	SELECT id_order FROM orders WHERE id_client = client AND date_order = CURRENT_DATE INTO _order_;
--LA FECHA DE AHORA PARA CREAR EL DETALLE Y BUSCAR LA ORDEN PERTENECIENTE A UN CLIENTE MÁS RECIENTE
	INSERT INTO detail_orders(id_order, id_product, cuantitive) VALUES (_order_, product, cuantitive);
end 
$$;
--execute
INSERT INTO orders(id_client, date_order, id_state_order) VALUES (5, CURRENT_DATE, 1);
call createDetail(8, 5, 1);
SELECT * FROM detail_orders;

--STORE PROCEDURE DEL TRIGGER "subStockProduct"

CREATE OR REPLACE FUNCTION FUN_subStockProduct() 
RETURNS TRIGGER 
LANGUAGE PLPGSQL
AS
$$
DECLARE 
	_cuantitive_ integer;
BEGIN
	--ASIGNAR VAL A _cuantitive_			ordenar de manera descendente el id_detail_order, seleccionar 1 tupla
	SELECT cuantitive FROM detail_orders ORDER BY id_detail_order DESC LIMIT 1 INTO _cuantitive_;
	UPDATE products SET stock = stock - _cuantitive_;
	RETURN NEW;
END
$$;


--CREA TRIGGER QUE RESTE AL STOCK CUANDO SE AGREGA UN DETALLE (RESTARLE CUANTITIVE A STOCK)
CREATE OR REPLACE TRIGGER TG_subStockProduct AFTER INSERT ON detail_orders
	FOR EACH ROW
	EXECUTE PROCEDURE FUN_subStockProduct()

SELECT * FROM products
INSERT INTO detail_orders(id_order, id_product, cuantitive) VALUES (15, 1, 3)

--FUNCIÓN QUE SUME LA CANTIDAD DE EXISTENCIAS QUE SE LE RESTO A "CUANTITIVE" EN UNA ACTUALIZACIÓN
CREATE OR REPLACE FUNCTION FUN_addStockProduct() RETURNS TRIGGER AS $$
BEGIN
	UPDATE products
	SET stock = stock + (OLD.cuantitive - NEW.cuantitive)
	WHERE id_product = OLD.id_product;
	RETURN NEW;
END;
$$ LANGUAGE plpgsql;
--TRIGGER QUE SUMA LA CANTIDAD DE EXISTENCIAS QUE SE LE RESTO A "CUANTITIVE"
CREATE OR REPLACE TRIGGER update_stock
AFTER UPDATE ON detail_orders
FOR EACH ROW
EXECUTE FUNCTION FUN_addStockProduct();

SELECT * FROM products;
SELECT * FROM detail_orders;
UPDATE detail_orders SET cuantitive = cuantitive - 2 WHERE id_detail_order = 23
	--OPERADOR ARTIMETICO

--PREV ANTES DE HACER LA CONSULTA
SELECT * FROM products
UPDATE PRODUCTS SET stock = 0 WHERE id_product = 8
--MOSTRAR LOS PRODUCTOS QUE NO TENGAN EXISTENCIAS
SELECT *
FROM products p
WHERE p.stock = 0

	--OPERADOR LÓGICO

--MOSTRAR TODOS LOS PRODUCTOS, EXECEPTO LOS QUE ESTÁN DISPONIBLES
SELECT products.name, states_products.state_product
FROM products 
INNER JOIN states_products
ON products.id_state_product = states_products.id_state_product
WHERE NOT states_products.state_product = 'available';

	--FUNCIÓN DE AGREGACIÓN
	
--MOSTRAR LA CANTIDAD DE PRODUCTOS REGISTRADOS O EXISTENCIAS
SELECT SUM(stock) as stock_products
FROM products

	--CONSULTAS PARAMETRIZADAS PARA REPORTES
	
--MOSTRAR LOS PRODUCTOS DEL MÁS CARO AL MÁS BARATO COMPRADO POR UN CLIENTE
SELECT DISTINCT p.name, p.price
FROM  detail_orders d
INNER  JOIN products p ON d.id_product = p.id_product
INNER JOIN orders o ON o.id_order = d.id_order
INNER JOIN clients c ON c.id_client = o.id_client
WHERE c.id_client = 2
GROUP BY DISTINCT p.name, p.price, o.id_order, d.id_detail_order
ORDER BY p.price DESC, p.name;

--MOSTRAR LOS COMENTARIOS DE UN PRODUCTO
SELECT reviews.comment
FROM reviews
INNER JOIN products
ON reviews.id_product = products.id_product
WHERE products.name = 'body butter'

--MOSTRAR LOS SUBTOTALES DE UNA ORDEN
SELECT c."names", c.last_names, c."document", o.id_order, o.date_order, d.id_detail_order,
p.name, p.price, d.cuantitive, p.price * d.cuantitive as SubTotal
FROM detail_orders d
		--UNIR CONSULTA CON CLIENTES
INNER JOIN orders o ON o.id_order = d.id_order
INNER JOIN clients c ON c.id_client = o.id_client
		--UNIR CONSULTA CON PRODUCTOS
INNER JOIN products p ON p.id_product = d.id_product 
WHERE d.id_order = 1
GROUP BY c."names", c.last_names, c."document", o.id_order, o.date_order, d.id_detail_order,p.name, p.price, d.cuantitive
		--EN EL SISTEMA SUMAR LOS SUBTOTALES

--MOSTRAR LOS PRODUCTOS RECIENTEMENTE COMPRADOS POR UN CLIENTE
SELECT c."names", c.last_names, c."document", o.date_order, p."name", p.price 
FROM detail_orders d
INNER JOIN products p ON p.id_product = d.id_product
INNER JOIN orders o ON o.id_order = d.id_order
INNER JOIN clients c ON c.id_client = o.id_client
WHERE c.id_client = 1
ORDER BY o.date_order DESC
	

--MOSTRAR LA CANTIDAD DE PRODUCTOS COMPRADOS POR UN CLIENTE 
SELECT c."names", c.last_names, c."document", 
count(o.id_order) as Orders, sum(d.cuantitive) as ShopProducts
FROM detail_orders d
INNER JOIN products p ON p.id_product = d.id_product
INNER JOIN orders o ON o.id_order = d.id_order
INNER JOIN clients c ON c.id_client = o.id_client
WHERE c.id_client = 2
GROUP BY c."names", c.last_names, c."document"

	--CONSULTAS PARAMETRIZADAS PARA REPORTES CON RANGO DE FECHAS
	
--MOSTRAR LOS PRODUCTOS COMPRADOS EN UN RANGO DE FECHAS
SELECT d.id_detail_order AS order, CONCAT(c."names",' ', c.last_names) AS client, p.name , p.price, d.cuantitive, o.date_order
FROM detail_orders d
INNER JOIN orders o ON o.id_order = d.id_order
INNER JOIN products p ON p.id_product = d.id_product
INNER JOIN clients c ON c.id_client = o.id_client
WHERE o.date_order BETWEEN '2023-01-01' AND '2023-03-28' 
GROUP BY d.id_detail_order, CONCAT(c."names",' ', c.last_names), p.name, p.price,  d.cuantitive,o.date_order 
ORDER BY o.date_order DESC

--MOSTRAR LOS PRODUCTOS QUE LLEVO UN CLIENTE EN UN RANGO DE FECHAS(función)
SELECT c."names", c.last_names, c."document", p."name", o.date_order, d.id_detail_order
FROM detail_orders d
INNER JOIN products p ON p.id_product = d.id_product
INNER JOIN orders o ON o.id_order = d.id_order
INNER JOIN clients c ON c.id_client = o.id_client
WHERE o.date_order BETWEEN '02/02/2022' AND '6/03/2023' AND c.id_client = 2
ORDER BY o.date_order DESC;

--MOSTRAR LOS PRODUCTOS MÁS COMPRADOS EN UN MES
SELECT d.id_order,p."name", o.date_order, count(d.id_product) as shop
FROM detail_orders d
INNER JOIN products p ON p.id_product = d.id_product
INNER JOIN orders o ON o.id_order = d.id_order
				--el sistema obtendra el primer día del mes y el último
WHERE o.date_order BETWEEN '2023/02/01'  AND '2023/02/28'
GROUP BY d.id_order, p."name", o.date_order
ORDER BY count(d.id_product) DESC
