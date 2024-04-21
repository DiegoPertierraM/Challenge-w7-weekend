import { Injectable, inject } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { RepoUsersService } from "./repo.users.service";

type LoginState = "idle" | "logging" | "logged" | "error";

export type Payload = {
  id: string;
  role: string;
} & JwtPayload;

export type State = {
  loginState: LoginState;
  token: string | null;
  currentPayload: Payload | null;
  currentUser: unknown | null;
};

const initialState: State = {
  loginState: "idle",
  token: null,
  currentPayload: null,
  currentUser: null,
};

@Injectable({
  providedIn: "root",
})
export class StateService {
  private state$ = new BehaviorSubject<State>(initialState);
  private repoUsers = inject(RepoUsersService);

  constructor() {}

  getState(): Observable<State> {
    return this.state$.asObservable();
  }

  getToken = (): string | null => {
    return this.state$.value.token;
  };

  setLoginState(loginState: LoginState): void {
    this.state$.next({ ...this.state$.value, loginState });
  }

  setLogin(token: string) {
    const currentPayload = jwtDecode(token) as Payload;
    localStorage.setItem("weekend", JSON.stringify({ token }));
    this.repoUsers.getById(currentPayload.id).subscribe((user) => {
      this.state$.next({
        ...this.state$.value,
        loginState: "logged",
        token,
        currentPayload,
        currentUser: user,
      });
    });
  }

  setLogout() {
    localStorage.removeItem("weekend");
    this.state$.next({
      ...this.state$.value,
      loginState: "idle",
      token: null,
      currentPayload: null,
    });
  }
}
