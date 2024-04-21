import { Component, OnInit, inject } from "@angular/core";
import { State, StateService } from "../../services/state.service";
import { User } from "../../models/user.model";
import { JsonPipe } from "@angular/common";

@Component({
  selector: "isdi-user",
  standalone: true,
  imports: [JsonPipe],
  template: `
    <h2>Bienvenido {{ user.name }}</h2>
    <h3>Amigos:</h3>
    <ul>
      @for (user of user.friends; track $index) {
      <li>{{ user.name }}</li>
      <li>{{ user.email }}</li>
      }
    </ul>
    <h3>Enemigos:</h3>
    <ul>
      @for (user of user.enemies; track $index) {
      <li>{{ user.name }}</li>
      <li>{{ user.email }}</li>
      }
    </ul>
  `,
  styles: ``,
})
export class UserComponent implements OnInit {
  stateSrv = inject(StateService);
  state!: State;
  user!: User;

  ngOnInit(): void {
    this.stateSrv.getState().subscribe((state) => {
      this.state = state;
      this.user = this.state.currentUser as User;
      console.log(this.user.email);
    });
  }
}
