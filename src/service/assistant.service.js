const Assistant = require("../model/assistant.model");

module.exports.getAssistants = getAssistants;
module.exports.saveAssistants = saveAssistants;
module.exports.updateAssistants = updateAssistants;
module.exports.getAssistant = getAssistant;
module.exports.deleteOne = deleteOne;


function getAssistants() {
  let prommise = new Promise((resolve, reject) => {
    try {
      Assistant.find({ state: 1 }).then((data) => {
        resolve(data);
      });
    } catch (ex) {
      reject(ex);
    }
  });

  return prommise;
}


function getAssistant(id) {
  let prommise = new Promise((resolve, reject) => {
    try {
      Assistant.findById(id).then((data) => {
        resolve(data);
      });
    } catch (ex) {
      reject(ex);
    }
  });

  return prommise;
}

function saveAssistants(params) {
  let prommise = new Promise((resolve, reject) => {
    try {
      let asistant = new Assistant();
      asistant.name = params.name;
      asistant.nickNames = params.nickNames;
      (asistant.whatsappId = params.whatsappId),
        (asistant.state = params.state);
      asistant
        .save()
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

function updateAssistants(params) {
  let prommise = new Promise((resolve, reject) => {
    try {
      Assistant.findOneAndUpdate(params._id, params)
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

function deleteOne(id) {
  let prommise = new Promise((resolve, reject) => {
    try {
      Assistant.findOneAndDelete(id)
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
