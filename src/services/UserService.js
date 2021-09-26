/*  Include de Repository pra podermos utilizar os métodos de de manipulação 
* de informações persistidas no BD 
*/
const FuncionarioRepository = require('../repositories/FuncionarioRepository');

/** Criando e exportando já a Class de Service - Responsável pelas regras de negócio */
module.exports = class FuncionarioService {

  constructor(){
    this.repository = new FuncionarioRepository();
  }

  /** Responsável por instanciar o método de Responsável por listar todos os registros */
  async findAll(){
    return this.repository.findAll();                
}

/** Responsável por instanciar o método de Responsável por Buscar um determinado registro */
  async findOne(id){

    // Valida se o registro existe no banco
    const funcionarioExists = await this.repository.findOne(id);

    // Caso não exista retorna mensagem
    if(!funcionarioExists){
      return 'Registro inexistente na base de dados.';
    }   

    // retorna dados do registro
    return await this.repository.findOne(id);
  }

  /** Responsável por instanciar o método de create, para novos registros adicionados */
  async create(body){
    // Verifica se o registro já existe no banco
    const funcionarioExists = await this.repository.findWhere({ firstName: body.firstName });

    // Caso não exista retorna mensagem
    if(funcionarioExists.length > 0){
      return 'Registro já existe na base de dados.';
    }

    // Registra no banco de dados
    return await this.repository.create(body);
  }

  /** Responsável por instanciar o método de atualização de registro */
  async update(id, body){
    // Verifica se o registro já existe no banco
    const funcionarioExists = await this.repository.findOne(id);

    // Caso não exista retorna mensagem
    if(!funcionarioExists){
      return 'Registro inexistente na base de dados.';
    } 
    
    // Atualiza o registro baseado no ID
    await this.repository.update(id, body);  

    // Retorna o registro atualizado
    return await this.repository.findOne(id);
  }

  /** Responsável por instanciar o método de exclusão de registro */
  async delete(id){
    // Valida se o registro existe no BD
    const funcionarioExists = await this.repository.findOne(id);

    // Caso não exista, retorna mensagem
    if(!funcionarioExists){
      return 'Registro inexistente na base de dados.';
    }   
    
    // Deleta registro baseado no parametro ID
    return await this.repository.delete(id);           
  }

};