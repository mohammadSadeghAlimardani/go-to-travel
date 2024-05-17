const showSideBarBtn = document.querySelector(".show-sidebar");
const hideSidebarBtn = document.querySelector(".hide-sidebar");
const sidebar = document.querySelector(".sidebar");

showSideBarBtn.addEventListener("click", function(e){
    e.preventDefault();
    sidebar.classList.add("show");
})
hideSidebarBtn.addEventListener("click", function(e){
    e.preventDefault();
    sidebar.classList.remove("show");
})

// ---------------
//================

const mostPopularItemsDOM = document.querySelector(".most-popular-items");
const mostPopularItemsURL = "./api/popular-tours.json";

async function fetchMostPopularTours(){
    const response = await fetch(mostPopularItemsURL);
    const data = await response.json();
    displayMostPopularTours(data);
}

function displayMostPopularTours(tours){
    mostPopularItemsDOM.innerHTML = tours.map(tour => {
        const {destination, price, image, text} = tour;
        return  `<article>
                    <img src="${image}" alt="${destination}"/>
                    <section>
                        <ul>
                            <li>
                                <h2>
                                ${destination}
                                </h2>
                            </li>
                            <li>
                                $${price}
                            </li>
                        </ul>
                        <p>
                            ${text}
                        </p>
                        <a href="#" class="btn btn-white">see details</a>
                    </section>
                </article>`;
    }).join("");
}

window.addEventListener("DOMContentLoaded", fetchMostPopularTours);

// ---------------
//================

const userCommentsContainer = document.querySelector(".user-comments-container");


const nextBtn = document.querySelector(".reviews .reviews-container .comments > ul li a.next-btn");
const prevBtn = document.querySelector(".reviews .reviews-container .comments > ul li a.prev-btn");

nextBtn.addEventListener("click", function(e){
    e.preventDefault();
    userCommentsContainer.scrollBy({
        left: 300,
        behavior: "smooth",
    });
})
prevBtn.addEventListener("click", function(e){
    e.preventDefault();
    userCommentsContainer.scrollBy({
        left: -300,
        behavior: "smooth",
    });
})

// ---------------
//================

const reviewsURL = "./api/reviews.json";

async function fetchReviews(){
    const response = await fetch(reviewsURL);
    const data = await response.json();
    displayReviews(data);
}
function displayReviews(reviews){
    userCommentsContainer.innerHTML = reviews.map(review => {
        const {destination, text, stars, username, userImage} = review;
        const fillStars = stars;
        const emptyStars = 5 - stars;
        const starArray = [];
        for (let index = 1; index <= fillStars; index++) {
           starArray.push("fill");
        }
        for (let index = 1; index <= emptyStars; index++) {
            starArray.push("empty");
        }
        return  `<article class="user-comment">
                    <div>
                        <h2>${destination}</h2>
                        <ul>
                            ${starArray.map(star => {
                                if(star == "fill"){
                                    return `<i class="fa-solid fa-star"></i>`;
                                }
                            }).join("")}
                        </ul>
                        <p>
                            ${text}
                        </p>
                        <h3>${username}</h3>
                        <h4>traveler</h4>
                        <img src="${userImage}" alt="${username}"/>
                    </div>
                </article>`
    }).join("");
    const userComment = document.querySelectorAll(".user-comment");
    userComment.forEach((element, index) => {
        if(index != userComment.length-1){
            element.firstElementChild.style.marginRight = "2rem";
        }
        element.style.transform = `translateX(${index * 100}%)`;
    })
}
window.addEventListener("DOMContentLoaded", fetchReviews);

// ---------------
//================

const blogsURL = "./api/blogs.json";
const blogItems = document.querySelector(".blog-items");

async function fetchBlogItems(){
    const response = await fetch(blogsURL);
    const data = await response.json();
    displayBlogItems(data);
}

function displayBlogItems(blogs){
    blogItems.innerHTML = blogs.map(blog => {
        const {image, title, date, numberOfComments} = blog;
        return  `<article>
                    <img src="${image}" alt="${title}"/>
                    <section>
                        <h2>${title}</h2>
                        <ul>
                            <li>
                                <i class="fa-solid fa-calendar"></i>
                                <span>${date}</span>
                            </li>
                            <li>
                                <i class="fa-solid fa-comments"></i>
                                <span>${numberOfComments}+</span>
                            </li>
                        </ul>
                    </section>
                </article>`;
    }).join("");
}

window.addEventListener("DOMContentLoaded", fetchBlogItems);

// ---------------
//================

document.querySelector(".footer .copy-right .present-time").innerHTML = new Date().getFullYear();