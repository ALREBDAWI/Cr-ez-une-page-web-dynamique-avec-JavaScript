
//get gallery works using fetch

let data = []; 
async function getWorks() {
    try {
        const responseWorks = await fetch("http://localhost:5678/api/works")
        .then(responseWorks => responseWorks.json());
        data = responseWorks;
        generateworks(responseWorks);
        getCategory(responseWorks)       
    } catch (error) {
        console.error('erreur', error);
        
    };
};
getWorks()

//display gallery works dynamically

async function generateworks(works){
   const gallery = document.querySelector('.gallery');
   gallery.innerHTML=' ' 
   works.forEach(work =>{
 
    const portfolio = document.getElementById('portfolio');
    const figure = document.createElement('figure');
    const image = document.createElement('img');
    const figcaption = document.createElement('figcaption');
    portfolio.appendChild(gallery);
    gallery.appendChild(figure);
    figure.appendChild(image);
    figure.appendChild(figcaption);
    image.src=work.imageUrl;
    figcaption.innerText=work.title; 
    
});
};

async function getCategory(works){
    try {
        const responseCategory = await fetch("http://localhost:5678/api/categories")
        .then(responseCategory => responseCategory.json());
        console.log(responseCategory);
        categoryFilter(works,responseCategory)
    } catch (error) {
        console.error('erreur', error);
        
    };
};
    
//addidng gallery works filtering dynamic buttons

function categoryFilter(works,categories){
    const filters = document.getElementById('filter-btns');
    filters.innerHTML=' '
    const btns = document.createElement('button')
    btns.textContent=('Tous')
    btns.addEventListener('click', ()=>{
       generateworks(works)
    });
    filters.appendChild(btns)
    categories.forEach(category =>{
        const btn = document.createElement('button')
        btn.textContent=category.name
        btn.onclick=() => {
             worksFilter(category.name,works)
        }
        filters.appendChild(btn)
    })
};
function worksFilter(categoryname,works){
    const filterdWorks = works.filter(work => work.category.name === categoryname)
    generateworks(filterdWorks)
   
};




 