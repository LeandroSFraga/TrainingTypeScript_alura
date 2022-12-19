export function domInjector(seletor: string){
    return function(target: any, propertyKey: string) {
        let elemento: HTMLElement | null = null;
        const getter = function() {
            if (!elemento) {
                elemento = <HTMLElement>document.querySelector(seletor);
                console.log(`Seletor ${seletor} buscando no DOM para injetar a ${propertyKey}`);
            }
            return elemento;
        }

        // const getter = function(){
        //     const elemento = document.querySelector(seletor);
        //     return elemento;
        // }

        Object.defineProperty(
            target, 
            propertyKey, 
            { get: getter}
            )
    }
}