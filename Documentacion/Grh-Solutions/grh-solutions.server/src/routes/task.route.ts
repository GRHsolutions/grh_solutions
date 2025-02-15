import {Router} from 'express';
import {taskController} from '../controllers'
import jwt from 'jsonwebtoken';
import { TaskFilter } from '../filters/taskFilter';

const router = Router();

router.get('/getTasks', async(req, res) => {
    const tk = req.headers.authorization;
    
    if (!tk) {
        return res.status(400).json({ message: 'Token is required' });
    }

    // Decodificar el token para obtener el ID del usuario
    const decodedToken = jwt.decode(tk);

    // Verificar que el decodedToken sea un objeto y tenga la propiedad id
    if (typeof decodedToken !== 'object' || !decodedToken || !decodedToken.id) {
        return res.status(401).json({ message: 'Invalid token or missing user ID' });
    }
    // Creamos un objeto de filtro que solo incluye las propiedades definidas
    const filter: TaskFilter = { id: decodedToken.id };

    // Solo agregamos 'nombre' si está definido en los parámetros de consulta
    if (req.query.nombre) {
        filter.nombre = req.query.nombre as string; // Aseguramos que sea un string
    }
    try {
        const data = taskController.getAllTask(filter)
        return res.status(200).json(data);
    } catch(error){
        res.status(400).json({ message: "Error al traer datos de la db"});
    }
});

router.post('/createTask/', async(req, res) => {
    const tk = req.headers.authorization;

    if (!tk) {
        return res.status(400).json({ message: 'Token is required' });
    }
    try{
        // Decodificar el token para obtener el ID del usuario
        const decodedToken = jwt.decode(tk);

        // Verificar que el decodedToken sea un objeto y tenga la propiedad id
        if (typeof decodedToken !== 'object' || !decodedToken || !decodedToken.id) {
            return res.status(401).json({ message: 'Invalid token or missing user ID' });
        }
        const task = req.body;
                
        const createdTask = await taskController.create(decodedToken.id, task);
            
        res.status(201).json({ message: 'Task created successfully', task: createdTask });
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ message: 'Error creating task' });
    }
});

router.patch('/patchTask/:id', taskController.update);

router.put('/updateTask/:id', taskController.update);

router.delete('/deleteTask/:id', taskController.delete);

router.delete('/deleteAllChecked', taskController.deleteAllChecked);

router.get('/pageInfo', taskController.pageInfo)

// router.get('/g', async(req, res) => {
//     try{
//         const tasks = taskController.getTasks()
//         return res.status(200).json(tasks);    
//     } catch(error){
//         res.status(400).json({ message: "Error al traer datos de la db"});
//     }
// })

export default router;