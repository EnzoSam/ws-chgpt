const { tikets_states } = require("../constants/tikets.constants");
const Tiket = require("../model/tiket.model");

module.exports.getTiket = getTiket;
module.exports.getTikets = getTikets;
module.exports.verifyTiket = verifyTiket;
module.exports.updateTiket = updateTiket;

function getTiket(id) {
  let prommise = new Promise((resolve, reject) => {
    try {
      Tiket.findById(id).exec()
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
      let query = Tiket.count();
      query = query.where("state").equals(tikets_states.Open);
      query = query.where("customeWhatsappId").equals(whatsappId);

      query.exec().then(data => {
        console.log(data);
        if (!data || data == null || data === 0)
        {
          console.log('creando tiket');
          console.log(data);
          let tiket = new Tiket();
          tiket.state = tikets_states.Open;
          tiket.customeName = customeName;
          tiket.customeWhatsappId = whatsappId;
          tiket.problemDescription = message;
          tiket.number = 0;
          tiket.save().then(data=>
            {
              resolve(tiket);
              console.log('guardo tiket');
            }).catch(errSave =>
              {
                console.log(errSave);
                reject(errSave);
              });
          
          
        }
        else
        {
          console.log('sin tiket');
            resolve(data);
        }
      }).catch(err=>
        {
          console.log(err);
          reject(err);
        });
    } catch (ex) {
      console.log(ex);
      reject(ex);
    }
  });

  return prommise;
}

function updateTiket(params) {
  let prommise = new Promise((resolve, reject) => {
    try {
      Tiket.findOneAndUpdate(params._id, params).then(data => {
        resolve(data);
      }).catch(err=>
        {
          reject(err);
        }
        );
    } catch (ex) {
      reject(ex);
    }
  });

  return prommise;
}
