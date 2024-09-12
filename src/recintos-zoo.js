class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanho: 10, ocupados: 3, animais: ['MACACO'] },
            { numero: 2, bioma: 'floresta', tamanho: 5, ocupados: 0, animais: [] },
            { numero: 3, bioma: 'savana e rio', tamanho: 7, ocupados: 2, animais: ['GAZELA'] },
            { numero: 4, bioma: 'rio', tamanho: 8, ocupados: 0, animais: [] },
            { numero: 5, bioma: 'savana', tamanho: 9, ocupados: 3, animais: ['LEAO'] }
        ];

        this.animais = {
            'LEAO': { tamanho: 3, bioma: ['savana'], carnivoro: true },
            'LEOPARDO': { tamanho: 2, bioma: ['savana'], carnivoro: true },
            'CROCODILO': { tamanho: 3, bioma: ['rio'], carnivoro: true },
            'MACACO': { tamanho: 1, bioma: ['savana', 'floresta'], carnivoro: false },
            'GAZELA': { tamanho: 2, bioma: ['savana'], carnivoro: false },
            'HIPOPOTAMO': { tamanho: 4, bioma: ['savana', 'rio'], carnivoro: false }
        };
    }

    analisaRecintos(animal, quantidade) {
        if (!this.animais[animal]) {
            return { erro: "Animal inválido" };
        }

        if (quantidade < 1) {
            return { erro: "Quantidade inválida" };
        }

        const especie = this.animais[animal];
        let recintosViaveis = [];

        for (const recinto of this.recintos) {
            // Verifica se o bioma é compatível
            if (!this.verificaBiomaCompativel(recinto.bioma, especie.bioma)) {
                continue;
            }

            // Verifica se o animal é carnívoro e se há outros animais no recinto
            if (especie.carnivoro && recinto.animais.some(a => a !== animal)) {
                continue;
            }

            // Verifica se há carnívoros no recinto, o que impede não-carnívoros de entrar
            if (!especie.carnivoro && recinto.animais.some(a => this.animais[a].carnivoro)) {
                continue;
            }

            // Calcula o espaço necessário
            let espacoNecessario = especie.tamanho * quantidade;
            let espacoLivre = recinto.tamanho - recinto.ocupados;

            // Verifica se o recinto tem outras espécies, o que exige espaço extra
            if (recinto.animais.length > 0 && !recinto.animais.includes(animal)) {
                espacoNecessario += 1;
            }

            // Verifica se há espaço suficiente no recinto
            if (espacoLivre >= espacoNecessario) {
                // Implementa a alocação dos 2 macacos
                if (animal === 'MACACO') {
                    if (quantidade >= 2 || recinto.animais.length > 0) {
                        recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre - espacoNecessario} total: ${recinto.tamanho})`);
                    }
                } else {
                    recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre - espacoNecessario} total: ${recinto.tamanho})`);
                }
            }
        }

        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }

        // Retorna os recintos encontrados
        return { recintosViaveis };
    }

    verificaBiomaCompativel(biomaPrincipal, biomasEspecie) {
        const biomasDoRecinto = biomaPrincipal.split(' e ');
        return biomasDoRecinto.some(bioma => biomasEspecie.includes(bioma));
    }
}

export { RecintosZoo as RecintosZoo };
