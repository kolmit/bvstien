import { Component, OnInit } from '@angular/core';
import * as data from '../../assets/data.json';
import { AgentService } from '../service/agent.service';


@Component({
  selector: 'app-agent-selector',
  templateUrl: './agent-selector.component.html',
  styleUrls: ['./agent-selector.component.scss']
})
export class AgentSelectorComponent implements OnInit {
  agentList: string[] = [];
  agentAbilities: Map<string, any> = new Map();
  currentAgent: string;
  data: any = data;

  /*@ViewChild('canvas', { static: true }) 
  canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;
  initCanvas(){
    this.ctx = this.canvas.nativeElement.getContext('2d');
  }*/

  constructor(private agentService: AgentService) { 
    //console.log(this.data.default);
  }

  ngOnInit() {
    for (let agent of this.data.default){
      this.agentList.push(agent.name);
      this.agentAbilities.set(agent.name, agent.abilities);
    }

    this.agentService.agentSelected.subscribe( (agent) => {
      this.currentAgent = agent;
    });
  }


  selectAgent(agentName: string){
    this.agentService.updateAgentSelected(agentName);
  }
}