INSERT INTO TbPersona (CI_Per, Nombre_Per, Paterno_Per, Materno_Per, Sexo_Per, Direccion_Per, FDN_Per, Correo_Per, Telefono_Per, LDN_Per, Estado_Per) 
VALUES 
('1234567', 'Juan', 'Pérez', 'Gómez', 'M', 'Av. Siempre Viva #123', '1990-05-15', 'juan.perez@gmail.com', '777123456', 'La Paz', 'Activo'),
('7654321', 'María', 'López', 'Hernández', 'F', 'Calle de las Flores #456', '1985-08-20', 'maria.lopez@gmail.com', '777654321', 'Cochabamba', 'Activo'),
('9876543', 'Carlos', 'Ramírez', 'Villalobos', 'M', 'Calle Los Pinos #789', '1992-12-01', 'carlos.ramirez@gmail.com', '777987654', 'Santa Cruz', 'Activo'),
('2468135', 'Ana', 'Martínez', 'Torres', 'F', 'Av. Las Palmas #321', '1995-03-10', 'ana.martinez@gmail.com', '777246813', 'Tarija', 'Activo'),
('1357924', 'Luis', 'Hernández', 'Rojas', 'M', 'Av. Prado #654', '1988-07-25', 'luis.hernandez@gmail.com', '777135792', 'Potosí', 'Activo'),
('1928374', 'Sofía', 'Gutiérrez', 'Mendoza', 'F', 'Calle Central #987', '1993-09-18', 'sofia.gutierrez@gmail.com', '777192837', 'Oruro', 'Activo');



INSERT INTO TbUniversidad (Nombre_Uni, Tipo_Uni, Sede_Uni, Estado_Uni) 
VALUES 
('Universidad Mayor de San Andrés', 'Pública', 'La Paz', 'Activo'),
('Universidad Católica Boliviana', 'Privada', 'Santa Cruz', 'Activo'),
('Universidad Autónoma Gabriel René Moreno', 'Pública', 'Santa Cruz', 'Activo'),
('Universidad Privada de Santa Cruz', 'Privada', 'Santa Cruz', 'Activo'),
('Universidad Técnica de Oruro', 'Pública', 'Oruro', 'Activo'),
('Universidad Privada Boliviana', 'Privada', 'Cochabamba', 'Activo');


INSERT INTO TbTitulo (Descripcion_Tit, Nivel_Tit, Estado_Tit) 
VALUES 
('Ingeniería de Sistemas', 'Pregrado', 'Activo'),
('Maestría en Administración', 'Postgrado', 'Activo'),
('Doctorado en Ciencias Sociales', 'Doctorado', 'Activo'),
('Licenciatura en Medicina', 'Pregrado', 'Activo'),
('Especialidad en Pediatría', 'Especialidad', 'Activo'),
('Técnico Superior en Redes', 'Técnico', 'Activo');


INSERT INTO TbPersonaUniversidadTitulo (Id_Persona_Put, Id_Universidad_Put, Id_Titulo_Put, Estado_Put) 
VALUES 
(1, 1, 1, 'Activo'),
(2, 2, 2, 'Activo'),
(3, 3, 3, 'Activo'),
(4, 4, 4, 'Activo'),
(5, 5, 5, 'Activo'),
(6, 6, 6, 'Activo');
