import { Comparavel } from "./comparavel";
import { Imprimivel } from "./imprimivel";

export interface Modelo<T> extends Comparavel<T>, Imprimivel {

}