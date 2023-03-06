// alert("estoy enlazado")


const users = [
  {
    name: "Diana",
    documento: "234",
    password: "perro",
    tipoUsuario: 1,
  },
  {
    name: "Juan",
    documento: "123",
    password: "000",
    tipoUsuario: 2,
  },
];

const dineroEnCajero = [
  {
    denominacion: 100000,
    cantidad: 0,
  },
  {
    denominacion: 50000,
    cantidad: 2,
  },
  {
    denominacion: 20000,
    cantidad: 2,
  },
  {
    denominacion: 10000,
    cantidad: 3,
  },
  {
    denominacion: 5000,
    cantidad: 2,
  },
];

const inicioCajero = () => {
  const numeroDocumento = prompt("Por favor ingrese su número de documento");
  const password = prompt("Por favor ingrese su contraseña");
  return {
    numeroDocumento,
    password,
  };
};

const validateUser = () => {
  let usuarioIniciado = inicioCajero();
  //Buscamos al usuario iniciado en nuestro arrays de usuarios registrados o existente
  let userFound = users.find(
    (user) =>
      user.documento === usuarioIniciado.numeroDocumento &&
      user.password === usuarioIniciado.password
  );
  //Se valida que mientras que el usuario que inició no existe, debe volver a ejecutar la función de inicio del cajero y la búsqueda del usuario en el array users.
  while (!userFound) {
    //Se le avisa al usuario que los datos ingresados están incorrectos
    alert("Los datos del usuario ingresado están incorrectos");
    //y se le vuelven a pedir los datos al usuario
    usuarioIniciado = inicioCajero();
    userFound = users.find(
      (user) =>
        user.documento === usuarioIniciado.numeroDocumento &&
        user.password === usuarioIniciado.password
    );
  }
  return userFound;
};

const depositarDinero = () => {
  alert("Vamos a depositar dinero");
  let totalDineroEnCajero = 0;
  dineroEnCajero.forEach((billete) => {
    const cantidadDepositadaStr = prompt(
      `Por favor ingrese la cantidad de billetes de ${billete.denominacion} a depositar`
    );
    const cantidadDepositada = Number(cantidadDepositadaStr);
    billete.cantidad += cantidadDepositada;
    const sumaDenominacion = billete.denominacion * billete.cantidad;
    totalDineroEnCajero += sumaDenominacion;
    console.log(
      `Hay ${sumaDenominacion} en billetes de ${billete.denominacion}`
    );
  });
  console.log("Dinero en cajero por denominación", dineroEnCajero);
  console.log("Total de dinero en el cajero", totalDineroEnCajero);
};




const retirarDinero = () => {
  const cantidadRetirar = parseInt(prompt("Ingrese la cantidad que desea retirar"));
  let totalDinero = 0;
  for (let i = 0; i < dineroEnCajero.length; i++) {
    totalDinero += dineroEnCajero[i].denominacion * dineroEnCajero[i].cantidad;
  }
  const dineroRestante = totalDinero - cantidadRetirar;
  if (dineroRestante <= 0) {
    console.log("El cajero puede entregar");

  } else {
    let dineroDisponible = cantidadRetirar;
    const denominacionesDisponibles = [];
    for (let i = 0; i < dineroEnCajero.length; i++) {
      const denominacion = dineroEnCajero[i].denominacion;
      const cantidad = dineroEnCajero[i].cantidad;
      const cantidadUsada = Math.floor(dineroDisponible / denominacion, cantidad);
      dineroDisponible -= cantidadUsada * denominacion;
      denominacionesDisponibles.push({ denominacion, cantidadUsada });
    }
    if (dineroDisponible > 0) {
      console.log("El cajero no tiene suficiente sencillo para entregar la cantidad total del retiro");
    }
    console.log("Se puede realizar el retiro, las denominaciones disponibles son:");
    for (let i = 0; i < denominacionesDisponibles.length; i++) {
      console.log(`${denominacionesDisponibles[i].cantidadUsada} 
      billetes de ${denominacionesDisponibles[i].denominacion}`);
    }

    console.log(`Cantidad retirada: ${cantidadRetirar}`);
    console.log(`Dinero restante en cajero después del retiro: ${dineroRestante}`);
    console.log(`Dinero que no pudo ser entregado por el cajero: ${dineroDisponible}`);

  }
};

const transaccionesCajero = () => {
  const usuarioEncontrado = validateUser();
  //Si el usuario ingresado existe, procedemos a validar que tipo de usuario es.
  if (usuarioEncontrado) {
    if (usuarioEncontrado.tipoUsuario === 1) {
      //Es administrador y debe depositar dinero
      depositarDinero();
      // Preguntar si desea continuar con otra transacción
      const continuar = prompt("¿Desea hacer otra transacción? (s/n)").toLowerCase();
      if (continuar === "s") {
        transaccionesCajero();
      }
    } else {
      //Es cliente y debe retirar dinero
      retirarDinero();
      // Preguntar si desea continuar con otra transacción
      const continuar = prompt("¿Desea hacer otra transacción? (s/n)").toLowerCase();
      if (continuar === "s") {
        transaccionesCajero();
      }
    }
  }
};

transaccionesCajero();
