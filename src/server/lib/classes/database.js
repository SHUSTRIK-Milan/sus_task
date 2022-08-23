export class Database {
    constructor (knexManager) {
        this.knexManager = knexManager
    }
    
    async create(call, callback) {
        await this.knexManager.createSchema()
        let graph = await this.knexManager.Server.query().insertGraph({
            name: call.request.name ?? "unnamed"
        });
        
        callback(null, {message: `The create operation ${graph.id}[id] was successful`});
    }
    async update(call, callback) {
        await this.knexManager.createSchema()
        try{
            await this.knexManager.Server.query().upsertGraph({
                id: call.request.id,
                name: call.request.name ?? "unnamed"
            });
            callback(null, {message: `The update operation on ${call.request.id}[id] was successful`});
        }catch(err){
            callback(null, {message: `The update operation on ${call.request.id}[id] failed`});
        }
    }
    async read(call, callback) {
        await this.knexManager.createSchema()
        try{
            let data = await this.knexManager.Server.query().findById(call.request.id);
            callback(null, {message: `The read operation on ${call.request.id}[id] was successful. Output:\n>>\t${data.name}`});
        }catch(err){
            callback(null, {message: `The read operation on ${call.request.id}[id] failed`});
        }
    }
    async delete(call, callback) {
        await this.knexManager.createSchema()
        try{
            await this.knexManager.Server.query().deleteById(call.request.id);
            callback(null, {message: `The delete operation on ${call.request.id}[id] was successful.`});
        }catch(err){
            callback(null, {message: `The delete operation on ${call.request.id}[id] failed`});
        }
    }
}