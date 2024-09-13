const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/prijava.html', function(req, res) {
    res.sendFile(__dirname + '/public/html/prijava.html')
});
app.get('/profil.html', function(req, res) {
    res.sendFile(__dirname + '/public/html/profil.html')
});
app.get('/nekretnine.html', function(req, res) {
    res.sendFile(__dirname + '/public/html/nekretnine.html')
});
app.get('/detalji.html', function(req, res) {
    res.sendFile(__dirname + '/public/html/detalji.html')
});
app.get('/meni.html', function(req, res) {
    res.sendFile(__dirname + '/public/html/meni.html')
});

app.use(session({
    secret: 'neka tajna sifra',
    resave: true,
    saveUninitialized: true
 }));

app.post('/login', function(req, res){
    const { username, password } = req.body;
    fs.readFile('data/korisnici.json', 'utf8', async(err, data) =>{
        try{
            const korisnici = JSON.parse(data);
            let postojiKorisnik = korisnici.find(korisnik => korisnik.username === username);
            let tacnaLozinka = false
            if(postojiKorisnik){
                tacnaLozinka = await bcrypt.compare(password, postojiKorisnik.password);
            }
            if(tacnaLozinka){
                req.session.username = postojiKorisnik.username;
                res.status(200).json({poruka: 'Uspješna prijava'});
            }
            else {
                res.status(401).json({ greska: 'Neuspješna prijava' }); 
            }
        }
        catch(error){
            console.error('Greška prilikom čitanja datoteke:', error);
        }
    })
});

app.post('/logout', function(req, res){
    if(req.session.username){
        req.session.destroy((err) => {
            if(!err) {
                res.status(200).json({ poruka: 'Uspješno ste se odjavili' });
            }
        });
    }
    else {
        res.status(401).json({ greska: 'Neautorizovan pristup' });
    }
});

app.get('/korisnik', function(req, res){
    if(req.session.username) {
        fs.readFile('data/korisnici.json', 'utf8', async(err, data) =>{
            try{
                const korisnici = JSON.parse(data);
                const logovaniKorisnik = korisnici.find(korisnik => korisnik.username === req.session.username)
                if(logovaniKorisnik){
                    res.status(200).json(logovaniKorisnik);
                }
            }
            catch(error){
                console.error('Greška prilikom čitanja datoteke:', error);
            }
        })
    }
    else {
        res.status(401).json({ greska: 'Neautorizovan pristup'}); 
    } 
});

app.put('/korisnik', function(req, res) {
    const { ime, prezime, username, password } = req.body;

    /*req.session.korisnik = {
        id: 1,
        ime: "Neko",
        prezime: "Nekic",
        username: "username1",
        password: "hashPassworda1"
    }*/

    if(req.session && req.session.korisnik){
        fs.readFile('data/korisnici.json', 'utf8', async(err, data) =>{
            try{
                const korisnici = JSON.parse(data);
                const pronadjenKorisnik = korisnici.findIndex(korisnik => korisnik.username === req.session.korisnik.username);
                if (pronadjenKorisnik !== -1) {
                    if (password) {
                        const hash = await bcrypt.hash(password, 10);
                        korisnici[pronadjenKorisnik].password = hash;
                    }
                    if (ime) korisnici[pronadjenKorisnik].ime = ime;
                    if (prezime) korisnici[pronadjenKorisnik].prezime = prezime;
                    if (username) korisnici[pronadjenKorisnik].username = username;
                   
                    fs.writeFile('./data/korisnici.json', JSON.stringify(korisnici, null, 2), function(error) {
                        if (error) {
                            console.error('Greška prilikom pisanja datoteke:', error);
                        }
                        res.status(200).json({ poruka: 'Podaci su uspješno ažurirani' });
                    });
                }
                else {
                    res.status(401).json({ greska: 'Neautorizovan pristup' });
                }
            }
            catch(error){
                console.error('Greška prilikom čitanja datoteke:', error);
            }
        })     
    }
});

app.post('/upit', function(req, res) {
    const { nekretnina_id, tekst_upita } = req.body;
    if(req.session && req.session.korisnik){
        const korisnikId = req.session.korisnik.id;
        fs.readFile('data/korisnici.json', 'utf8', async(err, data) =>{
            try{
                const korisnici = JSON.parse(data);
                const pronadjenKorisnik = korisnici.find(korisnik => korisnik.id === korisnikId);

                if(!pronadjenKorisnik){
                    res.status(401).json({greska: 'Neautorizovan pristup'});
                    return;
                }
                fs.readFile('data/nekretnine.json', 'utf8', async(err, data) =>{
                    try{
                        const nekretnine = JSON.parse(data);
                        const pronadjenaNekretnina = nekretnine.find(nekretnina => nekretnina.id === nekretnina_id);
                
                        if(!pronadjenaNekretnina){
                            res.status(400).json({greska: 'Nekretnina sa id-em ${nekretnina_id} ne postoji'});
                            return;
                        } 
                        const upit = {
                            korisnik_id: korisnikId,
                            tekst_upita: tekst_upita
                        };
                        if(!pronadjenaNekretnina.upiti){
                            pronadjenaNekretnina.upiti = [];
                        }
                        pronadjenaNekretnina.upiti.push(upit);
                        fs.writeFile('data/nekretnine.json', JSON.stringify(nekretnine, null, 2), (err) => {
                            if (err) {
                                console.error('Greška prilikom upisa datoteke nekretnina:', err);
                            } else {
                                res.status(200).json({ poruka: 'Upit je uspješno dodan' });
                            }
                        });
                    }
                    catch(error){
                        console.error('Greška prilikom čitanja datoteke:', error);
                    }
                })
            }
            catch(error){
                console.error('Greška prilikom čitanja datoteke:', error);
            }
        })
    }
    else {
        res.status(401).json({ greska: 'Neautorizovan pristup' });
    }
});

app.get('/nekretnine', function(req, res){
    fs.readFile('data/nekretnine.json', 'utf8', async(err, data) =>{
        try{
            const nekretnine = JSON.parse(data);
            res.status(200).json(nekretnine);
        }
        catch(error){
            console.error('Greška prilikom čitanja datoteke:', error);
        }
    })
});

app.listen(port, () => {
  console.log(`Server radi na http://localhost:${port}`);
});
