DROP DATABASE IF EXISTS BD_COLEGIO1;
CREATE DATABASE BD_COLEGIO1;
USE BD_COLEGIO1;

CREATE TABLE TbPersona (
  Id_Persona INT PRIMARY KEY AUTO_INCREMENT,
  CI_Per VARCHAR(50),
  Nombre_Per VARCHAR(50),
  Paterno_Per VARCHAR(50),
  Materno_Per VARCHAR(50),
  Sexo_Per VARCHAR(50),
  Direccion_Per VARCHAR(50),
  FDN_Per DATE,
  Correo_Per VARCHAR(50),
  Telefono_Per VARCHAR(50),
  LDN_Per VARCHAR(50),
  Estado_Per VARCHAR(10)
);
f
CREATE TABLE TbUniversidad (
  Id_Universidad INT PRIMARY KEY AUTO_INCREMENT,
  Nombre_Uni VARCHAR(50),
  Tipo_Uni VARCHAR(50),
  Sede_Uni VARCHAR(50),
  Estado_Uni VARCHAR(10)
);

CREATE TABLE TbTitulo (
  Id_Titulo INT PRIMARY KEY AUTO_INCREMENT,
  Descripcion_Tit VARCHAR(100),
  Nivel_Tit VARCHAR(50),
  Estado_Tit VARCHAR(50)
);

CREATE TABLE TbPersonaUniversidadTitulo (
  Id_PUT INT PRIMARY KEY AUTO_INCREMENT,
  Id_Persona_Put INT,
  Id_Universidad_Put INT,
  Id_Titulo_Put INT,
  Estado_Put VARCHAR(10),
  FOREIGN KEY (Id_Persona_Put) REFERENCES TbPersona(Id_Persona),
  FOREIGN KEY (Id_Universidad_Put) REFERENCES TbUniversidad(Id_Universidad),
  FOREIGN KEY (Id_Titulo_Put) REFERENCES TbTitulo(Id_Titulo)
);

CREATE TABLE TbColegio (
  Id_Colegio INT PRIMARY KEY AUTO_INCREMENT,
  Nombre_Col VARCHAR(50),
  Estado_Col VARCHAR(10)
);

CREATE TABLE TbCargo (
  Id_Cargo INT PRIMARY KEY AUTO_INCREMENT,
  Nombre_Car VARCHAR(50),
  Estado_Car VARCHAR(10)
);

CREATE TABLE TbPersonaColegioCargo (
  Id_PCC INT PRIMARY KEY AUTO_INCREMENT,
  Id_Persona_PCC INT,
  Id_Colegio_PCC INT,
  Id_Cargo_PCC INT,
  Fec_Inicio_PCC DATE,
  Fec_Fin_PCC DATE,
  Estado_PCC VARCHAR(10),
  FOREIGN KEY (Id_Persona_PCC) REFERENCES TbPersona(Id_Persona),
  FOREIGN KEY (Id_Colegio_PCC) REFERENCES TbColegio(Id_Colegio),
  FOREIGN KEY (Id_Cargo_PCC) REFERENCES TbCargo(Id_Cargo)
);

CREATE TABLE TbSIB (
  Id_SIB INT PRIMARY KEY AUTO_INCREMENT,
  Nombre_Sib VARCHAR(100),
  Direccion_Sib VARCHAR(50),
  Telefono_Sib VARCHAR(50),
  Estado_Sib VARCHAR(10)
);

CREATE TABLE TbPersonaSibCargo (
  Id_PSC INT PRIMARY KEY AUTO_INCREMENT,
  Id_Persona_PSC INT,
  Id_SIB_PSC INT,
  Id_Cargo_PSC INT,
  Fec_Inicio_PSC DATE,
  Fec_Fin_PSC DATE,
  Estado_PSC VARCHAR(10),
  FOREIGN KEY (Id_Persona_PSC) REFERENCES TbPersona(Id_Persona),
  FOREIGN KEY (Id_SIB_PSC) REFERENCES TbSIB(Id_SIB),
  FOREIGN KEY (Id_Cargo_PSC) REFERENCES TbCargo(Id_Cargo)
);

CREATE TABLE TbDefensa (
  Id_Defensa INT PRIMARY KEY AUTO_INCREMENT,
  Id_Persona_Def INT,
  Tema_Def VARCHAR(150),
  Fecha_Def DATE,
  Hora_Def TIME,
  Telefono_Sib VARCHAR(50),
  Estado_Sib VARCHAR(10),
  FOREIGN KEY (Id_Persona_Def) REFERENCES TbPersona(Id_Persona)
);

CREATE TABLE tbColegioDefensaPersonaSIB (
  Id_Colegio_CDF INT,
  Id_Defensa_CDF INT,
  Id_SIB_CDF INT,
  Id_Jurado_CDF INT,
  FOREIGN KEY (Id_Defensa_CDF) REFERENCES TbPersona(Id_Persona)
);

CREATE TABLE tbUsuario (
  Id_Usuario INT PRIMARY KEY AUTO_INCREMENT,
  Id_Persona_Usu INT,
  F_Creacion_Usu DATETIME DEFAULT current_timestamp, -- Modificacion
  login_Usu VARCHAR(50),
  Estado_Usu VARCHAR(10), --AC o BA (ACTIVO O BAJA)
  FOREIGN KEY (Id_Persona_Usu) REFERENCES TbPersona(Id_Persona)
);

CREATE TABLE tbPassword (
  Id_Password INT PRIMARY KEY AUTO_INCREMENT,
  Tipo_Pas VARCHAR(10), -- GE, MO O RE (GENERADA, MODIFICADA, RESETEADA)
  Fecha_Pas DATETIME DEFAULT current_timestamp,
  Password_Pas VARCHAR(30), -- Aleatoria y hasheada
  Estado_Pas VARCHAR(10)
);

CREATE TABLE tbUsuarioPassword (
  Id_UsuarioPassword INT PRIMARY KEY AUTO_INCREMENT,
  Id_Usuario_UP INT,
  Id_Password_UP INT,
  Estado_UP VARCHAR(10),
  FOREIGN KEY (Id_Usuario_UP) REFERENCES tbUsuario(Id_Usuario),
  FOREIGN KEY (Id_Password_UP) REFERENCES tbPassword(Id_Password)
);

CREATE TABLE tbRol (
  Id_Rol INT PRIMARY KEY AUTO_INCREMENT,
  Nombre_Rol VARCHAR(50),
  Identificaror_Rol VARCHAR(20),
  Estado_Rol VARCHAR(10)
);

CREATE TABLE tbRol_Usuario (
  Id_Rol_RU INT,
  Id_Usu_RU INT,
  Fecha_RU DATETIME,
  Estado_RU VARCHAR(10),
  FOREIGN KEY (Id_Rol_RU) REFERENCES tbRol(Id_Rol),
  FOREIGN KEY (Id_Usu_RU) REFERENCES tbUsuario(Id_Usuario)
);
