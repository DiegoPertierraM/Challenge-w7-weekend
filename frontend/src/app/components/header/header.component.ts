import { Component, inject } from "@angular/core";
import { StateService } from "../../services/state.service";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: "isdi-header",
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <header>
      <h1>
        <span>Userbook</span>
        @if ((stateSrv.getState() | async)!.loginState === 'logged') {
        <button (click)="onClickLogout()">Logout</button>
        } @else {
        <button (click)="onClickLogin()">Login</button>
        }
      </h1>
    </header>
  `,
  styles: `
  h1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    color: white;
    background-color: #111;
  }`,
})
export class HeaderComponent {
  stateSrv = inject(StateService);

  onClickLogin() {
    this.stateSrv.setLoginState("logging");
  }

  onClickLogout() {
    this.stateSrv.setLogout();
  }
}
