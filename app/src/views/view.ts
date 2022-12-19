import { logarTempoExecucao } from "../decorators/tempo-exec.js";
import { info } from "../decorators/infos-method.js";

export abstract class View<T> {

    protected elemento: HTMLElement;

    constructor(seletor: string) {
        const elemento = document.querySelector(seletor);
        if(elemento){
            this.elemento = elemento as HTMLElement;
        }else {
            throw Error (`Verifique a existência de ${seletor} no DOM.`)
        }

    }

    protected abstract template(model: T): string;

    @info
    @logarTempoExecucao(true)
    public update(model: T): void {
        let template = this.template(model);
        this.elemento.innerHTML = template;
    }
}