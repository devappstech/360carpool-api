const mysql = require('mysql')
const vars = require('./vars.js')

const conn = mysql.createConnection({
  host: vars.host,
  user: vars.user,
  password: vars.pwd
})

conn.connect((err) => {
  if (err) {
    throw err
  }

  console.log('Connected!')

  // create db
  conn.query(`CREATE DATABASE ${vars.dbName}`, (err, result) => {
    if (err) {
      throw err
    }

    console.log('Database created')
  })

  conn.query(`use ${vars.dbName}`)

  // create user table
  conn.query(`
    CREATE TABLE users (
      id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
      name varchar(255) NOT NULL,
      company varchar(255),
      is_driver tinyint(1),
      street_address varchar(255),
      postal_code varchar(255),
      province varchar(255),
      country varchar(255),
      leave_home time,
      arrive_home time,
      leave_work time,
      arrive_work time
    )
  `)

  // car data
  conn.query(`
    CREATE TABLE cars (
      id int NOT NULL PRIMARY KEY,
      driver_id int NOT NULL,
      manufacturer varchar(255),
      model varchar(255),
      gas_mileage int(11),
      available_seats int(11),
      FOREIGN KEY (driver_id) REFERENCES users(id)
    )
  `)

  // rides
  conn.query(`
    CREATE TABLE rides (
      id int NOT NULL PRIMARY KEY,
      driver_id int NOT NULL,
      manufacturer varchar(255),
      model varchar(255),
      gas_mileage int(11),
      available_seats int(11),
      FOREIGN KEY (driver_id) REFERENCES users(id)
    )
  `)
})
