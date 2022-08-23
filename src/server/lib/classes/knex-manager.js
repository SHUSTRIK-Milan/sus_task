import {Model} from 'objection';
import Knex from 'knex';

export class KnexManager {
    constructor (config) {
		this.knex = Knex(config)

        Model.knex(this.knex);

        class Server extends Model {
            static get tableName() {
                return 'servers';
            }
        }
        this.Server = Server
	}

    async createSchema() {
        if(await this.knex.schema.hasTable('servers')) {
            return;
        }
    
        await this.knex.schema.createTable('servers', table => {
            table.increments('id').primary();
            table.string('name');
        });
    }
}