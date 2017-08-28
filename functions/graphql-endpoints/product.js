const winston         = require('winston');
const Product         = require('../models/product.model');
const {
    GraphQLObjectType, GraphQLString,
    GraphQLInt, GraphQLList, GraphQLNonNull,
    GraphQLSchema, GraphQLFloat
} = require('graphql');


const descriptionType = new GraphQLObjectType({
    name: 'description',
    fields: ()=>({
        origin: {type: GraphQLString},
        size: {type: GraphQLString},
        detail: {type: GraphQLString}
    })
    
})
const nutritionType = new GraphQLObjectType({
    name: 'nutrition',
    fields: ()=>({
        salt : {type: GraphQLString},
		saturates : {type: GraphQLString},
		fat : {type: GraphQLString},
		energy :{type: GraphQLString}
    })
    
})
const productType = new GraphQLObjectType({
    name: 'Product',
    fields: ()=>({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        publish : {type: GraphQLString},
        stock : {type: GraphQLInt},
        subcategory_id : {type: GraphQLString},
        category_id : {type: GraphQLString},
        department_id :{type: GraphQLString},
        category : {type: GraphQLString},
        imageUrl: {type: GraphQLString},
        price : {type: GraphQLFloat},
        code : {type: GraphQLString},
        photo_id: {type: GraphQLString},
        description: {type: descriptionType},
        nutrition: {type: nutritionType}
       
    })
});

const queryProducts = {
    type: new GraphQLList(productType),
    resolve(root, args){
        return Product.find({}).then(products=>products).catch(err=>winston.log('error', err.message));
    }
}

module.exports = {queryProducts, productType};