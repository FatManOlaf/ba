import { drizzle } from "drizzle-orm/better-sqlite3"
import Database from "better-sqlite3"
import { sql } from "drizzle-orm"
import { users, projects, questions, skills } from "~/schema"

const sqlite = new Database("sqlite.db")
export const db = drizzle(sqlite)

// +++ prepared statements +++
// users
export const register = db
.insert(users)
.values({
  id: sql.placeholder('id'),
  email: sql.placeholder('email'),
  password: sql.placeholder('password'),
  data: sql.placeholder('data'),
})

export const getLoginData = db
.select({
  id: users.id,
  password: users.password,
  data: users.data,
})
.from(users)
.where(sql`${users.email} = ${sql.placeholder("email")}`)

export const getUserDataById = db
.select({
  data: users.data,
})
.from(users)
.where(sql`${users.id} = ${sql.placeholder("id")}`)

export const getUniqueKeys = db
.select({
  id: users.id,
  email: users.email,
})
.from(users)
.where(sql`${users.email} = ${sql.placeholder("email")} OR ${users.id} = ${sql.placeholder("id")}`)

export const updateUserData = db
.update(users)
.set({
  data: sql`${sql.placeholder("data")}`
})
.where(sql`${users.id} = ${sql.placeholder("id")}`)

export const getAllUserIds = db
.select({
  id: users.id,
})
.from(users)

export const getAllUserData = db
.select({
  id: users.id,
  data: users.data,
})
.from(users)


// questions
export const postQuestion = db
.insert(questions)
.values({
  id: sql.placeholder('id'),
  owner: sql.placeholder('owner'),
  title: sql.placeholder('title'),
  requiredSkills: sql.placeholder('requiredSkills'),
  description: sql.placeholder('description'),
  attemptedSolutions: sql.placeholder('attemptedSolutions'),
  isVisible: sql.placeholder('isVisible'),
  isSolved: sql.placeholder('isSolved'),
})

export const getAllQuestionIds = db
.select({
  id: questions.id
})
.from(questions)

export const getAllQuestionListData = db
.select({
  id: questions.id,
  owner: questions.owner,
  title: questions.title,
  requiredSkills: questions.requiredSkills,
  description: questions.description,
  attemptedSolutions: questions.attemptedSolutions,
  isVisible: questions.isVisible,
  isSolved: questions.isSolved,
})
.from(questions)

export const getQuestionData = db
.select({
  id: questions.id,
  owner: questions.owner,
  title: questions.title,
  requiredSkills: questions.requiredSkills,
  description: questions.description,
  attemptedSolutions: questions.attemptedSolutions,
  isVisible: questions.isVisible,
  isSolved: questions.isSolved,
})
.from(questions)
.where(sql`${questions.id} = ${sql.placeholder("id")}`)

// skills

export const getSkills = db
.select({
  name: skills.name
})
.from(skills)


export const setSkill = db
.insert(skills)
.values({
  name: sql.placeholder('name'),
})