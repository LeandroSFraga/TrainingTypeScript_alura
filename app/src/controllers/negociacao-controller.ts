import { DiaDaSemana } from "../enums/dia-da-semana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { MensagemView } from "../views/mensagem.view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";
import { logarTempoExecucao } from "../decorators/tempo-exec.js";
import { domInjector } from "../decorators/dom-injector.js";
import { NegociacaoDoDia } from "../interfaces/negociacao-do-dia.js";
import { NegociacoesService } from "../services/negociacoes-service.js";
import { imprimir } from "../utils/imprimir.js";

export class NegociacaoController {
    @domInjector('#data')
    private inputData: HTMLInputElement;
    @domInjector('#quantidade')
    private inputQuantidade: HTMLInputElement;
    @domInjector('#valor')
    private inputValor: HTMLInputElement;

    private negociacoes = new Negociacoes();
    private negociacoesView = new NegociacoesView('#negociacoesView');
    private mensagemView = new MensagemView('#mensagemView')
    private negociacaoService = new NegociacoesService();

    public constructor() {
        this.negociacoesView.update(this.negociacoes);
    }

    @logarTempoExecucao(true)
    public adiciona(): void {
        const negociacao = Negociacao.criaDe(
            this.inputData.value,
            this.inputQuantidade.value,
            this.inputValor.value
        );
        if (!this.ehDiaUtil(negociacao.data)) {
            this.mensagemView.update('Não é dia útil!');
            return;
        }
        this.negociacoes.adicionar(negociacao);
        imprimir(negociacao, this.negociacoes);
        this.limparForm();
        this.atualizarView();
    }

    public importaDados(): void {
        this.negociacaoService.obterNegociacoes()
            .then(negociacoesDeHoje => {
                return negociacoesDeHoje.filter(negociacoesDeHoje => {
                    return !this.negociacoes
                        .listar()
                        .some(
                            negociacao => negociacao.jaAdd(negociacoesDeHoje)
                        );
                });
            })
            .then(negociacoesDeHoje => {
                for (let negociacao of negociacoesDeHoje) {
                    this.negociacoes.adicionar(negociacao);
                }
                this.negociacoesView.update(this.negociacoes);
            });
    }

    private ehDiaUtil(data: Date): boolean {
        return data.getDay() > DiaDaSemana.dom && data.getDay() < DiaDaSemana.sab;
    }

    private atualizarView(): void {
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update('Negociação adicionada!');
    }

    private limparForm(): void {
        this.inputData.value = '';
        this.inputQuantidade.value = '1';
        this.inputValor.value = '0.0';
        this.inputData.focus();
    }
}