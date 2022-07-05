import {Model} from './model';

export class FileDoc extends Model {
    constructor(public file: File | null = null, public phrase: string = '') {
        super();
    }
}
