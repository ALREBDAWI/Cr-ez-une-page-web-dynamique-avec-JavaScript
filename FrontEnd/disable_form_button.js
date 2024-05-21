document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('workForm');
    const submitBtn = document.getElementById('btn-post');

    // Function to check if all required fields are filled
    function checkFormValidity() {
        submitBtn.disabled = !form.checkValidity();
    }

    // Add event listeners to input fields to check form validity on input
    form.addEventListener('input', checkFormValidity);

    // Initial check in case the fields are pre-filled by the browser
    checkFormValidity();
});



