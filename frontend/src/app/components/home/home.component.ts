import { Component, OnInit, inject } from "@angular/core";
import { State, StateService } from "../../services/state.service";
import { LoginComponent } from "../login/login.component";
import { JsonPipe } from "@angular/common";
import { UserComponent } from "../user/user.component";

@Component({
  selector: "isdi-home",
  standalone: true,
  imports: [LoginComponent, JsonPipe, UserComponent],
  template: `
    <h2>Inicio</h2>

    @switch (state.loginState) { @case ('idle') {
    <p>Haz login para poder entrar</p>
    } @case ('logging') {
    <isdi-login />
    } @case ('logged') {
    <isdi-user />
    } @case ('error') {
    <p>Error de acceso</p>
    } }
  `,
  styles: `
  :host {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  h2 {
    font-size: 2.5rem;
  }
  p {
    font-size: 1.5rem;
  }
  `,
})
export default class HomeComponent implements OnInit {
  stateSrv = inject(StateService);
  state!: State;

  ngOnInit(): void {
    this.stateSrv.getState().subscribe((state) => {
      this.state = state;
    });
  }
}
