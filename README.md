# GenCita

the app is coded in **Typescript** with backend in Node **Express** and frontend in **Vue**

# BACKEND

The back-end is coded in **Express** (using Object Oriented Programming) with a **Sequelize ORM**, based on an **SqlLite** database.

**Prerequisites**

The back-end requires node and npm

**Installation and launch**

1. Clone the whole repository

2. Go to the back-end folder

3. Install dependencies

```
$ npm install
```

4. Copy the content of the ```.env.template``` in a local ```.env``` file and replace the PORT with the back-end port and the ALLOWED_MAIN_ORIGIN with the front-end client url

```
PORT=
ALLOWED_MAIN_ORIGIN=
```

5. Launch the server
```
$ npm run dev
```


# FRONTEND

The front-end is coded in **Vue**.

**Prerequisites**

The front-end requires vue and npm

**Installation and launch**

1. Clone the whole repository

2. Go to the front-end folder

3. Install dependencies

```
$ npm install
```

4. Launch the server
```
$ npm run dev
```