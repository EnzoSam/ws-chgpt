const Business = require("../model/business.model");

module.exports.getAll = getAll;
module.exports.save = save;
module.exports.update = update;
module.exports.get = get;
module.exports.deleteOne = deleteOne;


function getAll() {
  let prommise = new Promise((resolve, reject) => {
    try {
      Business.find().then((data) => {
        resolve(data);
      });
    } catch (ex) {
      reject(ex);
    }
  });

  return prommise;
}


function get(id) {
  let prommise = new Promise((resolve, reject) => {
    try {
      Business.findById(id).then((data) => {
        resolve(data);
      });
    } catch (ex) {
      reject(ex);
    }
  });

  return prommise;
}

function save(params) {
  let prommise = new Promise((resolve, reject) => {
    try {
      let business = new Business();
      business.name = params.name;
      business.state = params.state;
      business
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

function update(params) {
  let prommise = new Promise((resolve, reject) => {
    try {
      Business.findOneAndUpdate(params._id, params)
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
      Business.findOneAndDelete(id)
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
