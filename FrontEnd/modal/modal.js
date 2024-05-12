    
    

    
    
    
    /*const loginBtn = document.getElementById('login-link');
    const btnmodify = document.getElementById("modify");
    const btnFilter = document.getElementById('filter-btns');
// display logout link when admin login
function isTokenInSessionStorage() {
    const token = sessionStorage.getItem('authToken');
    return token !== null && token !== undefined;
}

function updateButtonVisibility() {
   
     
    if (isTokenInSessionStorage()) {
        loginBtn.textContent = 'logout';
        btnFilter.style.display = "none";
        btnmodify.style.display = 'block';

        loginBtn.addEventListener('click', () => {
            // Remove token from sessionStorage
            sessionStorage.clear();
            window.location.reload();
            });
    } else {
        loginBtn.style.display = 'block';
        btnmodify.style.display = 'none';
    }
}

window.onload = function(){
// Call updateButtonVisibility initially to set button visibility
    updateButtonVisibility();
    // Event listener for logout button click
    getworks();
     
    // Get the modal
    const modal = document.getElementById("popup");

    // Get the button that opens the modal

    // Get the <span> element that closes the modal
    const closeModal = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    btnmodify.onclick = function() {
    modal.style.display = "block";
    generateworksModal()
    generateworks(works,'.modal-portfolio');

    }

    // When the user clicks on <span> (x), close the modal
    closeModal.onclick = function() {
    modal.style.display = "none";
    }

}


function generateworksModal() {
    console.log(data)
    const gallery = document.querySelector('.popup-content');
    gallery.innerHTML = ' ' 
    data.forEach(work => {

        const portfolio = document.querySelector('.modal-portfolio');
        const figure = document.createElement('figure');
        const image = document.createElement('img');
        const figcaption = document.createElement('figcaption');
        const deleteBtn = document.createElement('button');

        gallery.appendChild(portfolio);
        portfolio.appendChild(figure);
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

// Function to close the popup
function closePopup() {
    popup.style.display = 'none';
}
