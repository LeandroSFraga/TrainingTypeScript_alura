var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { DiaDaSemana } from "../enums/dia-da-semana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { MensagemView } from "../views/mensagem.view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";
import { logarTempoExecucao } from "../decorators/tempo-exec.js";
import { domInjector } from "../decorators/dom-injector.js";
export class NegociacaoController {
    constructor() {
        this.negociacoes = new Negociacoes();
        this.negociacoesView = new NegociacoesView('#negociacoesView');
        this.mensagemView = new MensagemView('#mensagemView');
        this.negociacoesView.update(this.negociacoes);
    }
    adiciona() {
        const negociacao = Negociacao.criaDe(this.inputData.value, this.inputQuantidade.value, this.inputValor.value);
        if (!this.ehDiaUtil(negociacao.data)) {
            this.mensagemView.update('Não é dia útil!');
            return;
        }
        this.negociacoes.adicionar(negociacao);
        this.limparForm();
        this.atualizarView();
    }
    importaDados() {
        fetch('http://localhost:8080/dados')
            .then(res => res.json())
            .then((dados) => {
            return dados.map(dadoDeHoje => {
                return new Negociacao(new Date(), dadoDeHoje.vezes, dadoDeHoje.montante);
            });
        })
            .then(negociacoesDeHoje => {
            for (let negociacao of negociacoesDeHoje) {
                this.negociacoes.adicionar(negociacao);
            }
            this.negociacoesView.update(this.negociacoes);
        });
    }
    ehDiaUtil(data) {
        return data.getDay() > DiaDaSemana.dom && data.getDay() < DiaDaSemana.sab;
    }
    atualizarView() {
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update('Negociação adicionada!');
    }
    limparForm() {
        this.inputData.value = '';
        this.inputQuantidade.value = '1';
        this.inputValor.value = '0.0';
        this.inputData.focus();
    }
}
__decorate([
    domInjector('#data')
], NegociacaoController.prototype, "inputData", void 0);
__decorate([
    domInjector('#quantidade')
], NegociacaoController.prototype, "inputQuantidade", void 0);
__decorate([
    domInjector('#valor')
], NegociacaoController.prototype, "inputValor", void 0);
__decorate([
    logarTempoExecucao(true)
], NegociacaoController.prototype, "adiciona", null);
