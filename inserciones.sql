use BD_COLEGIO1;

INSERT INTO TbPersona (CI_Per, Nombre_Per, Paterno_Per, Materno_Per, Sexo_Per, Direccion_Per, FDN_Per, Correo_Per, Telefono_Per, LDN_Per, Estado_Per) 
VALUES 
('1234567', 'Juan', 'Pérez', 'Gómez', 'M', 'Av. Siempre Viva #123', '1990-05-15', 'juan.perez@gmail.com', '777123456', 'La Paz', 'AC'),
('7654321', 'María', 'López', 'Hernández', 'F', 'Calle de las Flores #456', '1985-08-20', 'maria.lopez@gmail.com', '777654321', 'Cochabamba', 'AC'),
('9876543', 'Carlos', 'Ramírez', 'Villalobos', 'M', 'Calle Los Pinos #789', '1992-12-01', 'carlos.ramirez@gmail.com', '777987654', 'Santa Cruz', 'AC'),
('2468135', 'Ana', 'Martínez', 'Torres', 'F', 'Av. Las Palmas #321', '1995-03-10', 'ana.martinez@gmail.com', '777246813', 'Tarija', 'AC'),
('1357924', 'Luis', 'Hernández', 'Rojas', 'M', 'Av. Prado #654', '1988-07-25', 'luis.hernandez@gmail.com', '777135792', 'Potosí', 'AC'),
('1928374', 'Sofía', 'Gutiérrez', 'Mendoza', 'F', 'Calle Central #987', '1993-09-18', 'sofia.gutierrez@gmail.com', '777192837', 'Oruro', 'AC');



INSERT INTO TbUniversidad (Nombre_Uni, Tipo_Uni, Sede_Uni, Estado_Uni) 
VALUES 
('Universidad Mayor de San Andrés', 'Pública', 'La Paz', 'AC'),
('Universidad Católica Boliviana', 'Privada', 'Santa Cruz', 'AC'),
('Universidad Autónoma Gabriel René Moreno', 'Pública', 'Santa Cruz', 'AC'),
('Universidad Privada de Santa Cruz', 'Privada', 'Santa Cruz', 'AC'),
('Universidad Técnica de Oruro', 'Pública', 'Oruro', 'AC'),
('Universidad Privada Boliviana', 'Privada', 'Cochabamba', 'AC');


INSERT INTO TbTitulo (Descripcion_Tit, Nivel_Tit, Estado_Tit) 
VALUES 
('Ingeniería de Sistemas', 'Licenciatura', 'AC'),
('Maestría en Administración', 'Maestría', 'AC'),
('Doctorado en Ciencias Sociales', 'Doctorado', 'AC'),
('Licenciatura en Medicina', 'Licenciatura', 'AC'),
('Especialidad en Pediatría', 'Maestría', 'AC'),
('Técnico Superior en Redes', 'Técnico', 'AC');


 

INSERT INTO TbPersonaUniversidadTitulo (Id_Persona_PUT, Id_Universidad_PUT, Id_Titulo_PUT, Tema_PUT, Fecha_PUT, Hora_PUT, Nota_PUT, Observacion_PUT, Estado_PUT)
VALUES 
(1, 1, 1, 'Impacto del cambio climático en la agricultura', '2023-05-10', '14:30:00', 85.50, 'Aprobado con mención', 'AC'),
(2, 2, 2, 'Optimización de procesos industriales mediante IA', '2022-11-20', '10:00:00', 92.00, 'Trabajo destacado', 'AC'),
(3, 3, 1, 'Diseño de sistemas de energía renovable', '2021-08-15', '16:00:00', 78.75, 'Requiere ajustes', 'AC'),
(4, 4, 3, 'Implementación de tecnologías blockchain en finanzas', '2020-06-25', '09:00:00', 88.00, 'Buena presentación', 'AC'),
(5, 1, 2, 'Desarrollo de apps móviles para la salud pública', '2023-02-10', '11:15:00', 94.25, 'Sobresaliente', 'AC');


INSERT INTO TbFuncionario (CI_Funcionario, Grado_Academico_Fun, Nombre_Fun, Paterno_Fun, Materno_Fun, Sexo_Fun, FDN_Fun, Correo_Fun, Telefono_Fun, LDN_Fun, Estado_Fun) 
VALUES 
('111', 'Licenciatura', 'Juan', 'Pérez', 'García', 'M', '1985-04-15', 'juan.perez@example.com', '789456123', 'Santa Cruz', 'AC'),
('222', 'Maestría', 'María', 'Lopez', 'Fernandez', 'F', '1990-07-22', 'maria.lopez@example.com', '654321987', 'Cochabamba', 'AC'),
('333', 'Doctorado', 'Carlos', 'Martinez', 'Ruiz', 'M', '1982-02-10', 'carlos.martinez@example.com', '123654789', 'La Paz', 'InAC'),
('444', 'Licenciatura', 'Ana', 'Gómez', 'Rodríguez', 'F', '1995-12-05', 'ana.gomez@example.com', '321987654', 'Potosí', 'AC'),
('555', 'Técnico', 'Luis', 'Vargas', 'Torres', 'M', '1988-09-18', 'luis.vargas@example.com', '456123789', 'Tarija', 'InAC');





INSERT INTO TbJurado (CI_Jur, Grado_Academico_Jur, Nombre_Jur, Paterno_Jur, Materno_Jur, Sexo_Jur, FDN_Per, Correo_Per, Telefono_Per, LDN_Per, Estado_Per)
VALUES 
('12345678', 'Doctorado', 'Juan', 'Pérez', 'García', 'Masculino', '1980-05-10', 'juan.perez@example.com', '789456123', 'Santa Cruz', 'AC'),
('87654321', 'Maestría', 'María', 'Rodríguez', 'Lopez', 'Femenino', '1985-08-25', 'maria.rodriguez@example.com', '987654321', 'La Paz', 'AC'),
('11223344', 'Licenciatura', 'Carlos', 'Mendoza', 'Ríos', 'Masculino', '1992-03-15', 'carlos.mendoza@example.com', '765432198', 'Cochabamba', 'AC'),
('55667788', 'Doctorado', 'Ana', 'Torres', 'Vargas', 'Femenino', '1990-12-05', 'ana.torres@example.com', '654987321', 'Sucre', 'InAC'), 
('33445566', 'Maestría', 'Luis', 'Ramírez', 'Flores', 'Masculino', '1988-07-20', 'luis.ramirez@example.com', '987321654', 'Potosí', 'AC'),
('12345678', 'Licenciado', 'Carlos', 'González', 'Pérez', 'Masculino', '1980-05-15', 'carlos.gonzalez@gmail.com', '70000001', 'La Paz', 'AC'),
('23456789', 'Magíster', 'María', 'Lopez', 'Vargas', 'Femenino', '1985-08-22', 'maria.lopez@gmail.com', '70000002', 'Cochabamba', 'AC'),
('34567890', 'Doctorado', 'Jorge', 'Ramírez', 'Quiroga', 'Masculino', '1975-12-10', 'jorge.ramirez@gmail.com', '70000003', 'Santa Cruz', 'AC'),
('45678901', 'Licenciado', 'Ana', 'Rojas', 'Torrez', 'Femenino', '1990-03-18', 'ana.rojas@gmail.com', '70000004', 'Potosí', 'AC'),
('56789012', 'Magíster', 'Luis', 'Martínez', 'Suárez', 'Masculino', '1982-06-25', 'luis.martinez@gmail.com', '70000005', 'Tarija', 'AC'),
('67890123', 'Doctorado', 'Sofía', 'Gómez', 'Villalobos', 'Femenino', '1988-11-05', 'sofia.gomez@gmail.com', '70000006', 'Oruro', 'AC'),
('78901234', 'Licenciado', 'Pedro', 'Hernández', 'Castro', 'Masculino', '1983-09-12', 'pedro.hernandez@gmail.com', '70000007', 'Chuquisaca', 'AC'),
('89012345', 'Magíster', 'Laura', 'Ortiz', 'Jiménez', 'Femenino', '1992-01-30', 'laura.ortiz@gmail.com', '70000008', 'Beni', 'AC'),
('90123456', 'Doctorado', 'Daniel', 'Arce', 'Zeballos', 'Masculino', '1987-07-08', 'daniel.arce@gmail.com', '70000009', 'Pando', 'AC'),
('01234567', 'Licenciado', 'Mónica', 'Vega', 'Rivera', 'Femenino', '1993-04-22', 'monica.vega@gmail.com', '70000010', 'La Paz', 'AC'),
('11121314', 'Magíster', 'Raúl', 'Torres', 'Valdivia', 'Masculino', '1978-10-11', 'raul.torres@gmail.com', '70000011', 'Cochabamba', 'AC'),
('12131415', 'Doctorado', 'Patricia', 'Miranda', 'Avilés', 'Femenino', '1981-02-17', 'patricia.miranda@gmail.com', '70000012', 'Santa Cruz', 'AC'),
('13141516', 'Licenciado', 'Andrés', 'Navarro', 'López', 'Masculino', '1986-09-29', 'andres.navarro@gmail.com', '70000013', 'Potosí', 'AC');


INSERT INTO TbColegio (Nombre_Col, Estado_Col) VALUES
('Colegio Nacional Simón Bolívar', 'AC'),
('Colegio Alemán Federico Froebel', 'AC'),
('Colegio Internacional Americano', 'AC'),
('Colegio Británico San Jorge', 'AC'),
('Colegio Francés Lyceum', 'AC'),
('Colegio Adventista Central', 'AC'),
('Colegio Don Bosco', 'AC'),
('Colegio La Salle', 'AC'),
('Colegio Santa María Eufrasia', 'AC'),
('Colegio San Ignacio de Loyola', 'AC'),
('Colegio Juan Pablo II', 'AC'),
('Colegio José María Linares', 'AC'),
('Colegio Técnico Humanístico Boliviano', 'AC');


INSERT INTO TbJuradoColegio (Id_Jurado_JC, Id_Colegio_JC, Fecha_Ini_JC, Fecha_Fin_JC, Observacion_JC, Estado_FCC) VALUES
(1, 1, '2023-01-01', '2023-12-31', 'Participación en actividades académicas.', 'AC'),
(2, 2, '2023-02-01', '2023-12-31', 'Organización de eventos educativos.', 'AC'),
(3, 3, '2023-03-01', '2023-12-31', 'Evaluación de proyectos estudiantiles.', 'AC'),
(4, 4, '2023-04-01', '2023-12-31', 'Supervisión de prácticas académicas.', 'AC'),
(5, 5, '2023-05-01', '2023-12-31', 'Colaboración en talleres escolares.', 'AC'),
(6, 6, '2023-06-01', '2023-12-31', 'Participación en el consejo académico.', 'AC'),
(7, 7, '2023-07-01', '2023-12-31', 'Asesoramiento académico a estudiantes.', 'AC'),
(8, 8, '2023-08-01', '2023-12-31', 'Evaluación de competencias estudiantiles.', 'AC'),
(9, 9, '2023-09-01', '2023-12-31', 'Organización de conferencias escolares.', 'AC'),
(10, 10, '2023-10-01', '2023-12-31', 'Participación en reuniones de docentes.', 'AC'),
(11, 11, '2023-11-01', '2023-12-31', 'Supervisión de proyectos escolares.', 'AC'),
(12, 12, '2023-12-01', '2023-12-31', 'Colaboración en la planificación educativa.', 'AC'),
(13, 13, '2023-01-15', '2023-12-31', 'Asesoramiento en la creación de programas educativos.', 'AC');


 
INSERT INTO TbFuncionarioUniversidad (Id_Funcionario_FU, Id_Universidad_FU, Fecha_Ini_FU, Fecha_Fin_FU, Observacion_FU, Estado_FU)
VALUES 
(1, 1, '2020-01-01', '2022-12-31', 'Docente de tiempo completo', 'AC'),
(2, 2, '2019-03-15', '2021-08-30', 'Investigador asociado', 'AC'),
(3, 3, '2021-07-01', '2021-01-20', 'Profesor invitado', 'AC'),
(4, 1, '2018-05-20', '2020-05-19', 'Jefe de cátedra', 'AC'),
(5, 4, '2022-02-01', '2021-02-22', 'Asistente académico', 'AC');

 
INSERT INTO TbPUT_Jurado (Id_PUT_Jur, Id_Jurado_Jur, Representante_Jur, Observacion_Jur, Estado_Jur)
VALUES 
(1, 1, 'Dr. Juan Pérez', 'Presidente del jurado', 'AC'),
(1, 2, 'Dra. María Gómez', 'Miembro del jurado', 'AC'),
(2, 3, 'Ing. Carlos López', 'Representante externo', 'AC'),
(2, 4, 'MSc. Ana Torres', 'Suplente del jurado', 'AC'),
(3, 5, 'Lic. Pedro Sánchez', 'Evaluador externo', 'AC');




--  INSERT INTO TbFuncionarioColegioCargo (Id_Funcionario_FCC, Id_Colegio_FCC, Id_Cargo_FCC, Fec_Inicio_FCC, Fec_Fin_FCC, Estado_FCC) 
--  VALUES
--  (1, 1, 1, '2023-01-01', '2023-12-31', 'AC'),
--  (2, 2, 2, '2023-02-01', 2023-04-30, 'AC'),
--  (3, 3, 3, '2023-03-01', '2023-09-30', 'AC'),
--  (4, 4, 1, '2023-04-01', 2023-04-30, 'AC'),
--  (5, 5, 2, '2023-05-01', '2023-12-31', 'AC'),
--  (6, 6, 3, '2023-06-01', 2023-04-30, 'AC');
