import Database from "better-sqlite3";

const db = Database("./db/data.db", { verbose: console.log });

const applicants = [
  {
    name: "Ana",
    email: "ana@emai.com",
  },
  {
    name: "Mira",
    email: "mira@email.com",
  },
  {
    name: "Beni",
    email: "beni@email.com",
  },
  {
    name: "Teuta",
    email: "teuta@email.com",
  },
  {
    name: "Agim",
    email: "agim@email.com",
  },
  {
    name: "Lori",
    email: "lori@email.com",
  },
  {
    name: "Nora",
    email: "nora@email.com",
  },
];

const interviewers = [
  {
    name: "John",
    email: "john@email.com",
  },
  {
    name: "Leo",
    email: "leo@email.com",
  },
  {
    name: "Sam",
    email: "sam@email.com",
  },
  {
    name: "Ina",
    email: "ina@email.com",
  },
  {
    name: "Henry",
    email: "henry@email.com",
  },
  {
    name: "Emmy",
    email: "emmy@email.com",
  },
];

const interviews = [
  {
    date: "5/09/2022",
    score: 3,
    position: "Backend Developer",
    successful: 0,
    applicantId: 1,
    interviewerId: 1,
  },
  {
    date: "6/09/2022",
    score: 9,
    position: "Frontend Developer",
    successful: 1,
    applicantId: 1,
    interviewerId: 3,
  },
  {
    date: "12/06/2022",
    score: 5,
    position: "Full Stack Developer",
    successful: 0,
    applicantId: 3,
    interviewerId: 6,
  },
  {
    date: "15/06/2022",
    score: 7,
    position: "Frontend Developer",
    successful: 1,
    applicantId: 3,
    interviewerId: 5,
  },
  {
    date: "21/05/2022",
    score: 10,
    position: "Backend Developer",
    successful: 1,
    applicantId: 7,
    interviewerId: 2,
  },
  {
    date: "17/01/2022",
    score: 8,
    position: "Frontend Developer",
    successful: 1,
    applicantId: 2,
    interviewerId: 4,
  },
  {
    date: "24/05/2022",
    score: 4,
    position: "Backend Developer",
    successful: 0,
    applicantId: 4,
    interviewerId: 1,
  },
  {
    date: "6/10/2021",
    score: 10,
    position: "Frontend Developer",
    successful: 1,
    applicantId: 6,
    interviewerId: 3,
  },
  {
    date: "12/08/2022",
    score: 6,
    position: "Frontend Developer",
    successful: 0,
    applicantId: 3,
    interviewerId: 4,
  },
  {
    date: "15/07/2022",
    score: 4,
    position: "Backend Developer",
    successful: 0,
    applicantId: 4,
    interviewerId: 6,
  },
];

const employees = [
  {
    name: "Oni Gjini",
    email: "oni@gmail.com",
    position: "Manager",
    companyId: 1,
  },
  {
    name: "Isabela Billa",
    email: "isabela@gmail.com",
    position: "Full Stack Developer",
    companyId: 1,
  },
  {
    name: "Anila Lika",
    email: "anila@gmail.com",
    position: "Manager",
    companyId: 2,
  },
  {
    name: "Mishel Avdija",
    email: "mishel@gmail.com",
    position: "Full Stack Developer",
    companyId: 2,
  },
];

const companies = [
  {
    id: 1,
    name: "Apple",
    city: "Cupertino",
  },
  {
    id: 2,
    name: "Samsung Electronics",
    city: "Seoul",
  },
];

// Applicants

const dropApplicantsTable = db.prepare(`
DROP TABLE IF EXISTS applicants;
`);
dropApplicantsTable.run();

const createApplicantsTable = db.prepare(`
CREATE TABLE IF NOT EXISTS applicants (
    id INTEGER,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    PRIMARY KEY(id)
);`);
createApplicantsTable.run();

const createApplicant = db.prepare(`
INSERT INTO applicants (name, email) VALUES (@name, @email);
`);

for (let applicant of applicants) createApplicant.run(applicant);

// interviewers

const dropInterviewersTable = db.prepare(`
DROP TABLE IF EXISTS interviewers;
`);
dropInterviewersTable.run();

const createInterviewersTable = db.prepare(`
CREATE TABLE IF NOT EXISTS interviewers (
    id INTEGER,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    PRIMARY KEY(id)
);`);
createInterviewersTable.run();

const createInterviewer = db.prepare(`
INSERT INTO interviewers (name, email) VALUES (@name, @email)
`);

for (let interviewer of interviewers) createInterviewer.run(interviewer);

// interviews that will link these two together

const dropInterviewsTable = db.prepare(`
DROP TABLE IF EXISTS interviews;
`)
dropInterviewsTable.run()


const createInterviewsTable = db.prepare(`
CREATE TABLE IF NOT EXISTS interviews (
    id INTEGER,
    date TEXT NOT NULL,
    score INTEGER NOT NULL,
    position TEXT,
    successful INTEGER,
    applicantId INTEGER NOT NULL,
    interviewerId INTEGER NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (applicantId) REFERENCES applicants(id) ON DELETE CASCADE,
    FOREIGN KEY (interviewerId) REFERENCES interviewers(id) ON DELETE CASCADE
);`)
createInterviewsTable.run()

const createInterview = db.prepare(`
INSERT INTO interviews (date, score, position, successful, applicantId, interviewerId) 
VALUES (@date, @score, @position, @successful, @applicantId, @interviewerId)
`)

for (let interview of interviews) createInterview.run(interview)

// employee
const dropEmployeesTable = db.prepare(`
DROP TABLE IF EXISTS employees;
`);
dropEmployeesTable.run();

const createEmployeesTable = db.prepare(`
CREATE TABLE IF NOT EXISTS employees (
    id INTEGER NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    position TEXT NOT NULL,
    companyId INTEGER NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (companyId) REFERENCES companies(id) ON DELETE CASCADE
    );
`);
createEmployeesTable.run();

const createNewEmployee = db.prepare(`
INSERT INTO employees (name, email, position, companyId) VALUES (@name, @email, @position, @companyId);
`);

for (let employee of employees) {
  createNewEmployee.run(employee);
}

// companies

const dropCompaniesTable = db.prepare(`
DROP TABLE IF EXISTS companies;
`);
dropCompaniesTable.run();

const createCompaniesTable = db.prepare(`
CREATE TABLE IF NOT EXISTS companies (
    id INTEGER NOT NULL,
    name TEXT NOT NULL,
    city TEXT NOT NULL,
    PRIMARY KEY (id)
);`);
createCompaniesTable.run();

const createNewCompany = db.prepare(`
INSERT INTO companies (name, city) VALUES (@name, @city);
`);

for (let company of companies) {
  createNewCompany.run(company);
}
