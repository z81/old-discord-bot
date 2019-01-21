import { MakeCommandArguments } from './MakeCommandArguments';
import { Observable } from 'rxjs';
import { Guard } from '../Guard/Guard';

export type Command = Exclude<MakeCommandArguments, 'guards'> & {
	guards$: Observable<Guard>;
};
