db.produtos.updateMany(
  { nome: { $not: /McChicken/ } },
  {
    $addToSet: { ingredientes: "ketchup" },
  },
);

db.produtos.find({}, { _id: false, nome: true, ingredientes: true });
