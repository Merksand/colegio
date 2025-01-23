const verificarPersona = async () => {
  try {
    console.log("Verificando persona con CI:", ci); // Verifica el CI antes de enviar la solicitud

    const response = await fetch(`/api/personas?ci=${ci}`);
    console.log("Respuesta del servidor:", response); // Revisa el objeto de respuesta

    const data = await response.json();
    console.log("Datos recibidos del servidor:", data); // Muestra los datos recibidos

    if (data.error) {
      console.error("Error desde el servidor:", data.error);
      setErrorMessage(data.error);
      setPersona(null);
      return;
    }

    if (data.usuarioExiste) {
      console.warn("La persona ya tiene una cuenta creada.");
      setErrorMessage("Esta persona ya tiene una cuenta creada.");
      setPersona(null);
      return;
    }

    // Generar usuario y contraseña
    const usuario = `${data.Nombre_Per}${data.Paterno_Per}`.toLowerCase();
    const password = Math.random().toString(36).slice(-8) + "!@#"; // Contraseña aleatoria

    console.log("Usuario generado:", usuario); // Verifica el usuario generado
    console.log("Contraseña generada:", password); // Verifica la contraseña generada

    setPersona(data);
    setUsuarioGenerado(usuario);
    setPasswordGenerado(password);
    setErrorMessage("");
  } catch (error) {
    console.error("Error al verificar la persona:", error); // Muestra el error capturado
    setErrorMessage("Error al verificar la persona.");
  }
};


console.log("----------------------------------------------------------------")



const verificarPersona = async () => {
  try {
    console.log("Verificando persona con CI:", ci);

    const response = await fetch(`/api/personas?ci=${ci}`);
    console.log("Respuesta del servidor:", response);

    const data = await response.json();
    console.log("Datos recibidos del servidor:", data);

    if (data.error) {
      setErrorMessage(data.error);
      setPersona(null);
      return;
    }

    if (data.length === 0) {
      setErrorMessage("No se encontró una persona con este CI.");
      setPersona(null);
      return;
    }

    if (data[0].usuarioExiste) {
      setErrorMessage("Esta persona ya tiene una cuenta creada.");
      setPersona(null);
      return;
    }

    // Tomar el primer elemento del array devuelto
    const persona = data[0];
    console.log("Persona seleccionada:", persona);

    // Generar usuario y contraseña
    const usuario = `${persona.Nombre_Per}${persona.Paterno_Per}`.toLowerCase();
    const password = Math.random().toString(36).slice(-8) + "!@#";

    setPersona(persona);
    setUsuarioGenerado(usuario);
    setPasswordGenerado(password);
    setErrorMessage("");
    console.log("Usuario generado:", usuario);
    console.log("Contraseña generada:", password);
  } catch (error) {
    setErrorMessage("Error al verificar la persona.");
    console.error("Error al verificar la persona:", error);
  }
};
