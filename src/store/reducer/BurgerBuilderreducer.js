import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    // ingredients: {
    //     salad: 0,
    //     bacon: 0, 
    //     cheese: 0, 
    //     meat: 0
    // },
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.3, 
    cheese: 0.6, 
    meat: 0.9
};

const addIngredient = ( state, action ) => {
    const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1}
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients, 
       totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
       building: true
    }
    return updateObject(state, updatedState);
};

const removeIngredient = ( state, action ) => {
    const updatedIng = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1}
    const updatedIngs = updateObject(state.ingredients, updatedIng);
    const updatedSt = {
        ingredients: updatedIngs, 
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state, updatedSt);
};

const setIngredients = ( state, action ) => {
    return updateObject(state,
        {ingredients: action.ingredients,
        totalPrice: 4,
        error: false,
        building: false}
    );
};

const fetchIngredientsFailed = (state, action) => {
    return updateObject(state, { error: true });
}

const reducer = ( state = initialState, action) => {
   switch ( action.type ) {
        case actionTypes.ADD_INGREDIENT: return addIngredient( state, action );
            
        // const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1}
        // const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
        // const updatedState = {
        //     ingredients: updatedIngredients, 
        //    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
        // }
        // return updateObject(state, updatedState);  


            // return{
            //    ...state,
            //    ingredients: updatedIngredients, 
            // //    {
            // //        ...state.ingredients,
            // //        [action.ingredientName]: state.ingredients[action.ingredientName] + 1
            // //    },
            //    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            // };
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient( state, action );


            // const updatedIng = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1}
            // const updatedIngs = updateObject(state.ingredients, updatedIng);
            // const updatedSt = {
            //     ingredients: updatedIngs, 
            //    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            // }
            // return updateObject(state, updatedSt);


            // return{
            //     ...state,
            //     ingredients: {
            //         ...state.ingredients,
            //         [action.ingredientName]: state.ingredients[action.ingredientName] - 1
            //     },
            //     totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientsName]
            //  };
        case actionTypes.SET_INGREDIENT: return setIngredients( state, action );


            // return updateObject(state,
            //     {ingredients: action.ingredients,
            //     totalPrice: 4,
            //     error: false}
            // );


        // return{
        //     ...state,
        //     ingredients: action.ingredients,
        //     totalPrice: 4,
        //     error: false
        // };
        case actionTypes.FETCH_INGREDIENT_FAILED: return fetchIngredientsFailed(state,action);
            
        // return updateObject(state, { error: true });


        // return{
        //     ...state,
        //     error:true
        // };
        default: return state;
   }
};

export default reducer;