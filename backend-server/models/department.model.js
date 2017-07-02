var mongoose =  require('mongoose');

var Schema = mongoose.Schema;

var deptModel = new Schema({
    name: {
        type: String
    },
    code: String,
    selected: Boolean
})

var Department = mongoose.model('Department', deptModel);
module.exports = Department;
