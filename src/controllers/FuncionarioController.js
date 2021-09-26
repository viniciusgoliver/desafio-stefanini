/*
IMPLEMENTS BY: Vinícius G. Oliveira
DATE: 09/2021
*/

/* Instalcia da Class de Serviço  */
const FuncionarioService = require('../services/FuncionarioService');

module.exports = class FuncionarioController {

  constructor(){
    this.service = new FuncionarioService();
  }

  /* Método responsável por retornar a lista full de registros do banco de dados  */
  async findAll(){
    return this.service.findAll();                
  }

  /* Método responsável por retornar um registro baseado no parametro ID  */
  async findOne(id){
    return await this.service.findOne(id);
  }

  /* Método responsável por adicionar um novo registro no banco  */
  async create(body){
    return await this.service.create(body);
  }

  /* Método responsável por atualizar um registro no bd baseado no parametro ID  */
  async update(id, body){    
    return await this.service.update(id, body);  
  }

  /* Método responsável por deletar um registro baseado no parametro ID  */
  async delete(id){       
    return await this.service.delete(id);           
  }
};