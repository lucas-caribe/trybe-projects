const LATAM = "LATAM AIRLINES BRASIL";

db.resumoVoos.insertOne({
  empresa: LATAM,
  totalVoosDomesticos: db.voos
    .find({
      natureza: "Doméstica",
      "empresa.nome": LATAM, 
    })
    .count(),
});

db.resumoVoos.find(
  { empresa: LATAM },
  { _id: false, empresa: true, totalVoosDomesticos: true },
);
