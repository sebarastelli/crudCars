const RentsRepository = require("../rentsRepository.js");
const database = require('better-sqlite3');
const fs = require('fs');

let mockDataBase;

beforeEach(() => {
    mockDataBase = new database(':memory:');
    const migration = fs.readFileSync('./src/db/tables.sql', 'utf-8');
    mockDataBase.exec(migration);
});

