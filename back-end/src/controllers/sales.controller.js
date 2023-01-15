class ProductController {
    constructor(service, req, res, next) {
        this.req = req;
        this.res = res;
        this.next = next;
        this.service = service;
    }

    async findAll() {
        try {
            const response = await this.service.findAll();
            this.res.status(200).json(response);
        } catch (error) {
            this.next(error);
        }
    }

    async create() {
        try {
            const { userId } = this.req;
            const response = await this.service.create(this.req.body, userId);
            this.res.status(201).json(response);
        } catch (error) {
            this.next(error);
        }
    }

    async findById() {
        try {
            const { id } = this.req.params;
            const response = await this.service.findById(+id);
            this.res.status(200).json(response);
        } catch (error) {
            this.next(error);
        }
    }

    async updateStatusById() {
      try {
        const { status } = this.req.body;
        const { id } = this.req.params;

        await this.service.updateStatusById(+id, status);
        this.res.status(200).json({ message: 'Status Atualizado' });
      } catch (error) {
        this.next(error);
      }
    }

    async findByUserId() {
      try {
        const { userId } = this.req;
        // console.log(userId);
        const response = await this.service.findByUserId(+userId);
        this.res.status(200).json(response);
      } catch (error) {
        this.next(error);
      }
    }

    async findBySellerId() {
      try {
        const { userId } = this.req;
        // console.log(userId);
        const response = await this.service.findBySellerId(+userId);
        this.res.status(200).json(response);
      } catch (error) {
        this.next(error);
      }
    }

    async deleteById() {
        try {
            const { id } = this.req.params;
            const response = await this.service.deleteById(id);
            this.res.status(204).json(response);
        } catch (error) {
            this.next(error);
        }
    }
}

module.exports = ProductController;