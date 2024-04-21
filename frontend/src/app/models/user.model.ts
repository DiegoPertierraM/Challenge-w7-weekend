export type User = {
  name: string;
  email: string;
  friends: User[];
  enemies: User[];
};

export type UserLoginDto = {
  username: "string";
  password: "string";
};
