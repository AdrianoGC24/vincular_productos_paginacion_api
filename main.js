// main.js
import {api} from './api.js'

const cardContainer = document.getElementById('card-container')
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let totalPages = 0
let items = 12
let nowPage = 1

async function productosEcommerce(page) {

    const data = await api.obtenerProductos(page, items)
    const products = data.products

    cardContainer.innerHTML = ''
    
    for(let product of products){
        cardContainer.innerHTML += `
        <article class="bg-white rounded-2xl shadow-md overflow-hidden hover:scale-105 transition">
            <img 
            src=${product.thumbnail}
            alt="producto"
            class="w-full h-52 object-cover"
            >
            <div class="p-5 flex flex-col gap-3">
                <h2 class="text-2xl font-bold">
                    ${product.title}
                </h2>
                <p class="text-gray-600">
                    ${product.description}
                </p>
                <span class="flex justify-center text-2xl font-bold text-green-600">
                    ${product.price}
                </span>
                <button class="bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition">
                    Comprar
                </button>
            </div>
        </article>`
    }
    
    totalPages = Math.ceil(data.total / items)
    prevBtn.disabled = nowPage === 1;
    nextBtn.disabled = nowPage === totalPages;
}

prevBtn.addEventListener('click', ()=>{
    if(nowPage > 1){
        nowPage--;
        productosEcommerce(nowPage)
    }
})

nextBtn.addEventListener('click', ()=>{
    if(nowPage < totalPages){
        nowPage++;
        productosEcommerce(nowPage)
    }
})

productosEcommerce(nowPage);