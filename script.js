class Productosf1 {
  constructor(id, nombre, img, precio, cantidad) {
    this.id = id;
    this.nombre = nombre;
    this.img = img;
    this.precio = precio;
    this.cantidad = cantidad;
  }
}

const productos = [];
const contenedorProductos = document.getElementById("contenedorProductos");

const consultarProductos = async () => {
  const response = await fetch("./productos.json");
  const productos = await response.json();
  return productos;
};

consultarProductos().then((productos) => {
  productos.forEach((producto) => {
    const divProducto = document.createElement("div");
    divProducto.className = "tarjetaProducto";
    divProducto.innerHTML = `
              <img src="${producto.img}" class= "imagenesProductos">
              <h3> ${producto.nombre} </h3>
              <p> $${producto.precio} </p>
              <button id="boton${producto.id}" class="boton">Añadir</button>
              `;

    contenedorProductos.append(divProducto);

    const boton = document.getElementById(`boton${producto.id}`);
    boton.addEventListener("click", () => {
      agregarAlCarrito(producto.id);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Agregaste ${producto.nombre}`,
        showConfirmButton: false,
        timer: 2000,
        background: "#a52622c5",
        color: "#ffffff",
      });
    });
  });
});


const carritostorage = JSON.parse(localStorage.getItem("carrito"));
if (carritostorage) {
  carrito = carritostorage;
} else {
  carrito = [];
}

const contenedorCarrito = document.getElementById("contenedorCarrito");
const contador = document.getElementById("contador");

const agregarAlCarrito = (id) => {
  const producto = productos.find((producto) => producto.id === id);
  const productoEnCarrito = carrito.find((producto) => producto.id === id);
  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
  } else {
    carrito.push(producto);
  }
  actualizarCarrito();

  localStorage.setItem("carrito", JSON.stringify(carrito));
};

function actualizarCarrito() {
  let actualizar = "";
  carrito.forEach((producto) => {
    actualizar += `
        <div class="contenido-carrito">
        <h3 class="itemCarritoTitulo"> ${producto.nombre} </h3>
        <p class="itemCarrito">$${producto.precio}</p>
        <p class= "itemCarrito">${producto.cantidad}</p>
        <button onClick = "eliminarDelCarrito(${producto.id})" class="boton">Eliminar</button>
        </div>`;
  });

  contenedorCarrito.innerHTML = actualizar;
  calcularTotalCompra();
}

const eliminarDelCarrito = (id) => {
  const producto = carrito.find((producto) => producto.id === id);
  carrito.splice(carrito.indexOf(producto), 1);
  actualizarCarrito();
};

const vaciarCarrito = document.getElementById("vaciarCarrito");
vaciarCarrito.addEventListener("click", () => {
  carrito.splice(0, carrito.length);
  actualizarCarrito();
});

const totalCompra = document.getElementById("totalCompra");
const completar = document.getElementById("completarCompra");

const calcularTotalCompra = () => {
  let total = 0;
  carrito.forEach((producto) => {
    total += producto.precio * producto.cantidad;
  });
  totalCompra.innerHTML = total;

  if (total !== 0) {
    completar.addEventListener("click", completar);
  }
};

document.addEventListener("keyup", (e) => {
  if (e.target.matches("#buscador")) {
    document.querySelectorAll(".tarjetaProducto").forEach((elemento) => {
      elemento.textContent.toLowerCase().includes(e.target.value.toLowerCase())
        ? elemento.classList.remove("filtro")
        : elemento.classList.add("filtro");
    });
  }
});
//   const dolar = document.getElementById("dolar")

//   fetch("https://criptoya.com/api/dolar")
//   .then(response => response.json())
//   .then(({blue}) => {
// dolar.innerHTML = "

// <h2> "La cotizacion del dolar actualmente "</h2>
// <p>es: $ ${blue}</p>

// "
//   })
