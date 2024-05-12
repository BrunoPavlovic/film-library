PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS Tip_korisnika (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  naziv VARCHAR(45) NOT NULL,
  opis TEXT NULL
);


CREATE UNIQUE INDEX naziv_UNIQUE on Tip_korisnika(naziv);

INSERT INTO Tip_korisnika VALUES(1,'registrirani korisnik',NULL);
INSERT INTO Tip_korisnika VALUES(2,'administrator',NULL);

SELECT * FROM Tip_korisnika;


CREATE TABLE IF NOT EXISTS Korisnik (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  korime VARCHAR(20) NOT NULL,
  lozinka TEXT NOT NULL,
  email VARCHAR(100) NOT NULL,
  ime VARCHAR(50) NULL,
  prezime VARCHAR(50) NULL,
  adresa TEXT NULL,
  datum_rođenja DATE NOT NULL,
  aktivan VARCHAR(2) NOT NULL DEFAULT 'da',
  prijava VARCHAR(2) NOT NULL DEFAULT 'ne',
  TOTP TEXT NULL,
  aktivacijskiKod VARCHAR(100) NULL,
  Tip_korisnika_id INTEGER NOT NULL,
  FOREIGN KEY (Tip_korisnika_id) REFERENCES Tip_korisnika(id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE INDEX fk_Korisnik_Tip_korisnika_idx ON Korisnik(Tip_korisnika_id);
CREATE UNIQUE INDEX email_UNIQUE on Korisnik(email ASC);
CREATE UNIQUE INDEX korime_UNIQUE on Korisnik(korime ASC);

INSERT INTO `Korisnik` (`id`, `korime`, `lozinka`, `email`, `ime`, `prezime`, `adresa`, `datum_rođenja`, `aktivan`, `TOTP`, `aktivacijskiKod`, `Tip_korisnika_id`) VALUES
(1, 'obican', '2317c5cc4e67b0cb5f55b26fdcf5fe0a24012503ae99d22b26f3c866d281be2b', 'sunavata@teleg.eu', 'Obican', 'Korisnik', NULL, '2000-03-03', 'da', 'ARAATAIJAAAATAAIAIAATBAIBEAAOAAEAACAAAAHAACAAAAABAAACAIAAMAAAAIAA5ERGBRAAEAARBAFBAARMBRJBADAAAIAARDRAAA', '19887', 1),
(2, 'administrator', '2317c5cc4e67b0cb5f55b26fdcf5fe0a24012503ae99d22b26f3c866d281be2b', 'lafifa6849@sopulit.com', '', '', NULL, '2001-11-23', 'da', 'A5ARTAREBAAAAAZAARAAIARFAEAACAADAAEAAAAAAAAAOAAJAIBRGAAFAAERIAZFAADRGAAAAEAAMAAIA5AAACIBARAAAAAAAABAAAR', '12878', 2);

INSERT INTO 'Korisnik' (`korime`, `lozinka`, `email`, `ime`, `prezime`, `datum_rođenja`, `aktivacijskiKod`, `Tip_korisnika_id`) VALUES 
('proba', '2317c5cc4e67b0cb5f55b26fdcf5fe0a24012503ae99d22b26f3c866d281be2b', 'sad@sopulit.com', 'PP', 'ROba', '2001-11-23', '12555', 2);


SELECT * FROM Korisnik;



CREATE TABLE IF NOT EXISTS Žanr(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  naziv VARCHAR(45) NOT NULL UNIQUE,
  tmdb INTEGER NULL
);


INSERT INTO Žanr VALUES
(1, 'Action',28),
(2, 'Adventure',12),
(3, 'Animation',16);/*
(4, 'Comedy'),
(5, 'Crime'),
(6, 'Documentary'),
(7, 'Drama'),
(8, 'Family'),
(9, 'Fantasy'),
(10, 'History'),
(11, 'Horror'),
(12, 'Music'),
(13, 'Mystery'),
(14, 'Romance'),
(15, 'Science Fiction'),
(16, 'Thriller'),
(17, 'TV Movie'),
(18, 'War'),
(19, 'Western');*/

SELECT * FROM Žanr;



CREATE TABLE IF NOT EXISTS Film(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tmbd_id INTEGER NOT NULL,
  naziv VARCHAR(50) NOT NULL,
  originalni_naslov VARCHAR(50) NULL,
  datum_objave DATE NULL,
  datum_dodavanja DATE NULL,
  jezik VARCHAR(45) NOT NULL,
  ocjena_filma FLOAT NULL,
  opis TEXT NULL,
  dobna_granica INTEGER NULL,
  dužina_trajanja INTEGER NULL,
  status VARCHAR(45) NULL
);

SELECT * FROM Film;

CREATE TABLE IF NOT EXISTS korisnik_filmovi(
  Korisnik_id INTEGER NOT NULL,
  Filmovi_id INTEGER NOT NULL,
  PRIMARY KEY (Korisnik_id, Filmovi_id),
  FOREIGN KEY (Korisnik_id) REFERENCES Korisnik(id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  FOREIGN KEY (Filmovi_id) REFERENCES Film(id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

CREATE INDEX `fk_Korisnik_has_Filmovi_Filmovi1_idx` ON korisnik_filmovi(Filmovi_id);
CREATE INDEX `fk_Korisnik_has_Filmovi_Korisnik1_idx` ON korisnik_filmovi(Korisnik_id);



CREATE TABLE IF NOT EXISTS žanr_filmovi(
  Žanr_id INTEGER NOT NULL,
  Filmovi_id INTEGER NOT NULL,
  PRIMARY KEY (Žanr_id, Filmovi_id),
  FOREIGN KEY (Žanr_id) REFERENCES Žanr(id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  FOREIGN KEY (Filmovi_id) REFERENCES Film(id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

CREATE INDEX `fk_Žanr_has_Filmovi_Filmovi1_idx` ON žanr_filmovi(Filmovi_id);
CREATE INDEX `fk_Žanr_has_Filmovi_Žanr1_idx` ON žanr_filmovi(Žanr_id);

INSERT INTO žanr_filmovi VALUES (2,2);
SELECT * FROM žanr_filmovi;