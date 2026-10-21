let container = document.createElement("div");
container.id = "container";
let parent = document.createElement("div");

parent.className = "parent";

let searchInput = document.getElementById("searchItem");
let searchBtn = document.getElementById("searchBtn");
let productsToggle = document.getElementById("productsToggle");
let categoriesDropdown = document.getElementById("categoriesDropdown");
let AllProductFilter = document.getElementById("AllProductFilter");
let products = [];

let selectedCategory = "";


let categories = [
    { name: "Fragrances", slug: "fragrances" },
    { name: "Beauty", slug: "beauty" },
    { name: "Furniture", slug: "furniture" },
    { name: "Groceries", slug: "groceries" },
    { name: "Home Decoration", slug: "home-decoration" },
    { name: "Kitchen Accessories", slug: "kitchen-accessories" },
    { name: "Laptops", slug: "laptops" },
    { name: "Men's Shirts", slug: "mens-shirts" },
    { name: "Men's Shoes", slug: "mens-shoes" },
    { name: "Men's Watches", slug: "mens-watches" },
    { name: "Mobile Accessories", slug: "mobile-accessories" },
    { name: "Motorcycle", slug: "motorcycle" },
    { name: "Skin Care", slug: "skin-care" },
    { name: "Smartphones", slug: "smartphones" },
    { name: "Sports Accessories", slug: "sports-accessories" },
    { name: "Sunglasses", slug: "sunglasses" },
    { name: "Tablets", slug: "tablets" },
    { name: "Tops", slug: "tops" },
    { name: "Vehicle", slug: "vehicle" },
    { name: "Women's Bags", slug: "womens-bags" },
    { name: "Women's Dresses", slug: "womens-dresses" },
    { name: "Women's Jewellery", slug: "womens-jewellery" },
    { name: "Women's Shoes", slug: "womens-shoes" },
    { name: "Women's Watches", slug: "womens-watches" }
];

function viewDetails(id) {
    window.location.href = `details.html?id=${id}`;
}
function filterProducts() {
    let searchKey = searchInput.value.toLowerCase().trim();

    let filteredProducts = products.filter(function (product) {
        let matchesSearch = product.title.toLowerCase().includes(searchKey);

        let matchesCategory =
            selectedCategory === "" ||
            product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    displayProducts(filteredProducts);
}
function showMore(element) {
    let short = element.querySelector(".short");
    let more = element.querySelector(".more");

    if (more.style.display === "inline") {
        more.style.display = "none";
        short.style.display = "inline";
    } else {
        more.style.display = "inline";
        short.style.display = "none";
    }
}

function displayProducts(productsList) {
    parent.innerHTML = "";

    if (productsList.length === 0) {
        parent.innerHTML = "<h3>No products found</h3>";
        return;
    }

    for (let i = 0; i < productsList.length; i++) {
        let product = productsList[i];

        parent.innerHTML += `
            <div class="card">
                <div id="image">
                    <img
                        src="${product.thumbnail}"
                        alt="${product.title}"
                    >
                </div>

                <div class="card-content">
                    <h4>${product.title}</h4>

                    <p class="category">
                        ${product.category}
                    </p>

                    <p class="description" onclick="showMore(this)">
                        <span class="short">
                            ${product.description.substring(0, 80)}
                            <span class="dots">...</span>
                        </span>

                        <span class="more">
                            ${product.description}
                        </span>
                    </p>

                    <div class="footer">
                        <div class="price">
                            $${product.price}
                        </div>

                        <div class="rating">
                            ⭐ ${product.rating}
                        </div>
                    </div>

                    <button
                        class="detailsBtn"
                        onclick="viewDetails(${product.id})"
                    >
                        View Details
                    </button>
                </div>
            </div>
        `;
    }
}

container.appendChild(parent);
document.body.appendChild(container);

categories.forEach(function (category) {
    let button = document.createElement("button");

    button.type = "button";
    button.textContent = category.name;

    button.addEventListener("click", function () {
        selectedCategory = category.slug;

        filterProducts();

        categoriesDropdown.classList.remove("show");
    });

    categoriesDropdown.appendChild(button);
});
productsToggle.addEventListener("click", function () {
    categoriesDropdown.classList.toggle("show");
});
AllProductFilter.addEventListener("click", function () {
    selectedCategory = "";
    searchInput.value = "";

    displayProducts(products);

    categoriesDropdown.classList.remove("show");
});

fetch("https://dummyjson.com/products?limit=0")
    .then(res => res.json())
    .then(data => {
        products = data.products;
        displayProducts(products);
    })
    .catch(error => {
        console.log("Error fetching products:", error);
    });
searchBtn.addEventListener("click", filterProducts);
searchInput.addEventListener("input", filterProducts);
