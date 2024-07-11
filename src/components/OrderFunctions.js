let orders = [];


export const placeOrder = (order) => {
    orders.push(order);
};


export const getAllOrders = () => {
    return orders;
};


export const getOrdersByUsername = (username) => {
    return orders.filter(order => order.username === username);
};


export const deleteOrder = (index) => {
    orders.splice(index, 1);
};