
/**
 * @swagger
 * components:
 *  securitySchemes:
 *      BearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 *  schemas:
 *      UserSelect:
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
 *              firstName: Juanito
 *              lastName: Perez
 *              createdAt: 2021-07-23 06:57:08
 *              updatedAt: 2021-07-23 06:57:08
 *      UserCreate:
 *          type: object
 *          properties:
 *              user:
 *                  type: string
 *                  description: usuario
 *                  required: true
 *              email:
 *                  type: string
 *                  required: true
 *                  description: correo del usuario
 *              password:
 *                  type: string
 *                  required: true
 *                  description: contraseña del usuario
 *              firstName:
 *                  type: string
 *                  description: nombres del usuario
 *              lastName:
 *                  type: string
 *                  description: apellidos del usuario
 *          example:
 *              user: Bret
 *              email: Sincere@april.biz
 *              password: 51586fs61fs
 *              firstName: Juanito
 *              lastName: Perez
 *      NoFound:
 *          type: object
 *          properties:
 *              error:
 *                  type: string
 *                  description: error generado al consultar
 *          example:
 *              error: Error no found
 *      ErrorAutentication:
 *          type: object
 *          properties:
 *              error:
 *                  type: string
 *                  description: error de autenticación
 *          example:
 *              error: Unauthorized
 *      RequeryData:
 *          type: object
 *          properties:
 *              message:
 *                  type: string
 *                  description: Faltan datos requeridos
 *          example:
 *              message: Faltan datos requeridos
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
 *
 */

//Routes

/**
 * @swagger
 * /users:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      summary: Obtiene lista de usuarios
 *      tags: [users]
 *      parameters:
 *          - $ref: '#/components/parametersDefault/limit'
 *          - $ref: '#/components/parametersDefault/skip'
 *      responses:
 *          200:
 *              description: Lista de usuarios
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
 *                                      $ref: '#/components/schemas/UserSelect'
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
 * /users/signup:
 *  post:
 *      summary: Crea un usuario
 *      tags: [users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UserCreate'
 *      responses:
 *          200:
 *              description: Creado correctamente
 *              content:
 *                  aplication/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              currentUser:
 *                                  $ref: '#/components/schemas/UserSelect'
 *                              token:
 *                                  type: string
 *                                  example: 'das8d4824482343426$#%$#12543/24426542436'
 *          400:
 *              description: Error datos requeridos, o usuario ya existente
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
 * /users/signin:
 *  post:
 *      summary: Validacion de login
 *      tags: [users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      properties:
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *                      example:
 *                          email: juanito@dominio.com
 *                          password: password
 *      responses:
 *          200:
 *              description: Ingreso  correcto
 *              content:
 *                  aplication/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              currentUser:
 *                                  $ref: '#/components/schemas/UserSelect'
 *                              token:
 *                                  type: string
 *                                  example: 'das8d4824482343426$#%$#12543/24426542436'
 *          400:
 *              description: Error datos requeridos, o usuario ya existente
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
 * /users/{id}:
 *  patch:
 *      security:
 *          - bearerAuth: []
 *      summary: Actualiza usuario
 *      tags: [users]
 *      parameters:
 *          - $ref: '#/components/parameters/userId'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UserCreate'
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