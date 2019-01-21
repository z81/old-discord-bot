import { MessageCommandData } from '../Message/MessageCommandData';
import { Observable } from 'rxjs';

export type Guard = (message: MessageCommandData) => Observable<boolean>;
