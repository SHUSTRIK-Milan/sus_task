export class Database {
    constructor (KnexManager) {
        this.KnexManager = KnexManager
    }

    async create(call, callback) {
        await KnexManager.KnexManager.createSchema()
        let graph = await KnexManager.Server.query().insertGraph({
            name: call.request.name ?? "unnamed"
        });
        
        callback(null, {message: `The create operation ${graph.id}[id] was successful`});
    }
    async update(call, callback) {
        await KnexManager.createSchema()
        try{
            await KnexManager.Server.query().upsertGraph({
                id: call.request.id,
                name: call.request.name ?? "unnamed"
            });
            callback(null, {message: `The update operation on ${call.request.id}[id] was successful`});
        }catch(err){
            callback(null, {message: `The update operation on ${call.request.id}[id] failed`});
        }
    }
    async read(call, callback) {
        await KnexManager.createSchema()
        try{
            let data = await KnexManager.Server.query().findById(call.request.id);
            callback(null, {message: `The read operation on ${call.request.id}[id] was successful. Output:\n>>\t${data.name}`});
        }catch(err){
            callback(null, {message: `The read operation on ${call.request.id}[id] failed`});
        }
    }
    async delete(call, callback) {
        await KnexManager.createSchema()
        try{
            await KnexManager.Server.query().deleteById(call.request.id);
            callback(null, {message: `The delete operation on ${call.request.id}[id] was successful.`});
        }catch(err){
            callback(null, {message: `The delete operation on ${call.request.id}[id] failed`});
        }
    }
}