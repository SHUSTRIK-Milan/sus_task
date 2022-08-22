import {Model} from 'objection';
import Knex from 'knex';
import SERVERS from './register.js';
import SECRET from './secret';

const knex = Knex({
    client: 'pg',
    version: '7.2',
    connection: {
        host : '127.0.0.1',
        port : 5432,
        user : 'postgres',
        password : SECRET.password,
        database : 'sus_database'
    }
});

Model.knex(knex);

class Server extends Model {
    static get tableName() {
        return 'servers';
    }
}

async function createSchema() {
    if (await knex.schema.hasTable('servers')) {
        return;
    }

    await knex.schema.createTable('servers', table => {
        table.increments('id').primary();
        table.string('name');
        table.string('ip');
        table.float('user_rate');
    });
}

async function main() {
    for (let server of SERVERS){
        await Server.query().insertGraph({
            name: server.name ?? "unnamed",
            ip: server.ip ?? "unidentified",
            user_rate: server.user_rate ?? 0
        })
        console.log(`${server.name ?? "unnamed"} was register`)
    }
}

createSchema()
    .then(() => main())
    .then(() => knex.destroy())
    .catch(err => {
        console.error(err);
        return knex.destroy();
});