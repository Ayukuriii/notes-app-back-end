/* eslint-disable camelcase */
const { nanoid } = require('nanoid')
const InvariantError = require('../../exception/InvariantError')
const NotFoundError = require('../../exception/NotFoundError')

class NotesService {
  constructor() {
    this._notes = []
  }

  addNote({ title, body, tags }) {
    const id = nanoid(16)
    const created_at = new Date().toISOString
    const updated_at = created_at

    const newNote = {
      title,
      tags,
      body,
      id,
      created_at,
      updated_at,
    }

    this._notes.push(newNote)

    const isSuccess = this._notes.filter((note) => note.id === id).length > 0

    if (!isSuccess) {
      throw new InvariantError('Catatan gagal ditambahkan')
    }

    return id
  }

  getNotes() {
    return this._notes
  }

  getNoteById(id) {
    const note = this._notes.filter((n) => n.id === id)[0]

    if (!note) {
      throw new NotFoundError('Catatan tidak ditemukan')
    }

    return note
  }

  editNoteById(id, { title, tags, body }) {
    const index = this._notes.findIndex((note) => note.id === id)

    if (index === -1) {
      throw new NotFoundError('Gagal memperbarui catatan. Id tidak ditemukan')
    }

    const updatedAt = new Date().toISOString

    this._notes[index] = {
      ...this._notes[index],
      title,
      tags,
      body,
      updatedAt,
    }
  }

  // eslint-disable-next-line consistent-return
  deleteNoteById(id) {
    const index = this._notes.findIndex((note) => note.id === id)
    if (index === -1) {
      throw new NotFoundError('Catatan gagal dihapus. Id tidak ditemukan.')
    }
    this._notes.splice(index, 1)
  }
}

module.exports = NotesService
