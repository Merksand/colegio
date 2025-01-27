-- CREATE DATABASE BD_COLEGIO220125_6;
-- USE BD_COLEGIO220125_6;

DROP DATABASE IF EXISTS BD_COLEGIO1;
CREATE DATABASE BD_COLEGIO1;
USE BD_COLEGIO1;

CREATE TABLE TbPersona (
    Id_Persona INT AUTO_INCREMENT PRIMARY KEY,
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

CREATE TABLE TbJurado (
    Id_Jurado INT AUTO_INCREMENT PRIMARY KEY,
    CI_Jur VARCHAR(50),
    Grado_Academico_Jur VARCHAR(50),
    Nombre_Jur VARCHAR(50),
    Paterno_Jur VARCHAR(50),
    Materno_Jur VARCHAR(50),
    Sexo_Jur VARCHAR(50),
    FDN_Per DATE,
    Correo_Per VARCHAR(50),
    Telefono_Per VARCHAR(50),
    LDN_Per VARCHAR(50),
    Estado_Per VARCHAR(10)
);

CREATE TABLE TbFuncionario (
    Id_Funcionario INT AUTO_INCREMENT PRIMARY KEY,
    CI_Funcionario VARCHAR(50),
    Grado_Academico_Fun VARCHAR(50),
    Nombre_Fun VARCHAR(50),
    Paterno_Fun VARCHAR(50),
    Materno_Fun VARCHAR(50),
    Sexo_Fun VARCHAR(50),
    FDN_Fun DATE,
    Correo_Fun VARCHAR(50),
    Telefono_Fun VARCHAR(50),
    LDN_Fun VARCHAR(50),
    Estado_Fun VARCHAR(10)
);

CREATE TABLE TbUniversidad (
    Id_Universidad INT AUTO_INCREMENT PRIMARY KEY,
    Nombre_Uni VARCHAR(50),
    Tipo_Uni VARCHAR(50),
    Sede_Uni VARCHAR(50),
    Estado_Uni VARCHAR(10)
);

CREATE TABLE TbTitulo (
    Id_Titulo INT AUTO_INCREMENT PRIMARY KEY,
    Descripcion_Tit VARCHAR(100),
    Nivel_Tit VARCHAR(50),
    Estado_Tit VARCHAR(50)
);

CREATE TABLE TbPersonaUniversidadTitulo (
    Id_PUT INT AUTO_INCREMENT PRIMARY KEY,
    Id_Persona_PUT INT,
    Id_Universidad_PUT INT,
    Id_Titulo_PUT INT,
    Tema_PUT VARCHAR(200),
    Fecha_PUT DATE,
    Hora_PUT TIME,
    Nota_PUT DECIMAL(10, 2),
    Observacion_PUT VARCHAR(100),
    Estado_PUT VARCHAR(10),
    FOREIGN KEY (Id_Persona_PUT) REFERENCES TbPersona(Id_Persona),
    FOREIGN KEY (Id_Universidad_PUT) REFERENCES TbUniversidad(Id_Universidad),
    FOREIGN KEY (Id_Titulo_PUT) REFERENCES TbTitulo(Id_Titulo)
);

CREATE TABLE TbPUT_Jurado (
    Id_PUT_Jurado INT AUTO_INCREMENT PRIMARY KEY,
    Id_PUT_Jur INT,
    Id_Jurado_Jur INT,
    Representante_Jur VARCHAR(100),
    Observacion_Jur VARCHAR(100),
    Estado_Jur VARCHAR(10),
    FOREIGN KEY (Id_PUT_Jur) REFERENCES TbPersonaUniversidadTitulo(Id_PUT),
    FOREIGN KEY (Id_Jurado_Jur) REFERENCES TbJurado(Id_Jurado)
);

CREATE TABLE TbColegio (
    Id_Colegio INT AUTO_INCREMENT PRIMARY KEY,
    Nombre_Col VARCHAR(50),
    Estado_Col VARCHAR(10)
);

CREATE TABLE TbCargo (
    Id_Cargo INT AUTO_INCREMENT PRIMARY KEY,
    Nombre_Car VARCHAR(50),
    Estado_Car VARCHAR(10)
);

CREATE TABLE TbFuncionarioUniversidad (
    Id_FuncionarioUniversidad INT AUTO_INCREMENT PRIMARY KEY,
    Id_Funcionario_FU INT,
    Id_Universidad_FU INT,
    Fecha_Ini_FU DATE,
    Fecha_Fin_FU DATE,
    Observacion_FU VARCHAR(100),
    Estado_FU VARCHAR(10),
    FOREIGN KEY (Id_Funcionario_FU) REFERENCES TbFuncionario(Id_Funcionario),
    FOREIGN KEY (Id_Universidad_FU) REFERENCES TbUniversidad(Id_Universidad)
);

CREATE TABLE TbJuradoColegio (
    Id_JuradoColegio INT AUTO_INCREMENT PRIMARY KEY,
    Id_Jurado_JC INT,
    Id_Colegio_JC INT,
    Fecha_Ini_JC DATE,
    Fecha_Fin_JC DATE,
    Observacion_JC VARCHAR(100),
    Estado_FCC VARCHAR(10),
    FOREIGN KEY (Id_Jurado_JC) REFERENCES TbJurado(Id_Jurado),
    FOREIGN KEY (Id_Colegio_JC) REFERENCES TbColegio(Id_Colegio)
);

CREATE TABLE TbFuncionarioColegioCargo (
    Id_FCC INT AUTO_INCREMENT PRIMARY KEY,
    Id_Funcionario_FCC INT,
    Id_Colegio_FCC INT,
    Id_Cargo_FCC INT,
    Fec_Inicio_FCC DATE,
    Fec_Fin_FCC DATE,
    Estado_FCC VARCHAR(10),
    FOREIGN KEY (Id_Funcionario_FCC) REFERENCES TbFuncionario(Id_Funcionario),
    FOREIGN KEY (Id_Colegio_FCC) REFERENCES TbColegio(Id_Colegio),
    FOREIGN KEY (Id_Cargo_FCC) REFERENCES TbCargo(Id_Cargo)
);

CREATE TABLE TbSIB (
    Id_SIB INT AUTO_INCREMENT PRIMARY KEY,
    Nombre_Sib VARCHAR(100),
    Direccion_Sib VARCHAR(50),
    Telefono_Sib VARCHAR(50),
    Estado_Sib VARCHAR(10)
);

CREATE TABLE TbFuncionarioSibCargo (
    Id_FSC INT AUTO_INCREMENT PRIMARY KEY,
    Id_Funcionario_FSC INT,
    Id_SIB_FSC INT,
    Id_Cargo_FSC INT,
    Fec_Inicio_FSC DATE,
    Fec_Fin_FSC DATE,
    Estado_FSC VARCHAR(10),
    FOREIGN KEY (Id_Funcionario_FSC) REFERENCES TbFuncionario(Id_Funcionario),
    FOREIGN KEY (Id_SIB_FSC) REFERENCES TbSIB(Id_SIB),
    FOREIGN KEY (Id_Cargo_FSC) REFERENCES TbCargo(Id_Cargo)
);

CREATE TABLE TbUsuario (
	Id_Usuario INT AUTO_INCREMENT PRIMARY KEY,
	Id_Funcionario_Usu INT,
	F_Creacion_Usu DATETIME DEFAULT current_timestamp ,
	login_Usu VARCHAR(50),
	Estado_Usu VARCHAR(10),
	FOREIGN KEY (Id_Funcionario_Usu) REFERENCES TbFuncionario(Id_Funcionario)
);

CREATE TABLE TbPassword (
    Id_Password INT AUTO_INCREMENT PRIMARY KEY,
    Tipo_Pas VARCHAR(10),
    Fecha_Pas DATETIME DEFAULT current_timestamp,
    Password_Pas VARCHAR(90),
    Estado_Pas VARCHAR(10)
);

CREATE TABLE TbUsuarioPassword (
    Id_Usuario_UP INT,
    Id_Password_UP INT,
    FOREIGN KEY (Id_Usuario_UP) REFERENCES TbUsuario(Id_Usuario),
    FOREIGN KEY (Id_Password_UP) REFERENCES TbPassword(Id_Password)
);

CREATE TABLE TbRol (
    Id_Rol INT AUTO_INCREMENT PRIMARY KEY,
    Nombre_Rol VARCHAR(50),
    Identificador_Rol VARCHAR(20),
    Estado_Rol VARCHAR(10)
);

CREATE TABLE TbRol_Usuario (
    Id_Rol_RU INT,
    Id_Usu_RU INT,
    Fecha_RU DATETIME,
    Estado_RU VARCHAR(10),
    FOREIGN KEY (Id_Rol_RU) REFERENCES TbRol(Id_Rol),
    FOREIGN KEY (Id_Usu_RU) REFERENCES TbUsuario(Id_Usuario)
);
