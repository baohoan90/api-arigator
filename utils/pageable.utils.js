class Pageable {

    /**
     * 
     * @param {*} req 
     * @returns 
     */
    static of(req) {
        let { page, limit, sort } = req.query;

        let option = {};
        page = parseInt(page || 0);
        limit = parseInt(limit || 10);

        option.sort = sort; // [['id', 'DESC']]
        option.limit = limit;
        option.page = page <= 0 ? 1 : page;
        option.offset = (option.page - 1) * option.limit;
        
        return option;
    }

    /**
     * 
     * @param {*} pageable 
     * @param {*} data 
     * @returns 
     */
    static build(pageable, data) {
        const page = pageable.page;
        const { count: totalItems, rows: items } = data;
        const totalPages = Math.ceil(totalItems / pageable.limit);
        return { page, totalPages, totalItems, items };
    };
}

module.exports = Pageable