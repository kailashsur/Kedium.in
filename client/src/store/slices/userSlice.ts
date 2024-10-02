import { encryptData, decryptData } from "@/util/encryptData";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const isClient = typeof window !== "undefined";

// Define the shape of the state

export interface UserState {
  data: {
    access_token?: string;
    username?: string;
    email?: string;
    fullname?: string;
  };
  info: {
    _id?: string;
    profile?: {
      profile_img?: string;
      bio?: string;
      profile_color?: string;
    };
    social_links?: {
      youtube?: string;
      instagram?: string;
      facebook?: string;
      twitter?: string;
      github?: string;
      website?: string;
    };
    fullname?: string;
    email?: string;
    username?: string;
    role?: string;
    interested_in?: string[];
    reading_list?: string[];
    total_posts?: number;
    followers_count?: number;
    followers?: Array<string>;
    following?: Array<string>;
    blogs?: Array<string>;
    joinedAt?: string;
    updatedAt?: string;
  };
}

// Define the initial state using the UserState interface
const initialState: UserState = {
  data: {
    access_token: undefined,
    username: undefined,
    email: undefined,
    fullname: undefined,
  },
  info: isClient
    ? localStorage.getItem("info")
      ? (decryptData(localStorage.getItem("info")!) as UserState["info"])
      : {}
    : {},
};

// Define the slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<object>) => {
      state.data = action.payload;

      if (isClient) {
        localStorage.setItem("user", JSON.stringify(action.payload));
      }
    },
    addInfo: (state, action: PayloadAction<object>) => {
      state.info = action.payload;
      if (isClient) {
        const encryptedInfo = encryptData(action.payload);
        if (encryptedInfo) {
          localStorage.setItem("info", encryptedInfo);
        } else {
          console.log("Failed to encrypt info before storing in local storage");
        }
      }
    },
  },
});

export const { addUser, addInfo } = userSlice.actions;
export default userSlice.reducer;
