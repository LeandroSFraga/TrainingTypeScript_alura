
import { NegociacaoController } from "./src/controllers/negociacao-controller.js";

const controller = new NegociacaoController();
const form = document.querySelector('.form');
if(form){
    form.addEventListener('submit', event => {
        event.preventDefault();
        controller.adiciona();
    });
} else{
    throw Error ('Form provavelmente não existe');
}

const botaoImporta = document.querySelector('#botao-importa');
if (botaoImporta){
    botaoImporta.addEventListener('click', () => {
        controller.importaDados();
    });
}else{
    throw Error('Botao nao encontrado');
}