const UserService = require('../services/UserService');

module.exports = class UserController {

  constructor(){
    this.service = new UserService();
  }

  async findAll(){
    return this.service.findAll();                
  }

  async findOne(id){
    return await this.service.findOne(id);
  }

  async create(body){
    return await this.service.create(body);
  }

  async update(id, body){    
    return await this.service.update(id, body);  
  }

  async delete(id){       
    return await this.service.delete(id);           
  }
};