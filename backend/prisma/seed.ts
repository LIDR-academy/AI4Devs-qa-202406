import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedDatabase() { // Exportar la función principal
  // Create Companies with explicit IDs
  const company1 = await prisma.company.create({
    data: {
      id: 1, // ID explícito
      name: 'LTI',
    },
  });


  // Create Interview Flows with explicit IDs
  const interviewFlow1 = await prisma.interviewFlow.create({
    data: {
      id: 1, // ID explícito
      description: 'Standard development interview process',
    },
  });


  const interviewFlow2 = await prisma.interviewFlow.create({
    data: {
      id: 2, // ID explícito
      description: 'Data science interview process',
    },
  });

  // Create Positions with explicit IDs
  const position1 = await prisma.position.create({
    data: {
      id: 1, // ID explícito
      title: 'Senior Full-Stack Engineer',
      description: 'Develop and maintain software applications.',
      status: 'Open',
      isVisible: true,
      location: 'Remote',
      jobDescription: 'Full-stack development',
      companyId: company1.id,
      interviewFlowId: interviewFlow1.id,
      salaryMin: 50000,
      salaryMax: 80000,
      employmentType: 'Full-time',
      benefits: 'Health insurance, 401k, Paid time off',
      contactInfo: 'hr@lti.com',
      requirements: '3+ years of experience in software development, knowledge in React and Node.js',
      responsibilities: 'Develop, test, and maintain software solutions.',
      companyDescription: 'LTI is a leading HR solutions provider.',
      applicationDeadline: new Date('2024-12-31')
    },
  });

  const position2 = await prisma.position.create({
    data: {
      id: 2, // ID explícito
      title: 'Data Scientist',
      description: 'Analyze and interpret complex data.',
      status: 'Open',
      isVisible: true,
      location: 'Remote',
      jobDescription: 'Data analysis and machine learning',
      companyId: company1.id,
      interviewFlowId: interviewFlow2.id,
      salaryMin: 60000,
      salaryMax: 90000,
      employmentType: 'Full-time',
      benefits: 'Health insurance, 401k, Paid time off, Stock options',
      contactInfo: 'hr@lti.com',
      requirements: 'Master degree in Data Science or related field, proficiency in Python and R',
      responsibilities: 'Analyze data sets to derive business insights and develop predictive models.',
      companyDescription: 'LTI is a leading HR solutions provider.',
      applicationDeadline: new Date('2024-12-31')
    },
  });

  // Create Interview Types with explicit IDs
  const interviewType1 = await prisma.interviewType.create({
    data: {
      id: 1, // ID explícito
      name: 'HR Interview',
      description: 'Assess overall fit, tech stack, salary range and availability',
    },
  });


  const interviewType2 = await prisma.interviewType.create({
    data: {
      id: 2, // ID explícito
      name: 'Technical Interview',
      description: 'Assess technical skills',
    },
  });

  const interviewType3 = await prisma.interviewType.create({
    data: {
      id: 3, // ID explícito
      name: 'Hiring manager interview',
      description: 'Assess cultural fit and professional goals',
    },
  });

  // Create Interview Steps with explicit IDs
  const interviewStep1 = await prisma.interviewStep.create({
    data: {
      id: 1, // ID explícito
      interviewFlowId: interviewFlow1.id,
      interviewTypeId: interviewType1.id,
      name: 'Initial Screening',
      orderIndex: 1,
    },
  });

  const interviewStep2 = await prisma.interviewStep.create({
    data: {
      id: 2, // ID explícito
      interviewFlowId: interviewFlow1.id,
      interviewTypeId: interviewType2.id,
      name: 'Technical Interview',
      orderIndex: 2,
    },
  });

  const interviewStep3 = await prisma.interviewStep.create({
    data: {
      id: 3, // ID explícito
      interviewFlowId: interviewFlow1.id,
      interviewTypeId: interviewType3.id,
      name: 'Manager Interview',
      orderIndex: 3,
    },
  });

  // Create Employees with explicit IDs
  const employee1 = await prisma.employee.create({
    data: {
      id: 1, // ID explícito
      companyId: company1.id,
      name: 'Alice Johnson',
      email: 'alice.johnson@lti.com',
      role: 'Interviewer',
    },
  });

  const employee2 = await prisma.employee.create({
    data: {
      id: 2, // ID explícito
      companyId: company1.id,
      name: 'Bob Miller',
      email: 'bob.miller@lti.com',
      role: 'Hiring Manager',
    },
  });

  // Create Candidates with explicit IDs
  const candidate1 = await prisma.candidate.create({
    data: {
      id: 1, // ID explícito
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@gmail.com',
      phone: '1234567890',
      address: '123 Main St',
      educations: {
        create: [
          {
            id: 1, // ID explícito
            institution: 'University A',
            title: 'BSc Computer Science',
            startDate: new Date('2015-09-01'),
            endDate: new Date('2019-06-01'),
          },
        ],
      },
      workExperiences: {
        create: [
          {
            id: 1, // ID explícito
            company: 'Eventbrite',
            position: 'Software Developer',
            description: 'Developed web applications',
            startDate: new Date('2019-07-01'),
            endDate: new Date('2021-08-01'),
          },
        ],
      },
      resumes: {
        create: [
          {
            id: 1, // ID explícito
            filePath: '/resumes/john_doe.pdf',
            fileType: 'application/pdf',
            uploadDate: new Date(),
          },
        ],
      },
    },
  });

  const candidate2 = await prisma.candidate.create({
    data: {
      id: 2, // ID explícito
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@gmail.com',
      phone: '0987654321',
      address: '456 Elm St',
      educations: {
        create: [
          {
            id: 2, // ID explícito
            institution: 'Maryland',
            title: 'MSc Data Science',
            startDate: new Date('2016-09-01'),
            endDate: new Date('2020-06-01'),
          },
        ],
      },
      workExperiences: {
        create: [
          {
            id: 2, // ID explícito
            company: 'Gitlab',
            position: 'Data Scientist',
            description: 'Analyzed data sets',
            startDate: new Date('2020-07-01'),
            endDate: new Date('2022-08-01'),
          },
        ],
      },
      resumes: {
        create: [
          {
            id: 2, // ID explícito
            filePath: '/resumes/jane_smith.pdf',
            fileType: 'application/pdf',
            uploadDate: new Date(),
          },
        ],
      },
    },
  });

  const candidate3 = await prisma.candidate.create({
    data: {
      id: 3, // ID explícito
      firstName: 'Carlos',
      lastName: 'García',
      email: 'carlos.garcia@example.com',
      phone: '1122334455',
      address: '789 Pine St',
      educations: {
        create: [
          {
            id: 3, // ID explícito
            institution: 'Instituto Tecnológico',
            title: 'Ingeniería en Sistemas Computacionales',
            startDate: new Date('2017-01-01'),
            endDate: new Date('2021-12-01'),
          },
        ],
      },
      workExperiences: {
        create: [
          {
            id: 3, // ID explícito
            company: 'Innovaciones Tech',
            position: 'Ingeniero de Software',
            description: 'Desarrollo y mantenimiento de aplicaciones de software',
            startDate: new Date('2022-01-01'),
            endDate: new Date('2023-01-01'),
          },
        ],
      },
      resumes: {
        create: [
          {
            id: 3, // ID explícito
            filePath: '/resumes/carlos_garcia.pdf',
            fileType: 'application/pdf',
            uploadDate: new Date(),
          },
        ],
      },
    },
  });

  // Create Applications with explicit IDs
  const application1 = await prisma.application.create({
    data: {
      id: 1, // ID explícito
      positionId: position1.id,
      candidateId: candidate1.id,
      applicationDate: new Date(),
      currentInterviewStep: interviewStep2.id,
    },
  });


  const application2 = await prisma.application.create({
    data: {
      id: 2, // ID explícito
      positionId: position2.id,
      candidateId: candidate1.id,
      applicationDate: new Date(),
      currentInterviewStep: interviewStep2.id,
    },
  });

  const application3 = await prisma.application.create({
    data: {
      id: 3, // ID explícito
      positionId: position1.id,
      candidateId: candidate2.id,
      applicationDate: new Date(),
      currentInterviewStep: interviewStep2.id,
    },
  });

  const application4 = await prisma.application.create({
    data: {
      id: 4, // ID explícito
      positionId: position1.id,
      candidateId: candidate3.id,
      applicationDate: new Date(),
      currentInterviewStep: interviewStep1.id,
    },
  });

  // Create Interviews with explicit IDs
  await prisma.interview.createMany({
    data: [
      {
        id: 1, // ID explícito
        applicationId: application1.id,
        interviewStepId: interviewStep1.id,
        employeeId: employee1.id,
        interviewDate: new Date(),
        result: 'Passed',
        score: 5,
        notes: 'Good technical skills',
      },
      {
        id: 2, // ID explícito
        applicationId: application2.id,
        interviewStepId: interviewStep1.id,
        employeeId: employee1.id,
        interviewDate: new Date(),
        result: 'Passed',
        score: 5,
        notes: 'Excellent data analysis skills',
      },
      {
        id: 3, // ID explícito
        applicationId: application3.id,
        interviewStepId: interviewStep1.id,
        employeeId: employee1.id,
        interviewDate: new Date(),
        result: 'Passed',
        score: 4,
        notes: 'Good technical skills',
      }
    ],
  });
}


// Ejecutar la función principal si seed.ts se ejecuta directamente
if (require.main === module) {
  seedDatabase()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}