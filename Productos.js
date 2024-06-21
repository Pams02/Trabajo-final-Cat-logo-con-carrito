$(document).ready(function() {
    var productos = [
        {
            codigo: "GT37SGP",
            nombre: "Refrigeradora Top Freezer 374 Litros",
            precioOriginal: 2500.00,
            precioDescuento: 2299.00,
            imagen: "https://www.lg.com/content/dam/channel/wcms/pe/images/refrigeradoras/gt37sgp_apzglpr_espr_pe_c/gallery/DZ1.jpg",
            alt: "Refrigeradora"
        },
        {
            codigo: "43PFD6917/44",
            nombre: "Android TV Full HD 6900 series",
            precioOriginal: 2300.00,
            precioDescuento: 1999.00,
            imagen: "https://images.philips.com/is/image/philipsconsumer/48529870a9be415d8eeeafb7009e7b8d?$jpglarge$&wid=960",
            alt: "Televisor"
        },
        {
            codigo: "118433",
            nombre: "Horno Microondas Miray HMM-25N 25 L",
            precioOriginal: 350.00,
            precioDescuento: 279.00,
            imagen: "https://hiraoka.com.pe/media/catalog/product/1/1/118433_hmm-25n_vista_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=560&width=700&canvas=700:560",
            alt: "Microondas"
        }
    ];

    var container = $('.container-custom .row');
    var carrito = [];

    function generarProductoHTML(producto) {
        return `
        <div class="col-12 col-md-6 col-lg-4 mt-2 mb-2">
            <div class="card">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.alt}">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">
                        <strong>Precio Original:</strong> <del>S/ ${producto.precioOriginal.toFixed(2)}</del><br>
                        <strong>Precio Descuento:</strong> S/ ${producto.precioDescuento.toFixed(2)}
                    </p>
                    <div class="d-grid gap-2">
                        <a href="Detalle.html" class="btn btn-primary">Ver detalles</a>
                        <button class="btn btn-primary agregar-carrito" data-codigo="${producto.codigo}" data-nombre="${producto.nombre}" data-precio="${producto.precioDescuento.toFixed(2)}">Comprar</button>
                    </div>
                </div>
            </div>
        </div>
        `;
    }

    productos.forEach(function(producto) {
        container.append(generarProductoHTML(producto));
    });

    function agregarAlCarrito(codigo, nombre, precio) {
        var productoExistente = carrito.find(function(item) {
            return item.codigo === codigo;
        });

        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            carrito.push({
                codigo: codigo,
                nombre: nombre,
                precio: parseFloat(precio),
                cantidad: 1
            });
        }

        actualizarCarrito();
    }

    function actualizarCarrito() {
        var total = 0;
        var carritoHTML = '';

        carrito.forEach(function(producto) {
            var subtotal = producto.precio * producto.cantidad;
            total += subtotal;

            carritoHTML += `
            <li class="carrito-item">
                <div class="producto-info">
                    <img src="${productos.find(p => p.codigo === producto.codigo).imagen}" width="50" height="50">
                    <div>
                        <span class="nombre">${producto.nombre}</span>
                        <span class="precio">S/ ${producto.precio.toFixed(2)}</span>
                    </div>
                </div>
                <div class="acciones">
                    <span class="cantidad">${producto.cantidad}</span>
                    <button class="eliminar-producto btn btn-sm btn-danger" data-codigo="${producto.codigo}"><i class="fas fa-trash"></i></button>
                </div>
            </li>
            `;
        });

        $('#cont-cart').html(carritoHTML);
        $('#total-cart').text(`S/ ${total.toFixed(2)}`);
        $('#contador').text(carrito.length);
    }

    $('.container-custom').on('click', '.agregar-carrito', function() {
        var codigo = $(this).data('codigo');
        var nombre = $(this).data('nombre');
        var precio = $(this).data('precio');

        agregarAlCarrito(codigo, nombre, precio);
    });

    $('#cont-cart').on('click', '.eliminar-producto', function() {
        var codigo = $(this).data('codigo');
        
        carrito = carrito.filter(function(producto) {
            return producto.codigo !== codigo;
        });

        actualizarCarrito();
    });
});