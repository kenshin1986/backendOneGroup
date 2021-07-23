
/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          properties:
 *              _id:
 *                  type: string
 *                  description: Identificador del usuario
 *              user:
 *                  type: string
 *                  description: usuario
 *              email:
 *                  type: string
 *                  description: correo del usuario
 *              password:
 *                  type: string
 *                  description: contraseña del usuario
 *              firstName:
 *                  type: string
 *                  description: nombres del usuario
 *              lastName:
 *                  type: string
 *                  description: apellidos del usuario
 *              createdAt:
 *                  type: date
 *                  description: fecha de creación
 *              updatedAt:
 *                  type: date
 *                  description: fecha de actualización
 *          example:
 *              id: fsadf541561adf841wfd5s1
 *              user: Bret
 *              email: Sincere@april.biz
 *              password: 51586fs61fs
 *              firstName: Juanito
 *              lastName: Perez
 *              createdAt: 2021-07-23 06:57:08
 *              updatedAt: 2021-07-23 06:57:08
 *      NoFound:
 *          type: object
 *          properties:
 *              error:
 *                  type: string
 *                  description: error generado al consultar
 *          example:
 *              error: Error no found
 *  parameters:
 *      userId:
 *          in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: string
 *              description: id del usuario
 *  parametersDefault:
 *      limit:
 *          in: query
 *          name: $limit
 *          schema:
 *              type: string
 *          description: cantiadad de resultados
 *      skip:
 *          in: query
 *          name: $skip
 *          schema:
 *              type: string
 *          description: desde que paginación arranca
 *      sort:
 *          in: query
 *          name: $sort
 *          schema:
 *              type: string
 *          description: ordenamiento de la busqueda
 */

//Routes

/**
 * @swagger
 * /users:
 *  get:
 *      summary: Obtiene lista de usuarios
 *      tags: [users]
 *      parameters:
 *          - $ref: '#/components/parametersDefault/limit'
 *          - $ref: '#/components/parametersDefault/skip'
 *          - $ref: '#/components/parametersDefault/sort'
 *      responses:
 *          200:
 *              description: Lista de usuarios
 *              content:
 *                  aplication/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/User'
 *          500:
 *              description: Error al intentar consultar
 *              content:
 *                  aplication/json:
 *                      schema:
 *                              $ref: '#/components/schemas/NoFound'
 */

/**
 * @swagger
 * /users/{id}:
 *  patch:
 *      summary: Actualiza usuario
 *      tags: [users]
 *      parameters:
 *          - $ref: '#/components/parameters/userId'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
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
 *                              message: Usuario actualizado correctamente
 *          400:
 *              description: Usuario no encontrado
 *              content:
 *                  aplication/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  description: mensaje para mostrar al usuario
 *                          example:
 *                              message: Usuario no encontrado
 *          500:
 *              description: Error al intentar consultar
 *              content:
 *                  aplication/json:
 *                      schema:
 *                          $ref: '#/components/schemas/NoFound'
 */

/**
 * @swagger
 * /users:
 *  post:
 *      summary: Actualiza usuario
 *      tags: [users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: Creado correctamente
 *              content:
 *                  aplication/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          500:
 *              description: Error al intentar consultar
 *              content:
 *                  aplication/json:
 *                      schema:
 *                          $ref: '#/components/schemas/NoFound'
 */

/**
 * @swagger
 * /users/{id}:
 *  delete:
 *      summary: Elimina usuario
 *      tags: [users]
 *      parameters:
 *          - $ref: '#/components/parameters/userId'
 *      responses:
 *          200:
 *              description: Eliminado correctamente
 *              content:
 *                  aplication/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  description: mensaje para mostar al usuario
 *                          example:
 *                              message: Usuario eliminado correctamente
 *          400:
 *              description: Usuario no encontrado
 *              content:
 *                  aplication/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  description: mensaje para mostrar al usuario
 *                          example:
 *                              message: Usuario no encontrado
 *          500:
 *              description: Error al intentar consultar
 *              content:
 *                  aplication/json:
 *                      schema:
 *                          $ref: '#/components/schemas/NoFound'
 */