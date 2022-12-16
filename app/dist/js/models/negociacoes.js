export class Negociacoes {
    constructor() {
        this.negociacoes = [];
    }
    adicionar(negociacao) {
        this.negociacoes.push(negociacao);
    }
    listar() {
        return this.negociacoes;
    }
}
const negociacoes = new Negociacoes();
negociacoes.listar().forEach(n => {
    n.data, n.quantidade, n.valor;
});
