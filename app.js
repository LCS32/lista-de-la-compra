//Variables
const listaCompra = document.querySelector('#listaCompra');
const articulo = document.querySelector('#articulo');
let productos = [];

// Event Listeners
eventListeners();
function eventListeners() {
    //Cuando se envia el formulario
    articulo.addEventListener('submit', agregarProducto);

    // Borrar productos
    listaCompra.addEventListener('click', borrarProducto);

    // Contenido cargado
    document.addEventListener('DOMContentLoaded', () => {
        productos = JSON.parse( localStorage.getItem('productos') ) || []  ;
        console.log(productos);
        crearHTML();
    });
}
    




function agregarProducto(e) {
    e.preventDefault();
    // Leer el valor del text area
    const producto = document.querySelector('#producto').value;


    //Validacion
    if (producto === ''){
        mostrarError('Introduce un articulo');
        return;
    }

     // Crear un objeto Tweet
     const productoObj = {
        id: Date.now(),
        texto: producto,
    }

    // Añadirlo a mis tweets
    productos = [...productos, productoObj];
    
    // Una vez agregado, mandamos renderizar nuestro HTML
    crearHTML();

    // Reiniciar el formulario
    formulario.reset();
}



function mostrarError(error) {
    const mensajeEerror = document.createElement('p');
    mensajeEerror.textContent = error;
    mensajeEerror.classList.add('error');

    const contenido = document.querySelector('.articulo');
    contenido.appendChild(mensajeEerror);

    setTimeout(() => {
         mensajeEerror.remove();
    }, 3000);
}

function crearHTML() {
    limpiarHTML();

    if (productos.length > 0 ) {
        productos.forEach( producto =>  {
            // crear boton de eliminar
            const botonBorrar = document.createElement('a');
            botonBorrar.classList = 'borrar-producto';
            botonBorrar.innerText = 'X';
  
            // Crear elemento y añadirle el contenido a la lista
            const li = document.createElement('li');

            // Añade el texto
            li.innerText = producto.texto;

            // añade el botón de borrar al producto
            li.appendChild(botonBorrar);

            // añade un atributo único...
            li.dataset.productoId = producto.id;

            // añade el producto a la lista
            listaCompra.appendChild(li);
       });
  }

  sincronizarStorage();
}
   
// Elimina el Producto del DOM
function borrarProducto(e) {
    e.preventDefault();

    // console.log(e.target.parentElement.dataset.productoId);
    const id = e.target.parentElement.dataset.productoId;
    productos = productos.filter( producto => producto.id != id  );
    crearHTML();
}

// Agrega tweet a local storage
function sincronizarStorage() {
    localStorage.setItem('productos', JSON.stringify(productos));
}

// Elimina los cursos del carrito en el DOM
function limpiarHTML() {
    while(listaCompra.firstChild) {
         listaCompra.removeChild(listaCompra.firstChild);
    }
}