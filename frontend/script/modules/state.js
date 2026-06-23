// Shared in-memory state — NO localStorage/sessionStorage
export const state = {
  currentClass: 'guerreiro',
  isLoggedIn: false,
  user: null,            // { name, email, phone, birth, class }
  registeredUsers: [],   // simulated user database
  discoveredMonsters: new Set(),
  journeyProgress: 0,    // 0–100
};

export function setClass(cls) {
  state.currentClass = cls;
}

export function registerUser(userData) {
  state.registeredUsers.push(userData);
  state.user = userData;
  state.isLoggedIn = true;
  state.currentClass = userData.class;
}

export function loginUser(email) {
  const found = state.registeredUsers.find(
    u => u.email.toLowerCase() === email.toLowerCase()
  );
  if (found) {
    state.user = found;
    state.isLoggedIn = true;
    state.currentClass = found.class;
    return true;
  }
  return false;
}

export function logoutUser() {
  state.isLoggedIn = false;
  state.user = null;
}

export function discoverMonster(id) {
  state.discoveredMonsters.add(id);
}

export function setJourneyProgress(pct) {
  state.journeyProgress = Math.min(100, Math.max(0, pct));
}
