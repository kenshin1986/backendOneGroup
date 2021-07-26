
/**
 * @swagger
 * components:
 *  schemas:
 *      ProductSelect:
 *          type: object
 *          properties:
 *              _id:
 *                  type: string
 *                  description: Identificador del producto
 *              name:
 *                  type: string
 *                  description: nombre del producto
 *              description:
 *                  type: string
 *                  description: descripción del producto
 *              price:
 *                  type: number
 *                  description: precio del producto
 *              image:
 *                  type: string
 *                  description: url de la imagen
 *              score:
 *                  type: string
 *                  description: calificacion del producto
 *              createdAt:
 *                  type: date
 *                  description: fecha de creación
 *              updatedAt:
 *                  type: date
 *                  description: fecha de actualización
 *          example:
 *              id: fsadf541561adf841wfd5s1
 *              name: Vaso Grande
 *              description: Usado para hacer...
 *              price: 5500
 *              image: /vasogrande.png
 *              score: 10
 *              createdAt: 2021-07-23 06:57:08
 *              updatedAt: 2021-07-23 06:57:08
 *      ProductCreate:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  description: nombre del producto
 *                  required: true
 *              description:
 *                  type: string
 *                  description: descripción del producto
 *              price:
 *                  type: number
 *                  description: precio del producto
 *              image:
 *                  type: string
 *                  description: url de la imagen
 *              score:
 *                  type: number
 *                  description: calificacion del producto
 *          example:
 *              name: Vaso Grande
 *              description: Usado para hacer...
 *              price: 5500
 *              image: /vasogrande.png
 *              score: 10
 *  parameters:
 *      productId:
 *          in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: string
 *          description: id del producto
 *      productName:
 *          in: path
 *          name: name
 *          schema:
 *              type: string
 *          description: comodín para la busqueda del producto por name
 *
 */

//Routes

/**
 * @swagger
 * /products:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      summary: Obtiene lista de productos
 *      tags: [products]
 *      parameters:
 *          - $ref: '#/components/parametersDefault/limit'
 *          - $ref: '#/components/parametersDefault/skip'
 *          - $ref: '#/components/parameters/productName'
 *      responses:
 *          200:
 *              description: Lista de productos
 *              content:
 *                  aplication/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              total:
 *                                  type: number
 *                                  example: 1
 *                              limit:
 *                                  type: number
 *                                  example: 10
 *                              skip:
 *                                  type: number
 *                                  example: 0
 *                              data:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/ProductSelect'
 *          401:
 *              description: Error de autenticación
 *              content:
 *                  aplication/json:
 *                      schema:
 *                              $ref: '#/components/schemas/ErrorAutentication'
 *          500:
 *              description: Error al intentar consultar
 *              content:
 *                  aplication/json:
 *                      schema:
 *                              $ref: '#/components/schemas/NoFound'
 */

/**
 * @swagger
 * /products/{id}:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      summary: Consulta producto por id
 *      tags: [products]
 *      parameters:
 *          - $ref: '#/components/parameters/productId'
 *      responses:
 *          200:
 *              description: Ingreso  correcto
 *              content:
 *                  aplication/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UserSelect'
 *          400:
 *              description: Producto no encontrado
 *              content:
 *                  aplication/json:
 *                      schema:
 *                          $ref: '#/components/schemas/RequeryData'
 *          500:
 *              description: Error al intentar consultar
 *              content:
 *                  aplication/json:
 *                      schema:
 *                          $ref: '#/components/schemas/NoFound'
 */

/**
 * @swagger
 * /products:
 *  post:
 *      security:
 *          - bearerAuth: []
 *      summary: Crea un producto
 *      tags: [products]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ProductCreate'
 *      responses:
 *          200:
 *              description: Creado correctamente
 *              content:
 *                  aplication/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              total:
 *                                  type: number
 *                                  example: 1
 *                              limit:
 *                                  type: number
 *                                  example: 10
 *                              skip:
 *                                  type: number
 *                                  example: 0
 *                              data:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/ProductSelect'
 *          400:
 *              description: Error datos requeridos, o producto ya existente
 *              content:
 *                  aplication/json:
 *                      schema:
 *                          $ref: '#/components/schemas/RequeryData'
 *          401:
 *              description: Error de autenticación
 *              content:
 *                  aplication/json:
 *                      schema:
 *                              $ref: '#/components/schemas/ErrorAutentication'
 *          500:
 *              description: Error al intentar consultar
 *              content:
 *                  aplication/json:
 *                      schema:
 *                          $ref: '#/components/schemas/NoFound'
 */


/**
 * @swagger
 * /products/{id}:
 *  patch:
 *      security:
 *          - bearerAuth: []
 *      summary: Actualiza producto
 *      tags: [products]
 *      parameters:
 *          - $ref: '#/components/parameters/productId'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ProductCreate'
 *      responses:
 *          200:
 *              description: Actualizado correctamente
 *              content:
 *                  aplication/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  description: mensaje para mostar al usuario
 *                          example:
 *                              message: Producto actualizado correctamente
 *          400:
 *              description: Producto no encontrado
 *              content:
 *                  aplication/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  description: mensaje para mostrar al usuario
 *                          example:
 *                              message: Producto no encontrado
 *          401:
 *              description: Error de autenticación
 *              content:
 *                  aplication/json:
 *                      schema:
 *                              $ref: '#/components/schemas/ErrorAutentication'
 *          500:
 *              description: Error al intentar consultar
 *              content:
 *                  aplication/json:
 *                      schema:
 *                          $ref: '#/components/schemas/NoFound'
 */

/**
 * @swagger
 * /products/{id}:
 *  delete:
 *      security:
 *          - bearerAuth: []
 *      summary: Elimina producto
 *      tags: [products]
 *      parameters:
 *          - $ref: '#/components/parameters/productId'
 *      responses:
 *          200:
 *              description: Eliminado correctamente
 *              content:
 *                  aplication/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              total:
 *                                  type: number
 *                                  example: 1
 *                              limit:
 *                                  type: number
 *                                  example: 10
 *                              skip:
 *                                  type: number
 *                                  example: 0
 *                              data:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/ProductSelect'
 *          400:
 *              description: Producto no encontrado
 *              content:
 *                  aplication/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  description: mensaje para mostrar al usuario
 *                          example:
 *                              message: Producto no encontrado
 *          401:
 *              description: Error de autenticación
 *              content:
 *                  aplication/json:
 *                      schema:
 *                              $ref: '#/components/schemas/ErrorAutentication'
 *          500:
 *              description: Error al intentar consultar
 *              content:
 *                  aplication/json:
 *                      schema:
 *                          $ref: '#/components/schemas/NoFound'
 */