/**
 * List all products (from AJAX)
 * Add a 'add to cart' button
 *  - when someone adds to cart, move that item into an array
 * Show all items in cart in seperate column
 * Calculate subtotal, total and tax and show in cart
 */

// let items = [
//     { // One book
//         title: 'Book A',
//         author: 'Person 1',
//         price: 100.20,
//         cover: 'http://something.jpeg',
//     },
//     { // One book
//         title: 'Book B',
//         author: 'Person 2',
//         price: 15.50,
//         cover: 'http://something.jpeg',
//     },
//     { // One book
//         title: 'Book C',
//         author: 'Person 3',
//         price: 21.12,
//         cover: 'http://something.jpeg',
//     },
// ];

let cart = [];

window.addEventListener('load', function () {
    console.log('here we go!');
    getProducts();

    // for (let i = 0; i < items.length; i++) {
    //     showProduct(items[i]);
    // }
});

function getProducts() {
    let request = new XMLHttpRequest();
    request.open('GET', 'http://api.queencityiron.com/books');
    request.addEventListener('load', function() {
        let response = JSON.parse(request.responseText);
        let books = response.books;

        //show each book:
        for (let i = 0; i < books.length; i++) {
            showProduct(books[i]);
            console.log('run');
        }
    });
    request.send();
}

function showProduct(product) {
    let child = document.createElement('li');
    let parent = document.querySelector('#products ul');

    let template = document.querySelector('#product-template');

    child.innerHTML = Mustache.render(template.innerHTML, {
        bookName: product.title,
        authorName: product.author,
        price: displayPrice(product.price),
        cover: product.cover,
    });

    let button = child.querySelector('button');
    button.addEventListener('click', function() {
        console.log('clicked on ' + product.title);
        cart.push(product);
        console.log(cart);
        showCart();
    });

    parent.appendChild(child);
}

function showCart() {
    let cartList = document.querySelector('#cart ul');
    cartList.innerHTML = '';

    for (let i = 0; i < cart.length; i++) {
        showCartItem(cart[i]);
    }

    let subtotal = 0;
    for (let i = 0; i < cart.length; i++) {
        subtotal = subtotal + cart[i].price;
    }
    document.querySelector('#cart-subtotal').textContent = displayPrice(subtotal);
    document.querySelector('#cart-tax').textContent =  displayPrice(subtotal * 0.1);
    document.querySelector('#cart-total').textContent = displayPrice(subtotal + (subtotal * 0.1));
}

function showCartItem(item) {
    // create a new <li>
    // populate it with Mustache template
    // add it to DOM

    let child = document.createElement('li');
    let parent = document.querySelector('#cart ul');
    let template = document.querySelector('#cart-template');

    child.innerHTML = Mustache.render(template.innerHTML, {
        bookName: item.title,
        price: item.price,
    });
    parent.appendChild(child);
}

function displayPrice(num) {
    return (Math.round(num * 100) / 100).toFixed(2);
}