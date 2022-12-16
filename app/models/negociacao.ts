export class Negociacao {

    public constructor(
        private readonly _data: Date,
        public readonly quantidade: number,
        public readonly valor: number
    ) { }


    get volume(): number {
        return this.quantidade * this.valor;
    }

    get data(): Date{
        const data = new Date(this._data.getTime());
        return data;
    }

    public static criaDe(dataString: string, qtdString: string, valorString: string): Negociacao{
        const date = new Date(dataString.replace('-', ','));
        const quantidade = parseInt(qtdString);
        const valor = parseFloat(valorString);
        return new Negociacao(date, quantidade, valor);
    }

}