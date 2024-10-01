import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { seedDatabase } from '../../../prisma/seed'; // Asegúrate de que la ruta es correcta

const prisma = new PrismaClient();

export const resetDatabase = async (req: Request, res: Response) => {
    try {
        // Borra todos los registros de las tablas relacionadas en el orden correcto para evitar restricciones de claves foráneas
        await prisma.resume.deleteMany();
        await prisma.workExperience.deleteMany();
        await prisma.education.deleteMany();
        await prisma.interview.deleteMany();
        await prisma.application.deleteMany();
        await prisma.employee.deleteMany();
        await prisma.interviewStep.deleteMany();
        await prisma.interviewType.deleteMany();
        await prisma.candidate.deleteMany();
        await prisma.position.deleteMany();
        await prisma.interviewFlow.deleteMany();
        await prisma.company.deleteMany();

        // Re-seed de la base de datos
        await seedDatabase();

        res.status(200).json({ message: 'Base de datos reseteada y resembrada exitosamente.' });
    } catch (error) {
        console.error('Error al resetear la base de datos:', error);
        res.status(500).json({ message: 'Error al resetear la base de datos.' });
    }
};