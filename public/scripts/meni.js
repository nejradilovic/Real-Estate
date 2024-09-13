const profil = document.getElementById("profil");
const prijava = document.getElementById("prijava");

profil.style.display= 'none';
prijava.addEventListener('click', callLogout);
PoziviAjax.getKorisnik(check);

function callLogout() {
    if (prijava.innerHTML === "Odjava") {
        PoziviAjax.postLogout(logout);
    }
}
function logout(error,data){
    if(error){
        throw error;
    }
}
function check(error,data){
    prijava.innerHTML = data ? "Odjava" : "Prijava";
    profil.style.display = data ? '' : 'none';
}