import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  agentSelected: Subject<string> = new Subject<string>();

  constructor() { }

  updateAgentSelected(agentSelected: string){
    this.agentSelected.next(agentSelected);
  }
}
