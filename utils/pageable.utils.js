class Pageable {

    constructor(page = 1, limit = 10, sort) {
        this.limit = parseInt(limit);
        this.page = parseInt(page) <= 0 ? 1 : parseInt(page);
        this.offset = (this.page - 1) * this.limit;
        this.sort = sort;
    }

    static of(req) {
        const { page, limit, sort } = req.query;
        return new Pageable(page, limit, sort);
    }

    build(data) {
        const page = this.page;
        const { count: totalItems, rows: items } = data;
        const totalPages = Math.ceil(totalItems / this.limit);
        return { page, totalPages, totalItems, items };
    };
}

module.exports = Pageable