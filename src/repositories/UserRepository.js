const User = require('../models/User');

module.exports = class UserRepository {
    
    constructor(){
        this.model = User;
    }

    async findWhere(param){
        return await this.model.find(param);                
    }
      
    async findAll(){
        return await this.model.find();                
    }
    
    async findOne(id){
        return await this.model.findById(id);        
    }    

    async create(body){
        return await this.model.create(body);        
    }

    async update(id, body){
        return await this.model.findByIdAndUpdate(id, body);        
    }

    async delete(id){
        return await this.model.findByIdAndRemove(id);        
    }
};
