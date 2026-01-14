// Array con 10 productos de ejemplo
const products = [
  {
    id: 1,
    nombre: "Auriculares Bluetooth",
    precio: 9990,
    descripcion: "Auriculares inalámbricos con cancelación de ruido",
    imagen:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    categoria: "Electrónica",
  },
  {
    id: 2,
    nombre: "Mochila Deportiva",
    precio: 7990,
    descripcion: "Mochila resistente al agua con múltiples compartimentos",
    imagen:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    categoria: "Accesorios",
  },
  {
    id: 3,
    nombre: "Cafetera Express",
    precio: 29990,
    descripcion: "Cafetera automática con espumador de leche",
    imagen:
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=400&fit=crop",
    categoria: "Hogar",
  },
  {
    id: 4,
    nombre: "Reloj Inteligente",
    precio: 39990,
    descripcion: "Smartwatch con monitor de frecuencia cardíaca y GPS",
    imagen:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    categoria: "Electrónica",
  },
  {
    id: 5,
    nombre: "Zapatillas Running",
    precio: 59990,
    descripcion: "Zapatillas deportivas con amortiguación avanzada",
    imagen:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    categoria: "Deportes",
  },
  {
    id: 6,
    nombre: "Cámara Instantánea",
    precio: 99990,
    descripcion: "Cámara que imprime fotos al instante",
    imagen:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop",
    categoria: "Fotografía",
  },
  {
    id: 7,
    nombre: "Planta Suculenta",
    precio: 3990,
    descripcion: "Planta decorativa de bajo mantenimiento",
    imagen:
      "https://images.unsplash.com/photo-1459156212016-c812468e2115?w=400&h=400&fit=crop",
    categoria: "Hogar",
  },
  {
    id: 8,
    nombre: "Libro de Cocina",
    precio: 15990,
    descripcion: "Recetas saludables para el día a día",
    imagen:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=400&fit=crop",
    categoria: "Libros",
  },
  {
    id: 9,
    nombre: "Botella Térmica",
    precio: 8990,
    descripcion: "Botella de acero inoxidable que mantiene temperatura 24h",
    imagen:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
    categoria: "Accesorios",
  },
  {
    id: 10,
    nombre: "Teclado Mecánico",
    precio: 17990,
    descripcion: "Teclado gaming con iluminación RGB",
    imagen:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop",
    categoria: "Electrónica",
  },
];

//Elementos HTML
const productsSection = document.getElementById("products-section");
const dialog = document.getElementById("modal");
const closeBtn = document.getElementById("close-modal");
const saleSection = document.getElementById("sale-section");
const navbarLinks = document.getElementById("navbar-links");
const navbarBrand = document.querySelector(".navbar-brand");

// Funciones
function showProducts(productsArray, elementHTML, callback) {
  elementHTML.innerHTML = "";
  productsArray.forEach((product) => {
    elementHTML.innerHTML += callback(product);
  });
}

function randomProducts(productsArray) {
  const randomProducts = [];
  const numberOfProducts = 5;
  do {
    const randomIndex = Math.floor(Math.random() * productsArray.length);
    if (!randomProducts.includes(productsArray[randomIndex])) {
      randomProducts.push(productsArray[randomIndex]);
    }
  } while (randomProducts.length < numberOfProducts);
  return randomProducts;
}

function discounts(productsArray) {
  const percentages = [0.2, 0.3, 0.4, 0.5, 0.6];
  const discountedProducts = productsArray.map((product) => {
    const randomIndex = Math.floor(Math.random() * percentages.length);
    const discount = percentages[randomIndex];

    return Object.assign({}, product, {
      precioOriginal: product.precio,
      descuento: Math.round(discount * 100),
      precio: Math.round(product.precio * (1 - discount)),
    });
  });
  return discountedProducts;
}

function categorizer(productsArray) {
  const categorias = [];
  productsArray.forEach((product) => {
    if (!categorias.includes(product.categoria)) {
      categorias.push(product.categoria);
    }
  });
  return categorias;
}

// Invocación de funciones
const SelectedProducts = randomProducts(products);
const discountedProducts = discounts(SelectedProducts);
showProducts(
  categorizer(products),
  navbarLinks,
  (product) => `<li class="nav-item">
    <a class="nav-link" href="#">${product}</a>
    </li>`
);

showProducts(
  products,
  productsSection,
  (product) => `<div class="col">
  <div class="card">
      <img src="${product.imagen}" class="card-img-top" alt="${product.nombre}">
      <div class="card-body">
        <h5 class="card-title">${product.nombre}</h5>
        </div>
        <ul class="list-group list-group-flush">
        <li class="list-group-item">${product.descripcion}</li>
        </ul>
        <div class="card-body">
        <a href="#" class="card-link category-link">${product.categoria}</a>
        <a href="#" class="card-link price-link">$${product.precio.toLocaleString()}</a>
        </div>
        </div>
        </div>`
);

showProducts(
  discountedProducts,
  saleSection,
  (product) => `
  <div class="col">
  <div class="card">
    <img src="${product.imagen}" class="card-img-top" alt="${product.nombre}">
    <div class="card-body">
      <h5 class="card-title">${product.nombre}</h5>
    </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Descuento: <b>${product.descuento}%</b></li>
        <li class="list-group-item">Precio Original: <s>$${product.precioOriginal.toLocaleString()}</s></li>
        </ul>
        <div class="card-body">
        <a href="#" class="card-link price-link">$${product.precio.toLocaleString()}</a>
    </div>
    </div>
  </div>`
);

// Events listeners
navbarBrand.addEventListener("click", (e) => {
  e.preventDefault();
  showProducts(
    products,
    productsSection,
    (product) => `<div class="col">
    <div class="card">
      <img src="${product.imagen}" class="card-img-top" alt="${product.nombre}">
      <div class="card-body">
      <h5 class="card-title">${product.nombre}</h5>
      </div>
      <ul class="list-group list-group-flush">
      <li class="list-group-item">${product.descripcion}</li>
      </ul>
      <div class="card-body">
      <a href="#" class="card-link category-link">${product.categoria}</a>
        <a href="#" class="card-link price-link">$${product.precio.toLocaleString()}</a>
        </div>
        </div>
        </div>`
  );
});

navbarLinks.addEventListener("click", (e) => {
  e.preventDefault();
  showProducts(products, productsSection, (product) => {
    if (product.categoria === e.target.innerHTML) {
      return `<div class="col">
      <div class="card">
          <img src="${product.imagen}" class="card-img-top" alt="${
        product.nombre
      }">
          <div class="card-body">
          <h5 class="card-title">${product.nombre}</h5>
          </div>
          <ul class="list-group list-group-flush">
          <li class="list-group-item">${product.descripcion}</li>
          </ul>
          <div class="card-body">
          <a href="#" class="card-link category-link">${product.categoria}</a>
          <a href="#" class="card-link price-link">$${product.precio.toLocaleString()}</a>
          </div>
          </div>
          </div>`;
    }
    return "";
  });
});

productsSection.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("card-link") &&
    e.target.classList.contains("category-link")
  ) {
    e.preventDefault();
    showProducts(products, productsSection, (product) => {
      if (product.categoria === e.target.innerHTML) {
        return `<div class="col">
                <div class="card">
                <img src="${product.imagen}" class="card-img-top" alt="${
          product.nombre
        }">
                <div class="card-body">
                  <h5 class="card-title">${product.nombre}</h5>
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">${product.descripcion}</li>
                </ul>
                <div class="card-body">
                  <a href="#" class="card-link category-link">${
                    product.categoria
                  }</a>
            <a href="#" class="card-link price-link">$${product.precio.toLocaleString()}</a>
                </div>
                </div>
            </div>`;
      }
      return "";
    });
  }
});

// Mostrar diálogo al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  dialog.showModal();
  closeBtn.addEventListener("click", () => {
    dialog.close();
  });
});
