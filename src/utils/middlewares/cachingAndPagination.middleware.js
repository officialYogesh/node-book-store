const redisDB = require("redis");

const redisClient = redisDB.createClient();

function cachingAndPaginationMiddleware(model, cachedModel) {
  return (req, res, next) => {
    try {
      // Some basic query input validations
      let page = parseInt(req.query.page);
      let limit = parseInt(req.query.limit);
      if (isNaN(page) || page <= 0) {
        page = 1;
      }
      if (isNaN(limit) || limit <= 0) {
        limit = 1;
      }
      const startIndex = (page - 1) * limit;

      // To check if cache exists and is not expired
      redisClient.exists(cachedModel, async (error, reply) => {
        // Return if error occurs
        if (error) {
          console.log("error :>> ", error);
          return res
            .status(500)
            .json({ message: "Server error, please try again!" });
        }

        // Check if the requested data exists in cache
        if (reply) {
          // Get requested data range from cache
          redisClient.zrange(
            [cachedModel, startIndex, startIndex + limit - 1],
            (error, data) => {
              if (error) {
                console.log("error :>> ", error);
                res.status(500).json({
                  message: "Please provide valid value for page and limit",
                });
                return;
              }

              if (data.length > 0) {
                res.result = data.map((element) => JSON.parse(element));
              } else {
                res.result = [];
              }
              next();
            }
          );
        } else {
          try {
            // If data is not present in cache, fetch user requested data from db
            res.result = await model
              .find({}, { title: 1, author: 1, _id: 0 })
              .limit(limit)
              .skip(startIndex)
              .exec();

            next();
          } catch (error) {
            console.log("error :>> ", error);
            res
              .status(500)
              .json({ message: "Server error, please try again!" });
          }
          try {
            // To store data in cache for future use
            const dataForRedis = [];
            const dbData = await model.find(
              {},
              { title: 1, author: 1, _id: 0 }
            );
            dbData.forEach((element, index) => {
              dataForRedis.push(index);
              dataForRedis.push(JSON.stringify(element));
            });
            redisClient.zadd(cachedModel, dataForRedis, (error, result) => {
              if (error) {
                console.log("error :>> ", error);
                return;
              }
            });
            // To auto expire cache after 30 mins
            redisClient.expire(cachedModel, 1800);
          } catch (error) {
            console.log("error :>> ", error.message);
          }
        }
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}

module.exports = cachingAndPaginationMiddleware;
