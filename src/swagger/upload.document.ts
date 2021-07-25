
/**
 * @swagger
 * /upload:
 *  post:
 *      security:
 *          - bearerAuth: []
 *      summary: Se encarga de subir recursos
 *      tags: [upload]
 *      requestBody:
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      type: string
 *                      format: binary
 *      responses:
 *          200:
 *              description: Imagen subida
 *              content:
 *                  aplication/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              path:
 *                                  type: string
 *                                  example: 1627221627747-slider2.png
 *                              originalname:
 *                                  type: string
 *                                  example: slider2.png
 *                              size:
 *                                  type: number
 *                                  example: 3174564
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