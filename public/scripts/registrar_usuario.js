const formulario = document.getElementById('formulario_register');


formulario.addEventListener('submit' , async (e) => {

    e.preventDefault()

    const formdata = new FormData(formulario)
    const data = Object.fromEntries(formdata.entries());




   const response = await fetch('/register' , {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },

        body : JSON.stringify(data)
    })
   const result = await response.json();

        // 2. Imprimimos el resultado AQUÍ ADENTRO
        console.log("Respuesta del servidor:", result);
        
    if(!response.ok){

        alert('Error : ' + result.error);
    

    }else{

        alert('Usuario registrado correctamente...')
        window.location.href = '/Login'

    }

});

