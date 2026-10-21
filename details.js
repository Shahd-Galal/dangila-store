let details = document.getElementById("details");

let backBtn = document.getElementById("backBtn");

let quantity = 1;

let product;


backBtn.addEventListener("click", function () {

    window.location.href = "index.html";

});

let params = new URLSearchParams(window.location.search);

let id = params.get("id");

function changeQuantity(key) {

    if (key === "plus") {

        quantity++;

    }


    else if (key === "minus" && quantity > 1) {

        quantity--;

    }


    document.getElementById("quantity").innerText = quantity;

}

function addToCart() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];


    let existingProduct = cart.find(function (item) {

        return item.id === product.id;

    });


    if (existingProduct) {

        existingProduct.quantity += quantity;

    }


    else {

        cart.push({

            ...product,

            quantity: quantity

        });

    }


    localStorage.setItem("cart", JSON.stringify(cart));


    console.log("Added to cart:", product.title);

    console.log(cart);

}

fetch(`https://dummyjson.com/products/${id}`)

    .then(res => res.json())

    .then(data => {

        product = data;

        console.log(product);

        displayProduct();

    });


function displayProduct() {

    details.innerHTML = `

        <div class="product-details">


            <div class="image-container">

                <img 
                    src="${product.thumbnail}"
                    alt="${product.title}"
                >

            </div>


            <div class="product-info">


                <h1>
                    ${product.title}
                </h1>


                <p class="category">
                    ${product.category}
                </p>


                <p class="description">
                    ${product.description}
                </p>


                <div class="price">
                    $${product.price}
                </div>


                <div class="rating">
                    ⭐ ${product.rating}
                </div>


                <p>
                    Brand: ${product.brand || "N/A"}
                </p>


                <p>
                    Stock: ${product.stock}
                </p>


                <p>
                    Discount: ${product.discountPercentage}%
                </p>


                <div class="quantity">


                    <button onclick="changeQuantity('minus')">
                        -
                    </button>


                    <span id="quantity">
                        ${quantity}
                    </span>


                    <button onclick="changeQuantity('plus')">
                        +
                    </button>


                </div>


                <button 
                    class="addToCart"
                    onclick="addToCart()"
                >
                    Add to Cart
                </button>


            </div>


        </div>

    `;

}