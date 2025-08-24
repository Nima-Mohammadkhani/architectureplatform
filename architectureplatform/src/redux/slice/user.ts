import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserState } from "../../types/slice";
import { FormData } from "../../types/ui";

const initialState: UserState = {
  user: null,
};

const findUserByEmail = (email: string): User | null => {
  try {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    return users.find((user: User) => user.email === email) || null;
  } catch {
    return null;
  }
};

const saveUserToList = (user: User) => {
  try {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const existingUserIndex = users.findIndex(
      (u: User) => u.email === user.email
    );

    if (existingUserIndex >= 0) {
      users[existingUserIndex] = user;
    } else {
      users.push(user);
    }

    localStorage.setItem("users", JSON.stringify(users));
  } catch {
    localStorage.setItem("users", JSON.stringify([user]));
  }
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    register: (state, action: PayloadAction<FormData>) => {
      const newUser: User = {
        id: Date.now().toString(),
        name: action.payload.name,
        email: action.payload.email,
        joinDate: action.payload.joinDate,
      };
      state.user = newUser;
      localStorage.setItem("user", JSON.stringify(newUser));
      saveUserToList(newUser);
    },
    login: (state, action: PayloadAction<FormData>) => {
      const existingUser = findUserByEmail(action.payload.email);

      if (existingUser) {
        state.user = existingUser;
        localStorage.setItem("user", JSON.stringify(existingUser));
      } else {
        const user: User = {
          id: Date.now().toString(),
          name: action.payload.name || "کاربر",
          email: action.payload.email,
          joinDate: action.payload.joinDate,
        };
        state.user = user;
        localStorage.setItem("user", JSON.stringify(user));
        saveUserToList(user);
      }
    },
    logout: (state) => {
      state.user = null;
      localStorage.clear();
    },
    updateProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem("user", JSON.stringify(state.user));
        saveUserToList(state.user);
      }
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    changePassword: (
      state,
      action: PayloadAction<{ oldPassword: string; newPassword: string }>
    ) => {
      if (state.user) {
        console.log(action.payload);
      }
    },
    deleteAccount: (state) => {
      if (state.user) {
        try {
          const users = JSON.parse(localStorage.getItem("users") || "[]");
          const updatedUsers = users.filter(
            (u: User) => u.email !== state.user?.email
          );
          localStorage.setItem("users", JSON.stringify(updatedUsers));
        } catch (error) {
          console.error("Error removing user from users list:", error);
        }

        state.user = null;
        localStorage.removeItem("user");
        localStorage.removeItem("reduxState");
      }
    },
  },
});

export const {
  login,
  logout,
  register,
  updateProfile,
  setUser,
  changePassword,
  deleteAccount,
} = userSlice.actions;
export default userSlice.reducer;
