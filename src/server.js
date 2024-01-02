require('dotenv').config()

const Hapi = require('@hapi/hapi')
const ClientError = require('./exception/ClientError')

const notes = require('./api/notes')
const NotesService = require('./services/postgres/NoteService')
const NotesValidator = require('./validator/notes')

const users = require('./api/users')
const UsersService = require('./services/postgres/UserService')
const UsersValidator = require('./validator/users')
const UserService = require('./services/postgres/UserService')

const init = async () => {
  const notesService = new NotesService()
  const usersService = new UserService()

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  })

  await server.register([
    {
      plugin: notes,
      options: {
        service: notesService,
        validator: NotesValidator,
      },
    },
    {
      plugin: users,
      options: {
        service: usersService,
        validator: UsersValidator,
      },
    },
  ])

  server.ext('onPreResponse', (request, h) => {
    const { response } = request // mendapatkan konteks response dari request

    // handle client error manual
    if (response instanceof ClientError) {
      const newResponse = h.response({
        status: 'fail',
        message: response.message,
      })
      newResponse.code(response.statusCode)
      return newResponse
    }
    return h.continue
  })

  await server.start()
  console.log(`Server berjalan pada ${server.info.uri}`)
}

init()
