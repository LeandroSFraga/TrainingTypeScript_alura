
import { Modelo } from "../interfaces/modelo.js";
import { Negociacao } from "./negociacao.js";

export class Negociacoes implements Modelo<Negociacoes> {
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

    public jaAdd(negociacoes: Negociacoes): boolean{
        return JSON.stringify(this.negociacoes) === JSON.stringify(negociacoes.listar());
    }
}