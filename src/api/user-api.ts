import { users } from "../data/users";
import { User } from "../models/user";

export const getUsers = (): User[] => {
  return users;
};

export const getUser = (username: string): User | undefined => {
  return users.find(user => user.Username === username);
};
export const updatePassword = (email: string, newPassword: string): boolean => {
  const user = users.find(user => user.Email === email);
  if (user) {
    user.Password = newPassword;
    return true;
  }
  return false;
};
export const updateUser = (username: string, updatedData: Partial<User>): boolean => {
  const index = users.findIndex(user => user.Username === username);
  if (index !== -1) {
    users[index] = { ...users[index], ...updatedData };
    return true;
  }
  return false;
};
export const loginUser = (email: string, password: string): User | null => {
    const user = users.find(u => u.Email === email && u.Password === password);
    return user || null;
};
