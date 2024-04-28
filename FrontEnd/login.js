// loging 
    
document.addEventListener('DOMContentLoaded',()=>{
const btnLoging = document.querySelector('form');

btnLoging.addEventListener('submit', (event)=>{
    event.preventDefault()
    const email = document.getElementById("email-login").value;
    const password = document.getElementById("pass-login").value;
    console.log(JSON.stringify({email, password}))

    try {
    fetch('http://localhost:5678/api/users/login',{
        method: 'POST',
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({email, password})

    })
    .then(response=>{
        if(!response.ok){
            document.getElementById('login-error').innerHTML='<p>Email ou mot de passe incorrect!</p>';    
        }
        return response.json()
    })
    .then(data=>{
        console.log(data);
        const token = data.token;
        sessionStorage.setItem('authToken',token)
        window.location.href='./index.html';
    })
        
    } catch (error) {
        console.log('il ya un probleme' , error)
    };
});
});