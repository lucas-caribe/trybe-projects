db.voos.deleteMany({
  "empresa.nome": "AZUL",
  litrosCombustivel: { $exists: true, $lt: 400 },
});
