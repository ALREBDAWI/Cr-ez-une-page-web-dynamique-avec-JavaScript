// this function updates the site to admin mode
function isTokenInSessionStorage() {
    const token = sessionStorage.getItem('authToken');
    console.log(token)
    return token !== null && token !== undefined;
}

function updateButtonVisibility() {
    //variabels of update index after login 
    const loginBtn = document.getElementById('login-link');
    const filterBtn = document.getElementById('filter-btns');
    const openModal = document.getElementById('openPopupBtn');
    const body = document.querySelector('.body');
    const adminHeader = document.createElement('div');
    adminHeader.id = 'admin-header';
    adminHeader.innerHTML = '  <p><i class="fa-regular fa-pen-to-square id="admin-header-symbol"></i>  Mode édition</p>';
    if (isTokenInSessionStorage()) {

        loginBtn.innerHTML = '<li>logout</li>';
        loginBtn.id = 'logout-link';
        filterBtn.style.display = 'none';
        openModal.style.display = 'block';
        // admin header
        body.appendChild(adminHeader);
        adminHeader.style.display= 'flex';
        
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

    // Event listener for logout button click  (Remove token from sessionStorage)
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
    modal.style.display = "flex";
    generateworksModal()
    
    }
    
 

    // When the user clicks on  (x) close the modal
    closeModal.onclick = function() {
    modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    }
    

    previewImage()
    postNewWork()
}

// add work logique

function addWork(){
    const gallery = document.getElementById("delete-works-modal");
    const addWorkContent = document.getElementById("addWorkContent");
    const goBack = document.getElementById("goBack")
    const openAddWork = document.getElementById("openAddWork")
    const modalTitle = document.getElementById('modal-title');
    const line = document.getElementById('hr-delete');
    
    line.display='none';
    modalTitle.innerText='Ajout photo';
    openAddWork.style.display = "none";
    gallery.style.display = "none";
    addWorkContent.style.display = "flex";
    goBack.style.display = "block";
    
    getCatForAdmin()

}

function goBack(){

    const modalTitle = document.getElementById('modal-title');
    const gallery = document.getElementById("delete-works-modal");
    const addWorkContent = document.getElementById("addWorkContent");
    const goBack = document.getElementById("goBack")
    const openAddWork = document.getElementById("openAddWork")

    modalTitle.innerText = 'Galerie photo';
    openAddWork.style.display = "flex";
    gallery.style.display = "flex";
    addWorkContent.style.display = "none";
    goBack.style.display = "none";
}

function previewImage(){
    const imgArea = document.querySelector('.img-area');
    const inputFile = document.querySelector('#image');
    
    imgArea.addEventListener('click', function () {
        inputFile.click();
    });
    
    inputFile.addEventListener('change', function () {
        const image = this.files[0];
        if (image.size < 4000000) {
            const reader = new FileReader();
            reader.onload = ()=> {
                const img = document.createElement('img');
                img.src = reader.result;
                
                // Remove existing images
                imgArea.innerHTML = '';
                
                // Append the new image
                imgArea.appendChild(img);
                imgArea.classList.add('active');
                imgArea.dataset.img = image.name;
            };
            reader.readAsDataURL(image);
        } else {
            alert("Taille de l'image supérieure à 4 Mo");
        }
    });
}

function postNewWork(){
    document.getElementById('workForm').addEventListener('submit', function(event) {
        event.preventDefault();
    
        // Retrieve token from session storage
        const token = sessionStorage.getItem('authToken');
    
        // Collect form data
        const formData = new FormData(this);
    
        // Send form data to backend using fetch
        fetch('http://localhost:5678/api/works/', {
            method: 'POST',
            body: formData,
            headers: {
            'Authorization': 'Bearer ' + token // Include token in Authorization header
            }
        })
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Work posted successfully:', data);
            window.location.reload()
        })
        .catch(error => {
            console.error('Error posting work:', error);
        });
        });
}


async function getCatForAdmin(){    //having catigories list for addwork modal dynamically

        try {
            const responseCategory = await fetch("http://localhost:5678/api/categories")
                .then(responseCategory => responseCategory.json());
            
            // Select the <select> element by its id

            const selectElement = document.getElementById('category');
            selectElement.innerText = ''; //to not repeat categories every time we click
            // Loop through the categories and create an <option> element for each
            responseCategory.forEach(category => {
                const optionElement = document.createElement('option');
                optionElement.value = category.id; // Set the value attribute
                optionElement.textContent = category.name; // Set the text content
                selectElement.appendChild(optionElement); // Append the option to the select element
            });
        } catch (error) {
            console.error('erreur', error);
        };
    
}
//generate modal works
function generateworksModal() {
    console.log(data)
    
    const modalContent = document.getElementById('modal-content');
    const deleteWorkModalContent = document.getElementById('delete-works-modal');
    const gallery = document.getElementById('modal-gallery');
    
     
    
    const btnModal = document.getElementById('openAddWork');
    
    btnModal.addEventListener('click', function(){
        addWork()
        
    }) ;
   
    
    // modalContent.innerHTML=' ';
    gallery.innerHTML=' '; //no repetition on many clicks
    
    data.forEach(work => {
        
        
        const figure = document.createElement('figure');
        const image = document.createElement('img');
        const figcaption = document.createElement('figcaption');
        const deleteBtnContainer = document.createElement('div'); // Changed from button to div
        

        deleteWorkModalContent.appendChild(gallery);
        gallery.appendChild(figure);
        
        figure.appendChild(deleteBtnContainer); // Appending delete button container before image
        figure.appendChild(image);
        figure.appendChild(figcaption);
        modalContent.append(btnModal);
        
        

        deleteBtnContainer.innerHTML = '<i class="fas fa-trash-alt"></i>'; // Using Font Awesome trash icon

        image.src = work.imageUrl;

        // Add event listener to the delete button container
        deleteBtnContainer.addEventListener('click', function() {
            // Send DELETE request to backend
            fetch(`http://localhost:5678/api/works/${work.id}`, { 
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
