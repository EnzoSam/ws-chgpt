const { tikets_states } = require("../constants/tikets.constants");
const Tiket = require("../model/tiket.model");

module.exports.getTikets = getTikets;
module.exports.verifyTiket = verifyTiket;
module.exports.updateTiket = updateTiket;

function getTikets(assistantId, fromDate, state) {
  let prommise = new Promise((resolve, reject) => {
    try {
      let query = Tiket.find();
      if (state && state !== 0) query = query.where("state").equals(state);
      if (fromDate && fromDate !== undefined)
        query = query.where("createdAt").gte(fromDate);

      query
        .exec()
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (ex) {
      reject(ex);
    }
  });

  return prommise;
}

function verifyTiket(whatsappId, customeName, message) {
  let prommise = new Promise((resolve, reject) => {
    try {
      let query = Tiket.find();
      query = query.where("state").equals(tikets_states.Open);
      query = query.where("customeWhatsappId").equals(whatsappId);

      query.exec().then(data => {
        if (!data || data == null)
        {
          let tiket = new Tiket();
          tiket.state = tikets_states.Open;
          tiket.customeName = customeName;
          tiket.customeWhatsappId = whatsappId;
          tiket.problemDescription = message;
          tiket.save();
          resolve(tiket);
        }
        else
        {
            resolve(data);
        }
      }).catch(err=>
        {
          reject(err);
        });
    } catch (ex) {
      reject(ex);
    }
  });

  return prommise;
}

function updateTiket(params) {
  let prommise = new Promise((resolve, reject) => {
    try {
      Tiket.findOneAndUpdate(params._id, params, (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    } catch (ex) {
      reject(ex);
    }
  });

  return prommise;
}
