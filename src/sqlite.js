'use strict'
import { DatabaseSync } from 'node:sqlite'
import { existsSync, mkdirSync } from 'fs'
import { resolve } from 'path'

const dbPath = resolve('storage/database.db')

const storageDir = dbPath.substring(0, dbPath.lastIndexOf('/'))
if (!existsSync(storageDir)) {
  mkdirSync(storageDir, { recursive: true })
}

const database = new DatabaseSync(dbPath)

database.exec(`
  CREATE TABLE IF NOT EXISTS Person(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    year INTEGER,
    age INTEGER,
    email TEXT,
    phone TEXT,
    address TEXT,
    gender TEXT,
    occupation TEXT,
    nationality TEXT
  ) STRICT
`)

const insertPerson = ({ name, year, age, email, phone, address, gender, occupation, nationality }) => {
  const insert = database.prepare(`
    INSERT INTO Person (name, year, age, email, phone, address, gender, occupation, nationality)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)
  insert.run(name, year, age, email, phone, address, gender, occupation, nationality)
  console.log(`Person inserted: ${name}`)
}

const updatePerson = (id, { name, year, age, email, phone, address, gender, occupation, nationality }) => {
  const update = database.prepare(`
    UPDATE Person SET 
      name = ?, year = ?, age = ?, email = ?, phone = ?, address = ?, gender = ?, occupation = ?, nationality = ?
    WHERE id = ?
  `)
  update.run(name, year, age, email, phone, address, gender, occupation, nationality, id)
  console.log(`Person updated: ID ${id}`)
}

const queryPersons = () => {
  const query = database.prepare('SELECT * FROM Person ORDER BY id')
  const results = query.all()
  console.log('Persons query:', results)
  return results
}

const deletePerson = (id) => {
  const deleteStmt = database.prepare('DELETE FROM Person WHERE id = ?')
  deleteStmt.run(id)
  console.log(`Person deleted: ID ${id}`)
}

const main = () => {
  insertPerson({
    name: 'Alice', year: 1990, age: 33, email: 'alice@example.com',
    phone: '123-456-7890', address: '123 Street A', gender: 'Female',
    occupation: 'Engineer', nationality: 'Brazilian'
  })

  insertPerson({
    name: 'Bob', year: 1985, age: 38, email: 'bob@example.com',
    phone: '234-567-8901', address: '456 Street B', gender: 'Male',
    occupation: 'Teacher', nationality: 'Canadian'
  })

  insertPerson({
    name: 'Carlos', year: 1992, age: 31, email: 'carlos@example.com',
    phone: '345-678-9012', address: '789 Street C', gender: 'Male',
    occupation: 'Doctor', nationality: 'Mexican'
  })
  
  queryPersons()

  updatePerson(1, {
    name: 'Alice Silva', year: 1990, age: 34, email: 'alice.silva@example.com',
    phone: '123-456-7890', address: '123 Street A, Apt 1', gender: 'Female',
    occupation: 'Software Engineer', nationality: 'Brazilian'
  })

  queryPersons()

  deletePerson(2)
  
  queryPersons()

  database.close()
}

main()
