
let mainSection = document.getElementById("data-list-wrapper");

// pitch
let pitchTitleInput = document.getElementById("pitch-title");
let pitchImageInput = document.getElementById("pitch-image");
let pitchCategoryInput = document.getElementById("pitch-category");
let pitchfounderInput = document.getElementById("pitch-founder");
let pitchPriceInput = document.getElementById("pitch-price");
let pitchCreateBtn = document.getElementById("add-pitch");

// Update pitch
let updatePitchIdInput = document.getElementById("update-pitch-id");
let updatePitchTitleInput = document.getElementById("update-pitch-title");
let updatePitchImageInput = document.getElementById("update-pitch-image");
let updatePitchfounderInput = document.getElementById("update-pitch-founder");
let updatePitchCategoryInput = document.getElementById("update-pitch-category");
let updatePitchPriceInput = document.getElementById("update-pitch-price");
let updatePitchBtn = document.getElementById("update-pitch");

//Update price
let updatePricePitchId = document.getElementById("update-price-pitch-id");
let updatePricePitchPrice = document.getElementById("update-price-pitch-price");
let updatePricePitchPriceButton = document.getElementById("update-price-pitch");

//sort and filter
let sortAtoZBtn = document.getElementById("sort-low-to-high");
let sortZtoABtn = document.getElementById("sort-high-to-low");
let filterFood = document.getElementById("filter-Food");
let filterElectronics = document.getElementById("filter-Electronics");
let filterPersonalCare = document.getElementById("filter-Personal-Care");

//Search by title/founder

let searchBySelect = document.getElementById("search-by-select");
let searchByInput = document.getElementById("search-by-input");
let searchByButton = document.getElementById("search-by-button");

// Problem 1. List of pitches on page load [3}

function Fetchdata() {
    fetch("https://add-to-cart-backend-w6tm.onrender.com/pitches")
        .then((res) => res.json())
        .then((data) => Cardlist(data))
        .catch((err) => console.log(err))
}
Fetchdata();

function Cardlist(data) {
    const store = data.map((el) => Card(el.id, el.image, el.title, el.price, el.founder, el.category))
    mainSection.innerHTML = store.join("")
}

function Card(id, image, title, price, founder, category) {
    let singlecard = `
    <div class="card" data-id=${id}>
     <div class="card-img">
       <img src="${image}" alt="pitch">
     </div>
     <div class="card-body">
      <h4 class="card-title">${title}</h4>
      <p class="card-founder">Founder:${founder}</p>
      <p class="card-category">${category}</p>
      <p class="card-price">${price}</p>
      <a href="#" data-id=${id} class="card-link">Edit </a>
      <button data-id=${id} class="card-button">Delete</button>
      </div>
      </div>
    `
    return singlecard
}

// ##### POST #####

pitchCreateBtn.addEventListener("click", () => {
    let product = {
        title: pitchTitleInput.value,
        image: pitchImageInput.value,
        category: pitchCategoryInput.value,
        founder: pitchfounderInput.value,
        price: pitchPriceInput.value,
    }

    fetch("https://add-to-cart-backend-w6tm.onrender.com/pitches", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    })
        .then((res) => res.json())
        .then((res)=>{
            console.log(res)
            alert("Product Added 👍")
        })
        .catch((err) => console.error('Error:', err));
    
})

//  ####### DELETE #######

document.addEventListener("click",(e)=>{
    if(e.target.classList.contains("card-button")){
        DeletePitch(e.target.dataset.id)
    }
    
})

function DeletePitch(id){
    fetch(`https://add-to-cart-backend-w6tm.onrender.com/pitches/${id}`,{
        method: "DELETE"
    })
    .then((res)=>res.json())
    .then((data)=>{
        alert("Product Deleted 👍")
        console.log(data)       
    })
    .catch((err)=>console.log(err))
}