import { MakeCommandArguments } from './MakeCommandArguments';
import { from } from 'rxjs';

export const makeCommand = ({ guards = [], ...cmd }: MakeCommandArguments) => ({
	...cmd,
	guards$: from(guards)
});
