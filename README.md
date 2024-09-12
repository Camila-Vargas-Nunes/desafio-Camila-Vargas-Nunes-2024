# Projeto de Alocação de Animais em Zoológico

Este projeto implementa um sistema de alocação de animais em recintos de zoológico, considerando várias regras e restrições.

## Visão Geral
O sistema é projetado para ajudar na gestão de um zoológico, permitindo a alocação eficiente de animais em recintos apropriados. Ele leva em consideração fatores como o bioma necessário para cada espécie, o espaço disponível nos recintos e as interações entre diferentes espécies de animais.

#### INSTALANDO E RODANDO NA SUA MÁQUINA

* Instalar o [Node](https://nodejs.org/en/)
* Instalar dependencias do projeto com o seguinte comando:
```js
npm install
```

## Funcionalidades
- Verificação de compatibilidade de biomas
- Cálculo de espaço disponível em recintos
- Consideração de regras especiais para animais carnívoros
- Lógica especial para alocação de macacos (que não devem ficar sozinhos)
- Identificação de recintos viáveis para diferentes espécies e quantidades de animais

## Estrutura do Projeto
O projeto consiste em sua classe principal:

- RecintosZoo: Gerencia a lógica de alocação de animais.

### Como Usar

 1 - Instancie a classe RecintosZoo:
```js

  const zoo = new RecintosZoo();

```
 2 - Use o método analisaRecintos para encontrar recintos viáveis para um animal:
```js
const resultado = zoo.analisaRecintos('MACACO', 2);
console.log(resultado.recintosViaveis);

```

### Testes

O projeto inclui testes unitários para verificar o funcionamento correto da lógica de alocação. Os testes são implementados usando o framework Jest.

### Executando os Testes
Para executar os testes, utilize o seguinte comando:
```js
npm test
```
### Cenários de Teste

Os testes cobrem os seguintes cenários:

1) Rejeição de animal inválido: Verifica se o sistema rejeita corretamente a tentativa de alocar um animal que não existe no zoológico.
2) Rejeição de quantidade inválida: Testa se o sistema rejeita a tentativa de alocar uma quantidade inválida (zero ou negativa) de animais.
3) Não encontrar recintos para muitos animais: Verifica se o sistema informa corretamente quando não há recintos disponíveis para uma grande quantidade de animais (ex: 10 macacos).
4) Alocação de um animal específico: Testa se o sistema encontra o recinto correto para um animal específico (ex: 1 crocodilo).
5) Alocação de macacos: Verifica se o sistema encontra os recintos corretos para 2 macacos, considerando as regras especiais para essa espécie.


### EXEMPLOS

Aqui está um exemplo de um dos testes implementados:


```js
test('Deve encontrar recintos para 2 macacos', () => {
    const resultado = new RecintosZoo().analisaRecintos('MACACO', 2);
    expect(resultado.erro).toBeFalsy();
    expect(resultado.recintosViaveis[0]).toBe('Recinto 1 (espaço livre: 5 total: 10)');
    expect(resultado.recintosViaveis[1]).toBe('Recinto 2 (espaço livre: 3 total: 5)');
    expect(resultado.recintosViaveis[2]).toBe('Recinto 3 (espaço livre: 2 total: 7)');
    expect(resultado.recintosViaveis.length).toBe(3);
});
```
Este teste verifica se o sistema é capaz de encontrar os recintos corretos para alocar 2 macacos, considerando as regras específicas para essa espécie.
