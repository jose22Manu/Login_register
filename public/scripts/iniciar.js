const form_incio = document.getElementById('formularioInicio');





form_incio.addEventListener('submit' , async (e) => {

    e.preventDefault();

    const formdata = new FormData(form_incio);
    const data = Object.fromEntries(formdata.entries());



    const response = await fetch('/Login' , {
        method : "POST",
        headers : {
            'Content-Type' : 'application/json'
        },

        body: JSON.stringify(data)
    })

    const result = await response.json();


    if(!response.ok){
        alert('Error: ' + (result.error || 'Credenciales inválidas'));

    }else{
        localStorage.setItem('token' , result.token);
        alert('Bienvenido');
        window.location.href = '/main';
        
    }

})