const winston    = require('winston');
const Department = require('../models/department.model');
const Product    = require('../models/product.model');
const {productType}= require('./product');
const Category      = require('../models/category.model');
const {categoryType} = require('./category');
const {
    GraphQLObjectType, GraphQLString,
    GraphQLInt, GraphQLList, GraphQLNonNull,
    GraphQLSchema
} = require('graphql');

const DepartmentType = new GraphQLObjectType({
    name: 'Department',
    fields: ()=>({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        code: {type: GraphQLString},
        selected: {type: GraphQLString},
        categories: {
            type: new GraphQLList(categoryType),
            args: {
                id: {type: GraphQLString}
            },
            resolve(root, args){
                return Category.find({department_id: args.id}).then(cats=>cats).catch(err=>winston.log('error', err.message));
            }
        },
        products: {
            type: new GraphQLList(productType),
            args: {
                id: {type: GraphQLString}
             },
            resolve(root, args){
                return Product.find({department_id: args.id}).then(products=>products).catch(err=>winston.log('error', err.message));
            }
        }
    })
});

const queryDepartment = {
    type: DepartmentType,
    args: {
        id: {type: GraphQLString}
    },
    resolve(root, args){
        return Department.findOne({_id: args.id}).then(dep=> dep).catch(err=>winston.log('error', err.message));
    }
}

const queryDepartments = {
    type: new GraphQLList(DepartmentType),
    resolve(root, args){
        return Department.find({}).then(dep=> dep).catch(err=>winston.log('error', err.message));
    }
}
module.exports = {queryDepartments, queryDepartment};