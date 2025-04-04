## Task Management Application (create a to-do application)##

**Description:**
Create a task management application where users can create, read, update, and delete tasks.
Users should be able to categorize tasks, set deadlines, and mark tasks as complete or incomplete.

**Features:**

User registration and login
CRUD operations for tasks
Task categorization and deadlines
User-specific task management

## LOCAL SETUP ##
1. To run this project create a .env file and set the following variables
```
MONGO_URI=
JWT_SECRET=
COOKIES_SECRET=
GMAIL_USER=
GMAIL_PASS= 'create a google app password'

```

2. Run the command below in the terminal to install the dependenies 
```
npm install

```

3. Run the command below in the terminal to start the server
```
npm run dev

```

## End Point ##
1. Register
```
POST /api/v1/auth/register
```
```json
{
    "fullname": " ",
    "email": " ",
    "password": " "
   
}
```

2. Login
```
POST /api/v1/auth/login
```
```json
{
    "email": " ",
    "password": " "
   
}
```

3. Logout
```
POST /api/v1/auth/login

```
4. Create Task
```
POST /api/v1/tasks
```
```json
{
    "Name": " ",
    "Description": " ",
    "Status": " ",
	"Category": " ",
	"Deadline": " "
   
}
```

5. Get A Task
```
GET /api/v1/tasks/:id

```
6. Update A Task
```
PATCH /api/v1/tasks/:id

```
7. Delete A Task
```
DELETE /api/v1/tasks/:id

```
8. Get All Tasks
```
GET /api/v1/tasks

```
9. Queries
```
GET /api/v1/tasks?

options:
status - completed or incomplete,
name,
category,
sort - Deadline, Category, createdAt
order - asc, dsc
page,
limit,

```