let container2 = document.getElementById("container2");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let cartbtn = document.getElementById("cartbtn");

cartbtn.addEventListener("click", function () {

    window.location.href = "index.html";

});


function changeQuantity(index, key) {

    if (key === "plus") {

        cart[index].quantity++;

    }

    else if (key === "minus" && cart[index].quantity > 1) {

        cart[index].quantity--;

    }

    else if (key === "delete") {

        cart.splice(index, 1);

    }


    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();

}


function displayCart() {

    container2.innerHTML = "";


    if (cart.length === 0) {

        container2.innerHTML = `
            <h2>Cart is empty</h2>
        `;

        return;
    }


    for (let i = 0; i < cart.length; i++) {

        let deleteButton = "";

        if (cart[i].quantity === 1) {

            deleteButton = `
                <button 
                    class="deleteBtn"
                    onclick="changeQuantity(${i}, 'delete')"
                >
                    🗑️
                </button>
            `;

        } else {

            deleteButton = `
                <button 
                    onclick="changeQuantity(${i}, 'minus')"
                >
                    -
                </button>
            `;

        }


        container2.innerHTML += `

            <div class="card">

                <div id="image">

                    <img 
                        src="${cart[i].thumbnail}" 
                        alt="${cart[i].title}"
                    >

                </div>


                <div class="card-content">

                    <h4>
                        ${cart[i].title}
                    </h4>


                    <p class="category">
                        ${cart[i].category}
                    </p>


                    <div class="footer">

                        <div class="price">
                            $${cart[i].price}
                        </div>


                        <div class="rating">
                            ⭐ ${cart[i].rating}
                        </div>

                    </div>


                    <div class="quantity">

                        <button 
                            onclick="changeQuantity(${i}, 'plus')"
                        >
                            +
                        </button>


                        <span>
                            ${cart[i].quantity}
                        </span>


                        ${deleteButton}


                    </div>


                </div>

            </div>

        `;
    }
}


displayCart();