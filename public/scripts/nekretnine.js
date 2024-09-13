function spojiNekretnine(divReferenca, instancaModula, tip_nekretnine) {
    // pozivanje metode za filtriranje
    const filtriraneNekretnine = instancaModula.filtrirajNekretnine({ tip_nekretnine: tip_nekretnine });
    
    // iscrtavanje elemenata u divReferenca element
    let dinamicno="";
    
    if(tip_nekretnine === "Stan"){
        dinamicno += "<h3>Stan</h3>";
        dinamicno += "<div class='kontejner'>";
        for(const nekretnina of filtriraneNekretnine){
            dinamicno += "<div class='grid-item-stan'>";
            dinamicno +="<img src='https://cdn.mos.cms.futurecdn.net/YvyuSURLH57RukNUCrzeeL.jpg' alt='Stan' />";
            dinamicno += "<p class='informacije'><strong>Naziv: </strong>" + nekretnina.naziv + "</p>";
            dinamicno += "<p class='informacije'><strong>Kvadratura: </strong>" + nekretnina.kvadratura + "</p>";
            dinamicno += "<p class='cijena'><strong>Cijena: </strong>" + nekretnina.cijena + "</p>";
            dinamicno += "<button type='button' class='button'>Detalji</button>";
            dinamicno += "</div>";
            dinamicno += "</div>";
        }
        
    }
    else if(tip_nekretnine === "Kuća"){
        dinamicno += "<h3>Kuća</h3>";
        for(const nekretnina of filtriraneNekretnine){
            dinamicno += "<div class='kontejner'>";
            dinamicno += "<div class='grid-item-kuca'>";
            dinamicno +="<img src='https://www.officeevolution.com/wp-content/uploads/2022/05/CO-Metro-North-Northglenn-27.jpg' alt='Poslovni prostor' />";
            dinamicno += "<p class='informacije'><strong>Naziv: </strong>" + nekretnina.naziv + "</p>";
            dinamicno += "<p class='informacije'><strong>Kvadratura: </strong>" + nekretnina.kvadratura + "</p>";
            dinamicno += "<p class='cijena'><strong>Cijena: </strong>" + nekretnina.cijena + "</p>";
            dinamicno += "<button type='button' class='button'>Detalji</button>";
            dinamicno += "</div>";
            dinamicno += "</div>";
        }
    }
    else if(tip_nekretnine === "Poslovni prostor"){
        dinamicno += "<h3>Poslovni prostor</h3>";
        for(const nekretnina of filtriraneNekretnine){
            dinamicno += "<div class='kontejner'>";
            dinamicno += "<div class='grid-item-pp'>";
            dinamicno +="<img src='https://www.officeevolution.com/wp-content/uploads/2022/05/CO-Metro-North-Northglenn-27.jpg' alt='Poslovni prostor' />";
            dinamicno += "<p class='informacije'><strong>Naziv: </strong>" + nekretnina.naziv + "</p>";
            dinamicno += "<p class='informacije'><strong>Kvadratura: </strong>" + nekretnina.kvadratura + "</p>";
            dinamicno += "<p class='cijena'><strong>Cijena: </strong>" + nekretnina.cijena + "</p>";
            dinamicno += "<button type='button' class='button'>Detalji</button>";
            dinamicno += "</div>";
            dinamicno += "</div>";
        }
        
    }

    divReferenca.innerHTML = dinamicno;
}

const divStan = document.getElementById("stan");
const divKuca = document.getElementById("kuca");
const divPp = document.getElementById("pp");



const listaNekretnina = [{
    id: 1,
    tip_nekretnine: "Stan",
    naziv: "Useljiv stan Sarajevo",
    kvadratura: 58,
    cijena: 232000,
    tip_grijanja: "plin",
    lokacija: "Novo Sarajevo",
    godina_izgradnje: 2019,
    datum_objave: "01.10.2023.",
    opis: "Sociis natoque penatibus.",
    upiti: [{
        korisnik_id: 1,
        tekst_upita: "Nullam eu pede mollis pretium."
    },
    {
        korisnik_id: 2,
        tekst_upita: "Phasellus viverra nulla."
    }]
},

{
    id: 2,
    tip_nekretnine: "Poslovni prostor",
    naziv: "Mali poslovni prostor",
    kvadratura: 20,
    cijena: 70000,
    tip_grijanja: "struja",
    lokacija: "Centar",
    godina_izgradnje: 2005,
    datum_objave: "20.08.2023.",
    opis: "Magnis dis parturient montes.",
    upiti: [{
        korisnik_id: 2,
        tekst_upita: "Integer tincidunt."
    }
    ]
},
{
    id: 3,
    tip_nekretnine: "Kuća",
    naziv: "Useljiva Kuća Sarajevo",
    kvadratura: 78,
    cijena: 332000,
    tip_grijanja: "plin",
    lokacija: "Novo Sarajevo",
    godina_izgradnje: 2019,
    datum_objave: "01.10.2023.",
    opis: "Sociis natoque penatibus.",
    upiti: [{
        korisnik_id: 1,
        tekst_upita: "Nullam eu pede mollis pretium."
    },
    {
        korisnik_id: 2,
        tekst_upita: "Phasellus viverra nulla."
    }]
},
]


PoziviAjax.getNekretnine(function(error, data) {
    if(error){
        throw error;
    }
    //instanciranje modula
    let nekretnine = SpisakNekretnina();
    nekretnine.init(data, null);

    //pozivanje funkcije
    spojiNekretnine(divStan, nekretnine, "Stan");
    spojiNekretnine(divKuca, nekretnine, "Kuća");
    spojiNekretnine(divPp, nekretnine, "Poslovni prostor");
})

const listaKorisnika = [{
    id: 1,
    ime: "Neko",
    prezime: "Nekic",
    username: "username1",
},
{
    id: 2,
    ime: "Neko2",
    prezime: "Nekic2",
    username: "username2",
}]

