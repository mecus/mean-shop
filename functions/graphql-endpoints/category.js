const winston         = require('winston');
const {subCategoryType} = require('./subCategory');
const Category = require('../models/category.model');
const SubCategory = require('../models/sub-category.model');
const {
    GraphQLObjectType, GraphQLString,
    GraphQLInt, GraphQLList, GraphQLNonNull,
    GraphQLSchema
} = require('graphql');

const categoryType = new GraphQLObjectType({
    name: 'Category',
    fields: ()=>({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        department_id: {type: GraphQLString},
        subcategories: {
            type: new GraphQLList(subCategoryType),
            args: {
                id: {type: GraphQLString}
            },
            resolve(root, args){
                return SubCategory.find({category_id: args.id}).then(subCat=>subCat).catch(err=>winston.log('error', err.message));
            }
        }
    })
});
const queryCategory = {
    type: categoryType,
    args: {
        id: {type: GraphQLString}
    },
    resolve(root, args){
        return Category.findOne({department_id: args.id}).then(cat=>cat).catch(err=>winston.log('error', err.message));
    }
}

const queryCategories = {
    type: new GraphQLList(categoryType),
    args: {
        id: {type: GraphQLString}
    },
    resolve(root, args){
        return Category.find({department_id: args.id}).then(cat=>cat).catch(err=>winston.log('error', err.message));
    }
}
module.exports = {queryCategories, queryCategory, categoryType};