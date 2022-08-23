export default {
    password: "2209",
    knex: {
        client: 'pg',
        version: '7.2',
        connection: {
            host: '127.0.0.1',
            port: 5432,
            user: 'postgres',
            password: SECRET.password,
            database: 'sus_database'
        }
    },
    address: 'localhost:50051'
}