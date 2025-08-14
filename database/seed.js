import { faker } from '@faker-js/faker'
import pocketbase from 'pocketbase'

const numEntries = 10

const logErrorAndExit = (tableName, error) => {
  console.error(
    `An error occurred in table '${tableName}' with code ${error.code}: ${error.message}`,
  )
  process.exit(1)
}

const logStep = (stepMessage) => {
  console.log(stepMessage)
}

const pb = new pocketbase(process.env.VITE_POCKETBASE_URL)
await pb.collection('users').authWithPassword('test@email.com', 'password1234')

const seedProjects = async (numEntries) => {
  logStep('Seeding projects...')
  const batch = pb.createBatch()

  for (let i = 0; i < numEntries; i++) {
    const name = faker.lorem.words(3)
    const slug = faker.helpers.slugify(name)
    const collab = faker.helpers
      .arrayElements([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], { min: 1, max: 3 })
      .join(', ')
    const project = {
      name: name,
      slug: slug,
      status: faker.helpers.arrayElement(['in-progress', 'completed']),
      collaborators: '[' + collab + ']',
    }
    batch.collection('projects').create(project)
  }
  try {
    const resp = await batch.send()
    logStep('Projects seeded successfully!')
    return resp
  } catch (error) {
    logErrorAndExit('projects', error)
  }
}

const seedTasks = async (numEntries, projectIds) => {
  logStep('Seeding tasks...')
  const batch = pb.createBatch()

  for (let i = 0; i < numEntries; i++) {
    batch.collection('tasks').create({
      name: faker.lorem.words(3),
      status: faker.helpers.arrayElement(['in-progress', 'completed']),
      description: faker.lorem.paragraph(),
      due_date: faker.date.future(),
      project_id: faker.helpers.arrayElement(projectIds),
      collaborators:
        '[' +
        faker.helpers
          .arrayElements([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], { min: 1, max: 3 })
          .join(', ') +
        ']',
    })
  }

  try {
    const resp = await batch.send()
    logStep('Tasks seeded successfully!')
    return resp
  } catch (error) {
    logErrorAndExit('tasks', error)
  }
}

const seedDatabase = async (numEntries) => {
  const resp = await seedProjects(numEntries)
  const projectIds = resp.map((project) => project.body.id)
  await seedTasks(numEntries, projectIds)
}

await seedDatabase(numEntries)
