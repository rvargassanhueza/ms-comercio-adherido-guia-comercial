/* =========================== */
/* === DATOS DE COMERCIO_ADHERIDO === */
/* =========================== */
CREATE TABLE T_COMERCIO_ADHERIDO(
	id_comercio_adherido				int not null AUTO_INCREMENT,
	nombre_comercio_adherido 			varchar(50) null,
	descripcion_comercio_adherido		varchar(100) null,
	direccion_comercio_adherido			varchar(100) null,
	numero_direccion_comercio_adherido	int null,
	detalle_comercio_adherido			varchar(200) null,
	url_facebook_comercio_adherido		varchar(100) null,
	url_twitter_comercio_adherido		varchar(100) null,
	url_youtube_comercio_adherido		varchar(100) null,
	url_whatsapp_comercio_adherido		varchar(100) null,
	url_instagram_comercio_adherido		varchar(100) null,
	url_web_comercio_adherido			varchar(100) null,
	fecha_creacion 						date null,
  	fecha_modificacion 					date null,
  	usuario_creacion 					int null,
  	usuario_modificacion 				int null,
	vigente								bit (0) null,
 	CONSTRAINT PK_T_COMERCIO_ADHERIDO PRIMARY KEY (id_comercio_adherido) 
);


/* ====================================== */
/* === DATOS DE COMERCIO_ADHERIDO Y LOCALIDAD === */
/* ====================================== */
CREATE TABLE T_PASO_COMERCIO_ADHERIDO_LOCALIDAD(
	id_comercio_adherido int not null,
	id_localidad int not null
);

/* ====================================== */
/* === DATOS DE COMERCIO_ADHERIDO Y CATEGORÍA === */
/* ====================================== */
CREATE TABLE T_PASO_COMERCIO_ADHERIDO_CATEGORIA(
	id_comercio_adherido int not null,
	id_categoria int not null
);

/* ====================================== */
/* === DATOS DE COMERCIO_ADHERIDO Y SUB-CATEGORÍA === */
/* ====================================== */
CREATE TABLE T_PASO_COMERCIO_ADHERIDO_SUB_CATEGORIA(
	id_comercio_adherido int not null,
	id_sub_categoria int not null
);

/* ====================================== */
/* === DATOS DE COMERCIO_ADHERIDO Y CLIENTE === */
/* ====================================== */
CREATE TABLE T_PASO_COMERCIO_ADHERIDO_CLIENTE(
	id_comercio_adherido int not null,
	id_cliente int not null
);


ALTER TABLE T_PASO_COMERCIO_ADHERIDO_LOCALIDAD    ADD  CONSTRAINT FK_T_PASO_COMERCIO_ADHERIDO_LOCALIDAD FOREIGN KEY(id_comercio_adherido)
REFERENCES T_COMERCIO_ADHERIDO (id_comercio_adherido);

ALTER TABLE T_PASO_COMERCIO_ADHERIDO_CATEGORIA    ADD  CONSTRAINT FK_T_PASO_COMERCIO_ADHERIDO_CATEGORIA FOREIGN KEY(id_comercio_adherido)
REFERENCES T_COMERCIO_ADHERIDO (id_comercio_adherido);

ALTER TABLE T_PASO_COMERCIO_ADHERIDO_SUB_CATEGORIA    ADD  CONSTRAINT FK_T_PASO_COMERCIO_ADHERIDO_SUB_CATEGORIA FOREIGN KEY(id_comercio_adherido)
REFERENCES T_COMERCIO_ADHERIDO (id_comercio_adherido);

ALTER TABLE T_PASO_COMERCIO_ADHERIDO_CLIENTE    ADD  CONSTRAINT FK_T_PASO_COMERCIO_ADHERIDO_CLIENTE FOREIGN KEY(id_comercio_adherido)
REFERENCES T_COMERCIO_ADHERIDO (id_comercio_adherido);