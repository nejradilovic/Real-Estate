const username = document.getElementById('username');
const password = document.getElementById('password');
const button = document.getElementById('prijavaButton');

button.addEventListener('click', function(event) {
    event.preventDefault();
    PoziviAjax.postLogin(username.value, password.value, function(error, data) {
        console.log('Pokušaj prijave sa korisničkim imenom:', username.value, 'i lozinkom:', password.value);
        if (error) {
            throw error;
        }
        window.location.href = '/nekretnine.html';
    });
});

