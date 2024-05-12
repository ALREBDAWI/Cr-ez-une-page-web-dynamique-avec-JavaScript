


/*function isTokenInSessionStorage() {
    const token = sessionStorage.getItem('authToken');
    return token !== null && token !== undefined;
}

function updateButtonVisibility() {
    const loginBtn = document.getElementById('login-link');
    const logoutBtn = document.getElementById('logout-link');

    if (isTokenInSessionStorage()) {
        loginBtn.style.display = 'none';
        logoutBtn.style.display = 'block';
        document.getElementById('filter-btns').style.display = 'none';
    } else {
        loginBtn.style.display = 'block';
        logoutBtn.style.display = 'none';
        document.getElementById('modify').style.display = 'none';
    }
}

// Call updateButtonVisibility initially to set button visibility
window.onload=function (){
    updateButtonVisibility();
    getWorks();
    const allWorksFetch = [];

}


// Event listener for logout button click
document.getElementById('logout-link').addEventListener('click', () => {
    // Remove token from sessionStorage
    sessionStorage.removeItem('authToken');
    // Update button visibility
    updateButtonVisibility();
});




