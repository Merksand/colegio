function Pruebas() {

  const bcrypt = require('bcryptjs');

  const randomPassword = '!@#'; // Contraseña real generada
  const hashAlmacenado = '$2b$10$zLga2F3FWl4OJr7PxjiOSuPebtwx4cfni/kkGs/P2.cmsRBODaqVq'; // Reemplaza con el hash real almacenado
  const isValid = bcrypt.compareSync(randomPassword, hashAlmacenado);

  bcrypt.compare(randomPassword, hashAlmacenado)
    .then(isValid => console.log('¿Coinciden?', isValid))
    .catch(error => console.error('Error al comparar:', error));

  console.log('Coincide:', isValid);

  return (<div>

    jffjfjfff
  </div>);
}

export default Pruebas;