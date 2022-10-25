const listaDeProductos = [
    {
        id: 1,
        nombre: "Sushi",
        precio: 500,
        stock: 100,
        img: "img/sushi.jpg",

    },
    {
        id: 2,
        nombre: "Tragos",
        precio: 600,
        stock: 20,
        img: "img/tragos.jpg",

    },
    {
        id: 3,
        nombre: "Waffles",
        precio: 300,
        stock: 50,
        img: "img/waffles.jpg",

    },
    {
        id: 4,
        nombre: "Torta",
        precio: 350,
        stock: 50,
        img: "img/torta.jpg",

    },
    {
        id: 5,
        nombre: "Langostinos",
        precio: 400,
        stock: 30,
        img: "img/langostinos.jpg",

    },
    {
        id: 6,
        nombre: "Sorrentinos",
        precio: 600,
        stock: 20,
        img: "img/sorrentinos.jpg",

    }
  
]

let catalogo = document.getElementById ("items")
let listaCarrito = document.getElementById ("carrito")
let botonDeBorrar = document.getElementById ("boton-vaciar")
let valorTotal = document.getElementById ("total")
let carrito = []

botonDeBorrar.addEventListener ("click", botonDeBorrarHandler)
cargarCarritoDeStorage()
rendercarrito()



listaDeProductos.forEach ((prod) => {

    let container = document.createElement("div")
    container.classList.add("card", "col-sm-4")

    let cardBody = document.createElement("div")
    cardBody.classList.add("card-body")

    let cardTitulo = document.createElement ("h5")
    cardTitulo.classList.add ("card-tittle")
    cardTitulo.innerText = prod.nombre
    //precio
    let cardPrecio = document.createElement ("p")
    cardPrecio.classList.add ("card-text")
    cardPrecio.innerText = `Precio $ ${prod.precio}`
    //Stock
    let cardStock = document.createElement ("p")
    cardStock.classList.add ("card-text")
    cardStock.innerText = `Stock Disponible ${prod.stock}`
    //botón de Compra
    let cardBoton = document.createElement ("button")
    cardBoton.classList.add ("btn", "btn-primary")
    cardBoton.innerText = "Agregar al carrito"
    cardBoton.setAttribute("mark", prod.id)
    cardBoton.addEventListener("click", addProdToCart)
    //imagen
    let cardimg = document.createElement ("img")
    cardimg.classList.add ("img-fluid")
    cardimg.setAttribute ("src", prod.img)



    cardBody.append (cardimg)
    cardBody.append (cardTitulo)
    cardBody.append (cardPrecio)
    cardBody.append (cardStock)
    cardBody.append (cardBoton)
    

    container.append (cardBody)

    catalogo.append (container)

})

function addProdToCart(e) {
    carrito.push(e.target.getAttribute("mark"))
    rendercarrito()

}

function rendercarrito () {

    guardarCarritoEnStorage()

    listaCarrito.innerHTML = ""

    let carritoSinElementosRepetidos = [... new Set (carrito)]

    carritoSinElementosRepetidos.forEach((prod) => {
        let item = listaDeProductos.filter((producto) => {
            return producto.id ===parseInt(prod)
        })
        let cantidad = carrito.reduce(  (total,id) => {
            return id === prod ? total += 1 : total
        }, 0)
   

    let linea = document.createElement("li")
    linea.classList.add ("list-group-item", "text-right", "mx-2")
    linea.innerText = `${cantidad} x ${item[0].nombre} - $${item[0].precio}`

    let botonDeBorrar = document.createElement ("button")
    botonDeBorrar.classList.add ("btn", "btn-danger", "mx-5")
    botonDeBorrar.innerText = "X"
    botonDeBorrar.dataset.item = prod
    botonDeBorrar.addEventListener ("click", borrarProducto)

    linea.append(botonDeBorrar)
    listaCarrito.append(linea)
    })

    valorTotal.innerText = calcularPrecioTotal ()

}

function borrarProducto(evento){
    let id = evento.target.dataset.item
    carrito= carrito.filter((cartId) => {
        return cartId != id 
    })
    rendercarrito()
}

function botonDeBorrarHandler () {
    carrito = []
    rendercarrito ()
}

function calcularPrecioTotal () {
    return carrito.reduce((total, prod) =>{
        let item = listaDeProductos.filter((producto) => {
            return producto.id ===parseInt(prod)
        })  

      return total + item[0].precio
    },0)
   
}

function guardarCarritoEnStorage (){
    localStorage.setItem("carrito", JSON.stringify(carrito))

}

function cargarCarritoDeStorage () {
    if (localStorage.getItem("carrito")!== null) {
        carrito = JSON.parse(localStorage.getItem("carrito"))
    }
}