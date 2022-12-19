import { Negociacao } from "./negociacao.js";

export class Negociacoes {
    private negociacoes: Negociacao[] = [];

    public adicionar(negociacao: Negociacao): void {
        this.negociacoes.push(negociacao);

    }

    public listar(): readonly Negociacao[] {
        return this.negociacoes;
    }

    public paraTexto(): string {
        return JSON.stringify(this.negociacoes, null);
    }
}

const negociacoes = new Negociacoes();
negociacoes.listar().forEach(n => {
    n.data, n.quantidade, n.valor
});