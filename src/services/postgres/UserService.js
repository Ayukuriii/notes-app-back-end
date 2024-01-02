const { Pool } = require('pg')
const bcrypt = require('bcrypt')
const { nanoid } = require('nanoid')
const InvariantError = require('../../exception/InvariantError')
const NotFoundError = require('../../exception/NotFoundError')

class UserService {
  constructor() {
    this._pool = new Pool()
  }

  async addUser({ username, password, fullname }) {
    await this.verifyNewUsername(username)

    const id = `user-${nanoid(16)}`
    const hashedPassword = await bcrypt.hash(password, 10)

    const query = {
      text: 'INSERT INTO user VALUES($1, $2, $3, $4) RETURNING id',
      values: [id, username, hashedPassword, fullname],
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new InvariantError('User gagal ditambahkan')
    }

    return result.rows[0].id
  }

  async verifyNewUsername(username) {
    const query = {
      text: 'SELECT username FROM users WHERE username = $1',
      values: [username],
    }

    const result = await this._pool.query(query)

    if (result.rowCount) {
      throw new InvariantError(
        'Gagal menambahkan user. Username telah terdaftar'
      )
    }
  }

  async getUsers(userId) {
    const query = {
      text: 'SELECT id, username, fullname FROM users WHERE id = $1',
      values: [userId],
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new NotFoundError('User tidak ditemukan')
    }

    return result.rows[0]
  }

  //   async getUserById() {}

  //   async editUserById() {}

  //   async delteUserById() {}
}

module.exports = UserService
