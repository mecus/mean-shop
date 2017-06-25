var mongoose =  require('mongoose');

var Schema = mongoose.Schema;

var deptModel = new Schema({
    name: {
        type: String
    },
    code: String
})

var Department = mongoose.model('Department', deptModel);
module.exports = Department;
