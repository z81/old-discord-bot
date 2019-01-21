import { Subject } from 'rxjs';
import { Message } from './Message/Message';

export const message$ = new Subject<Message>();
