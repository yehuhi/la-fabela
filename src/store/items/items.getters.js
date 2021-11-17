export default {
    isItemGreaterThenX: state => X => state.items.filter(item => item.price < X)
}