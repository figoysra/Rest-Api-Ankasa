const ticketModel = require('../models/ticket');
const { success, failed } = require('../helper/respon');

const ticket = {
  getList: (req, res) => {
    try {
      const { query } = req;
      const search = query.search === undefined ? ' ' : query.search;
      const maxdeptime = query.maxdeptime === undefined ? '23:00:00' : query.maxdeptime;
      const mindeptime = query.mindeptime === undefined ? '00:00:00' : query.mindeptime;
      const maxarrivedTime = query.maxarrivedTime === undefined ? '23:00:00' : query.maxarrivedTime;
      const minarrivedTime = query.minarrivedTime === undefined ? '00:00:00' : query.minarrivedTime;
      const airlane = query.airlane === undefined ? '' : query.airlane;
      const transit = query.transit === undefined ? '' : query.transit;
      const wifi = query.wifi === undefined ? '' : query.wifi;
      const meal = query.meal === undefined ? '' : query.meal;
      const luggage = query.luggage === undefined ? '' : query.luggage;
      const from = query.from === undefined ? '' : query.from;
      const to = query.to === undefined ? '' : query.to;
      const maxprice = query.maxprice === undefined ? '1000000' : query.maxprice;
      const minprice = query.minprice === undefined ? '0' : query.minprice;
      const field = query.field === undefined ? 'id_ticket' : query.field;
      const typeSort = query.sort === undefined ? '' : query.sort;
      const limit = query.limit === undefined ? 50 : query.limit;
      // eslint-disable-next-line eqeqeq
      const offset = query.page === undefined || query.page == 1 ? 0 : (query.page - 1) * limit;
      ticketModel.getList(search, field, typeSort, limit, offset, maxdeptime,
        mindeptime, maxarrivedTime, minarrivedTime, airlane,
        transit, wifi, meal, luggage, from, to, maxprice, minprice)
        .then(async (result) => {
        // eslint-disable-next-line no-undef
          allData = await ticketModel.getAll();
          const output = {
            ticket: result,
            // eslint-disable-next-line no-undef
            totalPage: Math.ceil(allData.length / limit),
            search,
            maxdeptime,
            mindeptime,
            maxarrivedTime,
            minarrivedTime,
            airlane,
            transit,
            wifi,
            meal,
            luggage,
            from,
            to,
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
      ticketModel.getDetails(id).then((result) => {
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
      ticketModel.insert(body).then((result) => {
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
      ticketModel.update(body, id).then((result) => {
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
      ticketModel.delete(id).then((result) => {
        success(res, result, 'succes');
      }).catch((err) => {
        failed(res, 500, err);
      });
    } catch (error) {
      failed(res, 401, error);
    }
  },
};

module.exports = ticket;
