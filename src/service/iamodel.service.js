const { mode } = require("crypto-js");
const IAModel = require("../model/iamodel.model");
const GlobalConstants = require("../constants/global.constants");

module.exports.getAll = getAll;
module.exports.save = save;
module.exports.update = update;
module.exports.get = get;
module.exports.deleteOne = deleteOne;
module.exports.getByVersion = getByVersion;

function getAll() {
  let prommise = new Promise((resolve, reject) => {
    try {
      IAModel.find().then((data) => {
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
      IAModel.findById(id).then((data) => {
        resolve(data);
      });
    } catch (ex) {
      reject(ex);
    }
  });

  return prommise;
}

function getByVersion(_version) {
  let prommise = new Promise((resolve, reject) => {
    try {
      IAModel.findOne({version:+_version}).exec().then((data) => {
        
        if(!data || data === null || data === undefined)
        {
          let model = new IAModel();
          model.version = +_version;
          model.state = GlobalConstants.states.Active;
          model.name = 'Modelo ' + _version;
          save(model).then(newSaved=>{
            resolve(newSaved);
          })
          .catch(err=>
          {
            reject(err);
          });
        }
        else
        {
          resolve(data);
        }
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
      let model = new IAModel();
      model.name = params.name;
      model.state = params.state;
      model.version = params.version;
      model
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
      IAModel.findOneAndUpdate(params._id, params)
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
      IAModel.findOneAndDelete(id)
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
