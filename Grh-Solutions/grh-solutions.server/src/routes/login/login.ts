import express from 'express';
import { loginController } from '../../controllers/login/login.controller';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterForm:
 *       type: object
 *       required:
 *         - firstName
 *         - middleName
 *         - lastName
 *         - secondLastName
 *         - email
 *         - password
 *         - confirmPassword
 *       properties:
 *         firstName:
 *           type: string
 *           description: Primer nombre del usuario
 *         middleName:
 *           type: string
 *           description: Segundo nombre del usuario
 *         lastName:
 *           type: string
 *           description: Primer apellido del usuario
 *         secondLastName:
 *           type: string
 *           description: Segundo apellido del usuario
 *         email:
 *           type: string
 *           format: email
 *           description: Correo electrónico del usuario
 *         password:
 *           type: string
 *           format: password
 *           description: Contraseña del usuario
 *         confirmPassword:
 *           type: string
 *           format: password
 *           description: Confirmación de la contraseña del usuario
 * 
 *     LoginCredentials:
 *       type: object
 *       required:
 *         - correo
 *         - pass
 *       properties:
 *         correo:
 *           type: string
 *           format: email
 *           description: Correo electrónico del usuario
 *         pass:
 *           type: string
 *           format: password
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
 *             $ref: '#/components/schemas/RegisterForm'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegisterForm'
 *       400:
 *         description: Error en los datos proporcionados
 */
router.post('/register', loginController.register);

export default router;