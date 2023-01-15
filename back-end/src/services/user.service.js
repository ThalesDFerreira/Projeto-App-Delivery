const { Op } = require('sequelize');
const validateUser = require('../utils/ValidateUser');

const { generateToken } = require('../auth/JWT');

const CustomError = require('../error/CustomError'); 
  
class UserService {
    constructor(model) {
        this.model = model;
    }

    async findAll() {
        const result = await this.model.findAll({
            where: { role: { [Op.ne]: 'administrator' } },
            attributes: { exclude: ['password'] },
        });
        return result;
    }

    async create({ email, name, password, role = 'customer' }) {
        const user = await this.model.findOne({ where: { email } });
        const user1 = await this.model.findOne({ where: { name } });

        const codePass = validateUser(password);
        if (user || user1) throw new CustomError('Usuário já existe', 409);
        const { dataValues } = await this.model.create({ email, name, password: codePass, role });
        delete dataValues.password;
        const token = generateToken({ id: dataValues.id });
        return { ...dataValues, token };
    }

    async findByLoginCredentials(password, email) {
      const valUser = validateUser(password);

      const result = await this.model.findOne({ where: {
      password: valUser,
      email,
      } });
      if (!result) throw new CustomError('Not found', 404);
      delete result.dataValues.password;
      const token = generateToken({ id: result.dataValues.id });
      return { token, ...result.dataValues };
    }

    async findByRole() {
        const result = await this.model.findAll({ where: { role: 'seller' }, 
          attributes: { exclude: ['password'] } });
        return result;
    }

    async findById(id) {
        const result = await this.model.findByPk(id, {
            attributes: { exclude: ['password'] },
        });
        return result;
    }

    async deleteById(id) {
      const user = await this.model.findOne({ where: { id } });
      if (!user) throw new CustomError('usuário não existe', 404);
      await this.model.destroy({ where: { id } });
    }
}

module.exports = UserService;