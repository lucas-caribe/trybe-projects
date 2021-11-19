const assert = require('assert');
const productDetails = require('../src/productDetails');

/*
  Dadas duas strings que representam nomes de produtos, retorne um array contendo dois objetos com os detalhes dos respectivos produtos.

  Parâmetros:
  - Uma string;
  - Uma string;

  Comportamento:
  productDetails('Alcool gel', 'Máscara') // Retorna:
  [
    {
      name: 'Alcool gel'
      details: {
        productId: 'Alcool gel123'
      }
    },
    {
      name: 'Máscara'
      details: {
        productId: 'Máscara123'
      }
    }
  ]

  OBS: Lembre-se que você não precisa se preocupar com o describe e o it por enquanto, isso será aprendido posteriormente.
*/

describe('6 - Implemente os casos de teste para a função `productDetails`', () => {
  it('Verifica se a função `productDetails` tem o comportamento esperado', () => {
    // ESCREVA SEUS TESTES ABAIXO:
    // Teste que o retorno da função é um array.
    const isArray = Array.isArray(productDetails('Alcool gel', 'Máscara'));
    assert.strictEqual(isArray, true);
    // Teste que o array retornado pela função contém dois itens dentro.
    const arrayLength = productDetails('aucongel', 'mascra').length;
    assert.strictEqual(arrayLength, 2);
    // Teste que os dois itens dentro do array retornado pela função são objetos.
    const [product1, product2] = productDetails('melancia', 'chocolate');
    assert.strictEqual(typeof product1, 'object');
    assert.strictEqual(typeof product2, 'object');
    // Teste que os dois objetos são diferentes entre si.
    assert.notDeepStrictEqual(product1, product2);
    // Teste que os dois productIds terminam com 123.
    const product1Id = product1.details.productId;
    const product2Id = product2.details.productId;
    assert.strictEqual(product1Id.endsWith('123'), true);
    assert.strictEqual(product2Id.endsWith('123'), true);
  });
});
