import express from 'express';
import { loginController } from '../controllers/login.controller';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - primerNombre
 *         - primerApellido
 *         - correo
 *         - contraseña
 *       properties:
 *         primerNombre:
 *           type: string
 *           description: Primer nombre del usuario
 *         segundoNombre:
 *           type: string
 *           description: Segundo nombre del usuario
 *         primerApellido:
 *           type: string
 *           description: Primer apellido del usuario
 *         segundoApellido:
 *           type: string
 *           description: Segundo apellido del usuario
 *         correo:
 *           type: string
 *           description: Correo electrónico del usuario
 *         contraseña:
 *           type: string
 *           description: Contraseña del usuario
 *     LoginCredentials:
 *       type: object
 *       required:
 *         - correo
 *         - contraseña
 *       properties:
 *         correo:
 *           type: string
 *           description: Correo electrónico del usuario
 *         contraseña:
 *           type: string
 *           description: Contraseña del usuario
 */

/**
 * @swagger
 * /api/login/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginCredentials'
 *     responses:
 *       200:
 *         description: Login exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 token:
 *                   type: string
 *       400:
 *         description: Datos inválidos o usuario no encontrado
 */
router.post('/login', loginController.login);

/**
 * @swagger
 * /api/login/register:
 *   post:
 *     summary: Registrar nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Error en los datos proporcionados
 */
router.post('/register', loginController.register);

export default router;