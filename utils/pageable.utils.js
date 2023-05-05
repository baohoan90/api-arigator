class Pageable {

    /**
     * 
     * @param {*} req 
     * @returns 
     */
    static of(req) {
        let { page, limit, sort } = req.query;

        let info = {};
        page = parseInt(page || 0);
        limit = parseInt(limit || 10);

        info.sort = sort;
        info.limit = limit;
        info.page = page <= 0 ? 1 : page;
        info.offset = (info.page - 1) * info.limit;
        
        return info;
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