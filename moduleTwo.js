function hello(message) {
    console.log(message);
}

function sayHello() {
    console.log('HELLO');
}

function sayBye() {
    console.log('BYE');
}

// Require = ייבוא
// Exports = ייצוא

// hello('MY PHONE');
module.exports = {
    hello,
    sayHello,
    sayBye
};

console.log(module);