export class MoedaSocial {
    private nome: string;
    private valorRealCorrespondente: number;
    private emCirculacao: number;

    constructor(nome: string, valorRealCorrespondente: number) {
        this.nome = nome;
        this.valorRealCorrespondente = valorRealCorrespondente;
        this.emCirculacao = 0;
    }

    emitir(qtde: number): void {
        this.emCirculacao += qtde;
        console.log(`${qtde} unidades de ${this.nome} emitidas.`);
    }

    converterParaReais(qtde: number): number {
        return qtde * this.valorRealCorrespondente;
    }

    detalhes(): string {
        return `Moeda Social: ${this.nome}, Valor em Reais: ${this.valorRealCorrespondente}, Em Circulação: ${this.emCirculacao}`;
    }
}