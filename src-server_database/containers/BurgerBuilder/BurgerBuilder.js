import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinners/Spinners';

// Ingredients Price Value
const INGREDIENT_PRICES ={
    salad: 0.5,
    bacon: 0.3, 
    cheese: 0.6, 
    meat: 0.9
}
// Ingredients Price Value

class BurgerBuilder extends Component{
// State for Ingredients
  state = {
    // ingredients: {
    //     salad: 0,
    //     bacon: 0, 
    //     cheese: 0, 
    //     meat: 0
    // },
    ingredients: null,
    totalPrice: 4,
    purchasable:false,
    purchasing:false,
    loading: false,
    error: false
  }
// State for Ingredients

//Dynamic Ingredients

componentDidMount () {
  axios.get('https://react-my-burger-d8ff5.firebaseio.com/ingredients.json')
  .then(response => {
    this.setState({ingredients: response.data});
  })
  .catch(error => {
    this.setState({error: true})
  }); 
}



// Order Now
  updatePurchaseState (ingredients){
    // const ingredients = {
    //   ...this.state.ingredients
    // };
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) =>{
        return sum + el;
      }, 0);
      this.setState({purchasable: sum > 0});
  }
// Order Now

// Add Ingredient Inside Burger
  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;

    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({totalPrice: newPrice, ingredients:updatedIngredients});
    this.updatePurchaseState(updatedIngredients);
  }
// Add Ingredient Inside Burger

// Remove Ingredient Inside Burger
  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <=0 ){
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({totalPrice: newPrice, ingredients:updatedIngredients});  
    this.updatePurchaseState(updatedIngredients);  
  }
// Remove Ingredient Inside Burger

// Purchase Handler
  purchaseHandler = () => {
     this.setState({purchasing: true});
  }
  purchaseContinuelHandler = () => {
    // alert('You Continue');
    this.setState({loading: true});
    const order = {
         ingredients: this.state.ingredients,
         price: this.state.totalPrice,
         customer:{
           name: "Raaz Singh",
           address: {
             street: 'Teststreet 1',
             zipCode: '32455',
             country: 'India',
           } ,
           email: 'rajsingh.vks@gmail.com'
         },
         deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
    .then(res => {
      // console.log(res)
      this.setState({loading: false, purchasing:false,});
    })
    .catch(error => {
      // console.log(error)
      this.setState({loading: false, purchasing:false,});
    });
  }
// Purchase Handler
// Purchase cancel Handler
  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }
  
// Purchase cancel Handler

  render(){
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo){
        disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null;
    
    let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner/>
    if (this.state.ingredients) {
      burger = (
        <Aux>
            <Burger ingredients={this.state.ingredients}/>
            <BuildControls 
              ingredientAdded={this.addIngredientHandler}
              ingredientRemoved={this.removeIngredientHandler}
              disabled={disabledInfo}
              purchasable={this.state.purchasable}
              ordered={this.purchaseHandler}
              price={this.state.totalPrice}/>
        </Aux>
      );
      orderSummary = <OrderSummary 
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseCountinue={this.purchaseContinuelHandler}/>;
    }
    if(this.state.loading){
      orderSummary = <Spinner/>
    }
    return(
      <Aux>
          <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
            {orderSummary}
          </Modal>
          {burger}
      </Aux>
    )
  }
}

export default WithErrorHandler(BurgerBuilder , axios);
