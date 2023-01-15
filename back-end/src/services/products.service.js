// const aw = require("../../../assets/images/becks_600ml.jpg");

// const { generateToken } = require('../auth/JWT');

// const be = require('../../../assets/images/brahma_600ml.jpg');

class ProductService {
  constructor(model) {
    this.model = model;
  }

  async findAll() {
    const result = await this.model.findAll();
    return result;
  }

  async findById(id) {
    const result = await this.model.findByPk(id);
    return result;
  }

  async create({ name, price, urlImage }) {
    const { dataValues } = await this.model.create({ name, price, urlImage });
    return dataValues;
  }

  async deleteById(id) {
    await this.model.destroy({ where: { id } });
  }
}

module.exports = ProductService;