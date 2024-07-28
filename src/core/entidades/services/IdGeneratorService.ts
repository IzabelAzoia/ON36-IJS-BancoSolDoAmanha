import { v4 as uuidv4 } from 'uuid';

export class IdGeneratorService {
    gerarId(): string {
        return Math.random().toString(36).substring(2, 15);
    }
}