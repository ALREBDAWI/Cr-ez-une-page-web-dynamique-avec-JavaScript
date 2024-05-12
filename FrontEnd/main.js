    


    
    

function isTokenInSessionStorage() {
    const token = sessionStorage.getItem('authToken');
    console.log(token)
    return token !== null && token !== undefined;
}

function updateButtonVisibility() {
    //update index after login variabels
    const loginBtn = document.getElementById('login-link');
    const filterBtn = document.getElementById('filter-btns');
    const openModal = document.getElementById('openPopupBtn');
    const body = document.querySelector('.body');
    const adminHeader = document.createElement('div');
    
    adminHeader.id = 'admin-header';

    if (isTokenInSessionStorage()) {

        loginBtn.innerHTML = '<li>logout</li>';
        loginBtn.id = 'logout-link';
        filterBtn.style.display = 'none';
        openModal.style.display = 'block';
        // admin header
        body.appendChild(adminHeader);
        adminHeader.style.display= 'block';
        
    } else {
        adminHeader.style.display = 'none';
        openModal.style.display = 'none';
    }
};

window.onload = function(){

// Call updateButtonVisibility initially to set button visibility
    updateButtonVisibility();
    getWorks()
    let data = []; 

    const logoutBtn = document.getElementById('logout-link');

    // Event listener for logout button click + Remove token from sessionStorage
        logoutBtn.addEventListener('click', () => {
            sessionStorage.clear();
            window.location.reload();
    });

     //modal variabels  
     const modal = document.getElementById("myModal");

     const btn = document.getElementById("openPopupBtn");
 
     const closeModal = document.getElementById("modal-close");
 

    //open the modal on click
    btn.onclick = function() {
    modal.style.display = "block";
    generateworksModal()
    }

    // When the user clicks on  (x), close the modal
    closeModal.onclick = function() {
    modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    }

    
}

//generate modal works
function generateworksModal() {
    console.log(data)
    const gallery = document.getElementById('modal-gallery');
    gallery.innerHTML=''; 
    data.forEach(work => {

        const portfolio = document.getElementById('modal-content');
        const figure = document.createElement('figure');
        const image = document.createElement('img');
        const figcaption = document.createElement('figcaption');
        const deleteBtn = document.createElement('button');

        portfolio.appendChild(gallery);
        gallery.appendChild(figure);
        figure.appendChild(image);
        figure.appendChild(figcaption);
        figure.appendChild(deleteBtn);

        deleteBtn.innerHTML = 'Delete'; // You can set any text you want for the delete button

        image.src = work.imageUrl;

        // Add event listener to the delete button
        deleteBtn.addEventListener('click', function() {
            // Send DELETE request to backend
            fetch(`http://localhost:5678/api/works/${work.id}`, { // Replace '/your-api-endpoint' with your actual endpoint
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('authToken') // Include token in Authorization header
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                
            })
            .then(data => {
                console.log('Work deleted successfully:', data);
                figure.remove();
            })
            .catch(error => {
                console.error('Error deleting work:', error);
            });
        });

    });
}


//get gallery works using fetch

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

