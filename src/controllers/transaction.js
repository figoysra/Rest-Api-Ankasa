const transactionModel = require('../models/transaction');
const { success, failed } = require('../helper/respon');

const transaction = {
  getList: (req, res) => {
    try {
      const { query } = req;
      const search = query.search === undefined ? '' : query.search;
      const field = query.field === undefined ? 'id_transaction' : query.field;
      const typeSort = query.sort === undefined ? '' : query.sort;
      const limit = query.limit === undefined ? 50 : query.limit;
      // eslint-disable-next-line eqeqeq
      const offset = query.page === undefined || query.page == 1 ? 0 : (query.page - 1) * limit;
      transactionModel.getList(search, field, typeSort, limit, offset).then(async (result) => {
        // eslint-disable-next-line no-undef
        allData = await transactionModel.getAll();
        const output = {
          transaction: result,
          // eslint-disable-next-line no-undef
          totalPage: Math.ceil(allData.length / limit),
          search,
          limit,
          page: query.page,
        };
        success(res, output, 'succes');
      }).catch((err) => {
        failed(res, 500, err);
      });
    } catch (error) {
      failed(res, 401, error);
    }
  },
  getDetails: (req, res) => {
    try {
      const { id } = req.params;
      transactionModel.getDetails(id).then((result) => {
        success(res, result, 'succes');
      }).catch((err) => {
        failed(res, 500, err);
      });
    } catch (error) {
      failed(res, 401, error);
    }
  },
  insert: (req, res) => {
    try {
      const { body } = req;
      transactionModel.insert(body).then((result) => {
        success(res, result, 'succes');
      }).catch((err) => {
        failed(res, 500, err);
      });
    } catch (error) {
      failed(res, 401, error);
    }
  },

  update: (req, res) => {
    try {
      const { id } = req.params;
      const { body } = req;
      transactionModel.update(body, id).then((result) => {
        success(res, result, 'succes');
      }).catch((err) => {
        failed(res, 500, err);
      });
    } catch (error) {
      failed(res, 401, error);
    }
  },
  delete: (req, res) => {
    try {
      const { id } = req.params;
      transactionModel.delete(id).then((result) => {
        success(res, result, 'succes');
      }).catch((err) => {
        failed(res, 500, err);
      });
    } catch (error) {
      failed(res, 401, error);
    }
  },
};

module.exports = transaction;
