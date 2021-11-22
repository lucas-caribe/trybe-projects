db.voos
  .find(
    { ano: 2017, "empresa.nome": "GOL" },
    {
      _id: false,
      vooId: true,
      "empresa.nome": true,
      "aeroportoOrigem.nome": true,
      "aeroportoDestino.nome": true,
      mes: true,
      ano: true,
    },
  )
  .limit(10);
