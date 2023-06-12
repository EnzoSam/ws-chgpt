const { tikets_states } = require("../constants/tikets.constants");
const Tiket = require("../model/tiket.model");
const WsService = require("../service/wsService.service");
const ContactService = require("../service/contact.service");

module.exports.getTiket = getTiket;
module.exports.getTikets = getTikets;
module.exports.verifyTiket = verifyTiket;
module.exports.updateTiket = updateTiket;
module.exports.assignAssistant = assignAssistant;

function getTiket(id) {
  let prommise = new Promise((resolve, reject) => {
    try {
      Tiket.findById(id).populate('contact')
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

function getTikets(assistantId, fromDate, state) {
  let prommise = new Promise((resolve, reject) => {
    try {
      let query = Tiket.find();
      if (state && state !== 0) query = query.where("state").equals(state);
      if (fromDate && fromDate !== undefined)
        query = query.where("createdAt").gte(fromDate);

      query = query.populate("assistant");
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

      query
        .exec()
        .then((data) => {
          console.log(data);
          if (!data || data == null || data === 0) {
            ContactService.verifyContact(whatsappId, customeName)
              .then((contactSaved) => {
                let tiket = new Tiket();
                tiket.state = tikets_states.Open;
                tiket.contact = contactSaved;
                tiket.problemDescription = message;
                tiket.number = 0;
                tiket
                  .save()
                  .then((data) => {
                    resolve(tiket);
                  })
                  .catch((errSave) => {
                    console.log(errSave);
                    reject(errSave);
                  });
              })
              .catch((error) => {
                console.log(error);
                reject(error);
              });
          } else {
            console.log("sin tiket");
            resolve(data);
          }
        })
        .catch((err) => {
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
      console.log(params);
      Tiket.findByIdAndUpdate(params._id, params)
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

function assignAssistant(params) {
  let prommise = new Promise((resolve, reject) => {
    try {
      let opt = {
        assistant: params.idAssistant,
      };
      Tiket.findByIdAndUpdate(params.idTiket, opt)
        .then((data) => {
          if (params.sendGreeting && params.greeting && params.greeting != "") {
            WsService.sendTextMessage(params.greeting, data.customeWhatsappId)
              .then((data) => {
                resolve({ status: "ok" });
              })
              .catch((err) => reject(err));
          } else {
            resolve({ status: "ok" });
          }
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
