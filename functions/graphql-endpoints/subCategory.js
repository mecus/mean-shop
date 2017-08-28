const winston           = require('winston');
const SubCategory       = require('../models/sub-category.model');
const Product           = require('../models/product.model');
const {productType}     = require('./product');
const {
    GraphQLObjectType, GraphQLString,
    GraphQLInt, GraphQLList, GraphQLNonNull,
    GraphQLSchema
} = require('graphql');

const subCategoryType = new GraphQLObjectType({
    name: 'SubCategory',
    fields: ()=>({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        department_id: {type: GraphQLString},
        category_id: {type: GraphQLString},
        products: {
            type: new GraphQLList(productType),
            args: {
                id: {type: GraphQLString}
            },
            resolve(root, args){
                return Product.find({subcategory_id: args.id}).then(products=>products).catch(err=>winston.log('error', err.message));
            }
        }
    })
});
const querySubCategory = {
    type: subCategoryType,
    args: {
        id: {type: GraphQLString}
    },
    resolve(root, args){
        return SubCategory.findOne({_id: args.id}).then(cat=>cat).catch(err=>winston.log('error', err.message));
    }
}
const querySubCategories = {
    type: new GraphQLList(subCategoryType),
    args: {
        id: {type: GraphQLString}
    },
    resolve(root, args){
        return SubCategory.find({category_id: args.id}).then(cat=>cat).catch(err=>winston.log('error', err.message));
    }
}
module.exports = {querySubCategories, querySubCategory, subCategoryType};