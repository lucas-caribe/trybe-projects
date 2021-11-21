db.voos.findOne(
  { vooId: 756807 },
  {
    _id: false,
    "empresa.sigla": true,
    "empresa.nome": true,
    passageiros: true,
  },
);
