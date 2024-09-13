let SpisakNekretnina = function () {
    //privatni atributi modula
    let listaNekretnina = [];
    let listaKorisnika = [];


    //implementacija metoda
    let init = function (listaNekretnine, listaKorisnike) {
        // dodajte kod
        listaNekretnina=listaNekretnine;
        listaKorisnika=listaKorisnike;
    }

    let filtrirajNekretnine = function (kriterij) {
        // dodajte kod
        return listaNekretnina.filter(nekretnina=>{
            if(kriterij.tip_nekretnine && nekretnina.tip_nekretnine!==kriterij.tip_nekretnine)
                return false;
            if(kriterij.min_kvadratura && nekretnina.kvadratura < kriterij.min_kvadratura)
                return false;
            if(kriterij.max_kvadratura && nekretnina.kvadratura > kriterij.max_kvadratura)
                return false;
            if(kriterij.min_cijena && nekretnina.cijena < kriterij.min_cijena)
                return false;
            if(kriterij.max_cijena && nekretnina.cijena > kriterij.max_cijena)
                return false;
            return true;
        });
    };

    let ucitajDetaljeNekretnine = function (id) {
        // dodajte kod
        const nekretnina = listaNekretnina.find(nekretnina=>nekretnina.id===id);
        
        if(nekretnina===null) return null;
        
        return nekretnina;
    }


    return {
        init: init,
        filtrirajNekretnine: filtrirajNekretnine,
        ucitajDetaljeNekretnine: ucitajDetaljeNekretnine
    }
    
};
