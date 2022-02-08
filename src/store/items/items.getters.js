export default {
    isItemGreaterThenX: state => X => state.items.filter(item => item.price < X),

    getMyState: state => state.cartItems,


    totalCart() {
        let sum = state.cartItems;

    }
}