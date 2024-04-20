export type User = {
  id: string;
  name: string;
  email: string;
  password?: string;
  birthDate: Date;
  role: 'admin' | 'user' | 'guest';
  friends: User[];
  enemies: User[];
};

export type UserCreateDto = {
  name: string;
  email: string;
  password: string;
  birthDateString: string;
};

export type UserUpdateDto = Partial<UserCreateDto>;
