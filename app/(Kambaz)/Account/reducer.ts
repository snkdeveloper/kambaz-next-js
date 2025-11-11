import { createSlice } from "@reduxjs/toolkit";

// Load from localStorage
const loadUserFromStorage = () => {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('currentUser');
      console.log("📦 Loading from localStorage:", stored);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error("Error loading user from storage:", error);
      return null;
    }
  }
  return null;
};

const initialState = {
  currentUser: loadUserFromStorage(),
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      console.log("💾 Setting current user:", action.payload);
      state.currentUser = action.payload;
      
      // Persist to localStorage
      if (typeof window !== 'undefined') {
        try {
          if (action.payload) {
            localStorage.setItem('currentUser', JSON.stringify(action.payload));
            console.log("✅ Saved to localStorage");
          } else {
            localStorage.removeItem('currentUser');
            console.log("🗑️ Removed from localStorage");
          }
        } catch (error) {
          console.error("Error saving to storage:", error);
        }
      }
    },
  },
});

export const { setCurrentUser } = accountSlice.actions;
export default accountSlice.reducer;