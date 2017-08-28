const {queryDepartments, queryDepartment} = require('./department');
const {queryProducts} = require('./product');
const {queryCategories, queryCategory} = require('./category');
const {querySubCategory, querySubCategories} = require('./subCategory');
const {
    GraphQLObjectType, GraphQLString,
    GraphQLInt, GraphQLList, GraphQLNonNull,
    GraphQLSchema
} = require('graphql');



const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        department: queryDepartment,
        departments: queryDepartments,
        products: queryProducts,
        categories: queryCategories,
        category: queryCategory,
        subcategories: querySubCategories,
        subcategory: querySubCategory

    }
})


module.exports = new GraphQLSchema({
    query: RootQuery
});