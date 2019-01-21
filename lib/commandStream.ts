import { Subject } from 'rxjs';
import { Command } from './Command/Command';

export const command$ = new Subject<Command>();
