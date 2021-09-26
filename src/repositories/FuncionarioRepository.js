/*  Include de Model pra podermos utilizar os métodos de persistência de dados */
const Funcionario = require('../models/Funcionario');

/** Criando e exportando já a Class de Repository - Responsável pela persistência de dados com o BD */
module.exports = class FuncionarioRepository {
    
    constructor(){
        this.model = Funcionario;
    }

    /** Responsável por buscar registros baseado no parâmetro passado */
    async findWhere(param){
        return await this.model.find(param);                
    }
      
    /** Responsável por buscar todos os registros */
    async findAll(){
        return await this.model.find();                
    }
    
    /** Responsável por um registro específico baseado no ID */
    async findOne(id){
        return await this.model.findById(id);        
    }    

    /** Responsável por criar um novo registro */
    async create(body){
        return await this.model.create(body);        
    }

    /** Responsável por atualizar um determonado registro baseado no parametro ID */
    async update(id, body){
        return await this.model.findByIdAndUpdate(id, body);        
    }

    /** Responsável por deletar registro específico baseado no ID */
    async delete(id){
        return await this.model.findByIdAndRemove(id);        
    }
};
