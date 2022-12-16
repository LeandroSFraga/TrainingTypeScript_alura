import { escape } from "../decorators/escape.js";
import { Negociacoes } from "../models/negociacoes.js";
import { View } from "./view.js";

export class NegociacoesView extends View<Negociacoes> {

    @escape
    protected template(model: Negociacoes): string {
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
                </tr>
            </thead>
            <tbody>
                ${model.listar().map(negociacao => {
                    return `
                    <tr>
                        <td>${this.formatar(negociacao.data)}</td>
                        <td>${negociacao.quantidade}</td>
                        <td>${negociacao.valor}</td>
                    </tr>
                    `
                }).join('')}
            </tbody>
        </table>
        `;
    }

    private formatar(data: Date){
        return new Intl.DateTimeFormat().format(data)
    }

    //renderiza template
    public update(model: Negociacoes): void {
        const template = this.template(model);
        this.elemento.innerHTML =  this.template(model);
    }
}