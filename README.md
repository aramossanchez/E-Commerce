# - GEEKSHUBS Reto Final - Backend E-Commerce

Realizamos un backend para e-commerce.

Funcionalidad API REST con las siguiente tecnologías:

##### -NojeJS
##### -Express
##### -Mongoose
##### -Git

## -FEATURE 1: Gestión de usuario

**VALIDACIÓN POR TOKEN**

Se ha creado una funcionalidad en la API en la que, tras iniciar sesión (en función de que tipo de rol tengas asignado) se te entregará un token.

Será necesario incluir ese token en el header html para conseguir acceso a algunos endpoints especificados mas adelante.

En la carpeta 'config' tenemos creados varios ficheros para este fin.

##### -Tenemos creado 'token.js', donde indicamos las claves con las que cifraremos los token.

##### -Creamos 'accesoTokenUsuarios.js', 'accesoTokenVendedores.js' y accesoTokenAdministradores.js', en los que incluimos el código necesario para conseguir que, en el intento de acceso de algunos endpoints, nos solicite por header html un token correcto ('token-acceso').

**ENDPOINT DE LOGIN**

##### POST -- localhost:3000/usuarios/login

Pasamos por body DNI del usuario y contraseña (datos guardados en la base de datos), y nos devuelve mensaje indicando que todo está correcto y el token (tres tipos de token diferentes: usuario, vendedor o administrador).

**ENDPOINT DE REGISTRO**

##### POST -- localhost:3000/usuarios/registro

Pasamos por body todos los datos necesarios para la creación del usuario (ver archivo 'models->Usuario.js').

-El body será por json. Admite que en el json haya solo un objeto o un array de objetos-

El campo valor del 'contraseña' se guarda en la base de datos de manera encriptada (ver archivo 'models->Usuario.js').

Devuelve los datos guardados en la base de datos tras el registro (sin mostrar el campo contraseña).

Ejemplo de json con un usuario:

{
    "nombre": "Martin",
    "apellidos": "Ramos Amado",
    "dni": "12345678X",
    "direccion": "Calle Jardín 1, 9ºD, Valencia, Valencia, 46003",
    "email": "Martin@ohyeah.com",
    "telefono": 666778921,
    "rol": "usuario",
    "contraseña": "123456789"
}

Ejemplo de json con varios usuarios:

[
{
    "nombre": "Armando",
    "apellidos": "Ramos Sánchez",
    "dni": "74125896A",
    "direccion": "Calle Joaquin 22, 2ºC, Albacete, Albacete, 02001",
    "email": "Armando@ohyeah.com",
    "telefono": 654557321,
    "rol": "administrador",
    "contraseña": "12345678"
},

{
    "nombre": "Funko",
    "apellidos": "SL",
    "dni": "N12457805",
    "direccion": "Calle Toledo 11, 8ºA, Valencia, Valencia, 46001",
    "email": "funko@funko.com",
    "telefono": 654778921,
    "rol": "vendedor",
    "contraseña": "abcdefgh"
}
]

**ENDPOINT DE PERFIL (DATOS DE USUARIO)**

##### GET -- localhost:3000/usuarios/buscar/:id

Introducimos '_id' de usuario existente en la base de datos y nos devolverá la información almacenada sobre él en la base de datos (salvo información sensible).

**ROLES ADMINISTRADOR/ USUARIO/ VENDEDOR**

A la hora de crear un usuario en la base de datos, uno de los campos que tenemos definidos es 'rol'. Solo pueden existir 3 valores para este campo: usuario, vendedor o administrador. Por defecto, si no se especifica, se creará con rol 'usuario'.

**ENDPOINTS MODIFICAR DATOS DE USUARIO**

##### POST -- localhost:3000/usuarios/modificar/:id

Introducimos '_id' de usuario por url (para hacer la búsqueda del usuario que queremos modificar), y pasamos por body los cambios que queremos actualizar en la base de datos. Tras guardar los datos, se nos mostrará en pantalla todos los datos del usuario actualizados.

## -FEATURE 2: Gestión Product

**ENDPOINTS ANAÑIR, ELIMINAR, MODIFICAR PRODUCTO (VENDEDOR)**

##### -AÑADIR- POST -- localhost:3000/productos/crear

Pasamos por body todos los datos necesarios para la creación del producto (ver archivo 'models->Producto.js').

-El body será por json. Admite que en el json haya solo un objeto o un array de objetos-

Devuelve los datos guardados en la base de datos tras el registro.

En el archivo 'routes->productos.js' se especifica que solo se pueda acceder a este endpoint añadiendo en el header html 'token-acceso' un token válido de vendedor.

Ejemplo de json con un producto:

{
    "nombre": "Dragon Blanco de Ojos Azules",
    "foto": "http://localhost:3000/dragon_blanco_ojos_azules.jpg",
    "tipo": "funko",
    "vendedor": "Funko SL",
    "precio": 17.95,
    "categoria": ["videojuego", "anime", "yugioh", "funko"]
}

Ejemplo de json con varios productos:

[
{
    "nombre": "Edward Elric",
    "foto": "http://localhost:3000/edward_elric.jpg",
    "tipo": "funko",
    "vendedor": "Funko SL",
    "precio": 15.25,
    "categoria": ["anime", "fullmetal alchemist", "funko"]
},

{
    "nombre": "Flash",
    "foto": "http://localhost:3000/flash.jpg",
    "tipo": "funko",
    "vendedor": "Funko SL",
    "precio": 16.45,
    "categoria": ["comic", "flash", "dc", "funko"]
}
]

##### -ELIMINAR- GET -- localhost:3000/productos/eliminar/:id

Introducimos por url el '_id' del producto que queramos eliminar.

Nos mostrará por pantalla el producto que hemos eliminado.

En el archivo 'routes->productos.js' se especifica que solo se pueda acceder a este endpoint añadiendo en el header html 'token-acceso' un token válido de vendedor.

##### -MODIFICAR- POST -- localhost:3000/productos/modificar/:id

Introducimos '_id' de producto por url (para hacer la búsqueda del producto que queremos modificar), y pasamos por body los cambios que queremos actualizar en la base de datos. Tras guardar los datos, se nos mostrará en pantalla todos los datos del producto actualizados.

En el archivo 'routes->productos.js' se especifica que solo se pueda acceder a este endpoint añadiendo en el header html 'token-acceso' un token válido de vendedor.

**ENDPOINTS MUESTRA ALL PRODUCTS**

##### GET -- localhost:3000/productos/buscar

Muestra todos los productos y todos los datos guardados sobre ellos en la base de datos.

**ENDPOINTS PRODUCTOS FILTRO (MÁS VENDIDOS, PRECIO, TÍTULO...)**

###### -PRECIO ASCENDENTE- GET -- localhost:3000/productos/ordenar/precio/ascendente

Ordena los productos por precio, de menor a mayor.

###### -PRECIO DESCENDENTE- GET -- localhost:3000/productos/ordenar/precio/descendente

Ordena los productos por precio, de mayor a menor.

###### -ALFABÉTICO ASCENDENTE- GET -- localhost:3000/productos/ordenar/nombre/ascendente

Ordena los productos por nombre, en orden alfabético.

###### -ALFABÉTICO DESCENDENTE- GET -- localhost:3000/productos/ordenar/nombre/descendente

Ordena los productos por nombre, en orden alfabético inverso.

###### -MENOS VENDIDOS- GET -- localhost:3000/productos/ordenar/ventas/ascendente

Ordena los productos en función de las veces que han sido comprados, de menor a mayor

(existe un campo en cada producto llamado 'vendidos', el cual aumenta en +1 cuando se hace una compra de ese producto)

###### -MÁS VENDIDOS- GET -- localhost:3000/productos/ordenar/ventas/descendente

Ordena los productos en función de las veces que han sido comprados, de mayor a menor

(existe un campo en cada producto llamado 'vendidos', el cual aumenta en +1 cuando se hace una compra de ese producto)

**ENDPOINTS DE PRODUCTOS POR VENDEDOR**

##### GET -- localhost:3000/productos/buscar/vendedor/:vendedor

Introducimos por url el valor del campo 'vendedor' que tenemos en los productos, y nos devolverá todos los productos con ese vendedor.

**ENDPOINTS DE PRODUCTOS POR CATEGORÍA**

##### GET -- localhost:3000/productos/buscar/categoria/:categoria

Introducimos por url el valor del campo 'categoria' que tenemos en los productos, y nos devolverá todos los productos con esa categoría.

## -FEATURE 3: Gestión Compras

**ENDPOINT DE AÑADIR COMPRA**

##### POST -- localhost:3000/compras/crear

Pasamos por body 'id_producto' y 'dni_usuario' (ver archivo 'models->Compra.js'). Los campos de precio y de fecha se añaden automaticamente.

-El body será por json. Admite que en el json haya solo un objeto o un array de objetos-

Aumenta en +1 el campo 'vendidos' del producto que se haya incluido en la compra

Devuelve los datos guardados en la base de datos tras la creación de la compra.

Los datos de 'id_producto' y de 'dni_usuario' deberán de existir en la base de datos, si no dará error.

Ejemplo de json con una compra:

{
    "id_producto": "5f78db9c2a55820690afbdba",
    "dni_usuario": "45871269V"
}

Ejemplo de json con varias compras:

[
{
    "id_producto": "5f78db9c2a55820690afbdbe",
    "dni_usuario": "48541269V"
},
{
    "id_producto": "5f78db9c2a55820690afbda9",
    "dni_usuario": "88451269C"
},
{
    "id_producto": "5f78db9c2a55820690afbdac",
    "dni_usuario": "88451269C"
},
{
    "id_producto": "5f78db9c2a55820690afbdc4",
    "dni_usuario": "01554872Q"
}
]

**ENDPOINT MUESTRAS TODAS LAS COMPRAS**

##### GET -- localhost:3000/compras/buscar

Muestra todas las compras almacenadas en la base de datos

**ENDPOINT DE COMPRAS POR USUARIO (MODO FACTURA)**

##### -MUESTRA LA COLECCIÓN 'COMPRAS'- GET -- localhost:3000/compras/buscar/:usuario

Introducimos por url 'dni' de usuario, y mostrará cada compra hecha por ese usuario. En cada compra se mostrarán los datos tanto de producto como del cliente, además de los propios de la compra.

##### -MUESTRA LA COLECCIÓN 'PEDIDOS'- GET -- localhost:3000/pedidos/buscar/:usuario

--------------------------PARÉNTIS---------------------------

Para tener otra manera de consultar las compras de los clientes mas organizada, decidí crear la colección 'pedidos', con su propio endpoint.

La colección 'pedidos' recoge la compra o compras que ha hecho un usuario PARA MOSTRAR EL PEDIDO COMPLETO. Por ejemplo: en nuestro e-commerce, un usuario hace una compra de 'Monitor Asus 24 pulgadas' y hace otra compra de 'Pendrive Kingston 32GB'. Esas 2 compras las hace en la misma visita a la página, las pagará a la vez y se le enviarán a la vez a la misma dirección, por lo tanto se creará un pedido para esas 2 compras, información que se almacenará en la colección 'pedidos'.

--ENDPOINT DE CREACIÓN DE PEDIDO--

-POST -- localhost:3000/pedidos/crear

Pasamos por body todos los datos necesarios para la creación del pedido, que es unicamente un array con los "id_compra" que queramos añadir a un mismo pedido. El resto de campos del documento se creará de manera automática (ver archivo 'models->Pedido.js').

-El body será por json. Admite que en el json haya un solo array de objetos o un array de arrays de objetos-

Devuelve los datos guardados en la base de datos tras guardar los datos de los pedidos.

Los datos de 'id_compra' deberán de existir en la base de datos, si no dará error.

Ejemplo de json con un pedido:

[
    {
        "id_compra": "5f78dd42da37d5401417e2eb"
    },
    {
        "id_compra": "5f78dd42da37d5401417e2ec"
    },
    {
        "id_compra": "5f78dd42da37d5401417e2ed"
    }
]

Ejemplo de json con varios pedidos:

[
[
    {
        "id_compra": "5f78dd42da37d5401417e2eb"
    },
    {
        "id_compra": "5f78dd42da37d5401417e2ec"
    },
    {
        "id_compra": "5f78dd42da37d5401417e2ed"
    }
],
[
    {
        "id_compra": "5f78dd43da37d5401417e2ee"
    }
],
[
    {
        "id_compra": "5f78dd43da37d5401417e2ef"
    },
    {
        "id_compra": "5f78dd43da37d5401417e2f0"
    },
    {
        "id_compra": "5f78dd43da37d5401417e2f1"
    },
    {
        "id_compra": "5f78dd43da37d5401417e2f2"
    }
]
]

--------------------------PARÉNTIS---------------------------

Introducimos por url 'dni' de usuario, y mostrará cada pedido hecho por ese usuario. Se mostrarán todos los datos de pedido almacenado en la base de datos.

**ENDPOINT MODIFICACIÓN DATOS FACTURA**

##### POST -- localhost:3000/pedidos/modificar/:pedido

Introducimos por url '_id' del pedido, y pasamos por body los datos que queramos modificar.

Nos mostrará el pedido ya modificado.

En el archivo 'routes->productos.js' se especifica que solo se pueda acceder a este endpoint añadiendo en el header html 'token-acceso' un token válido de vendedor.

## OBSERVACIONES FINALES

Indicar, para finalizar, mi agrado con la realización de este proyecto final, en el que nos encargamos de crear desde cero una API REST para un e-commerce. Era una tarea que, al principio, me parecia imposible de realizar pero que gracias a los conocimientos adquiridos durante la formación y a la investigación por mi cuenta he conseguido sacar adelante con el resultado aquí expuesto.

Sin más, quedo abierto a cualquier corrección, mejora o sugerencia.

¡Muchas gracias!