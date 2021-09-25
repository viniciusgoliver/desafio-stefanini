const UserRepository = require('../repositories/UserRepository');

module.exports = class UserService {

  constructor(){
    this.repository = new UserRepository();
  }

  async findAll(){
    return this.repository.findAll();                
}

  async findOne(id){
    const userExists = await this.repository.findOne(id);

    if(!userExists){
      return 'Usuário inexistente na base de dados.';
    }   

    return await this.repository.findOne(id);
  }

  async create(body){
    const userExists = await this.repository.findWhere({ firstName: body.firstName });

    if(userExists.length > 0){
      return 'Este usuário já existe na base de dados.';
    }

    return await this.repository.create(body);
  }

  async update(id, body){
    const userExists = await this.repository.findOne(id);

    if(!userExists){
      return 'Usuário inexistente na base de dados.';
    } 
    
    await this.repository.update(id, body);  

    return await this.repository.findOne(id);
  }

  async delete(id){
    const userExists = await this.repository.findOne(id);

    if(!userExists){
      return 'Usuário inexistente na base de dados.';
    }   
    
    return await this.repository.delete(id);           
  }

};