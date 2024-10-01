import { resetDatabase } from '../presentation/controllers/testController';

const router = require('express').Router();

// Solo permitir acceso en entorno de pruebas
if (process.env.NODE_ENV === 'test') {
    router.post('/reset', resetDatabase);
}

export default router;
