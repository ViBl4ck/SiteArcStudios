// Shared state with localStorage persistence
const LS = {
  USERS:    'anahi:users',
  MONSTERS: 'anahi:monsters',
  CLASS:    'anahi:class',
  SESSION:  'anahi:session',
};

export const state = {
  currentClass: 'guerreiro',
  isLoggedIn: false,
  user: null,
  registeredUsers: [],
  discoveredMonsters: new Set(),
  journeyProgress: 0,
};

function hydrate() {
  try {
    const users    = JSON.parse(localStorage.getItem(LS.USERS)    ?? '[]');
    const monsters = JSON.parse(localStorage.getItem(LS.MONSTERS) ?? '[]');
    const cls      = localStorage.getItem(LS.CLASS) ?? 'guerreiro';
    state.registeredUsers    = Array.isArray(users) ? users : [];
    state.discoveredMonsters = new Set(Array.isArray(monsters) ? monsters : []);
    state.currentClass       = cls;

    // Restaura sessão de login (persiste entre páginas)
    const sessionEmail = localStorage.getItem(LS.SESSION);
    if (sessionEmail) {
      const u = state.registeredUsers.find(
        x => x.email.toLowerCase() === sessionEmail.toLowerCase()
      );
      if (u) {
        state.user         = u;
        state.isLoggedIn   = true;
        state.currentClass = u.class;
      }
    }
  } catch {
    // ignore parse errors — start fresh
  }
}

hydrate();

export function setClass(cls) {
  state.currentClass = cls;
  localStorage.setItem(LS.CLASS, cls);
}

export function registerUser(userData) {
  state.registeredUsers.push(userData);
  state.user       = userData;
  state.isLoggedIn = true;
  state.currentClass = userData.class;
  localStorage.setItem(LS.USERS, JSON.stringify(state.registeredUsers));
  localStorage.setItem(LS.CLASS, userData.class);
  localStorage.setItem(LS.SESSION, userData.email);
}

export function loginUser(email) {
  const found = state.registeredUsers.find(
    u => u.email.toLowerCase() === email.toLowerCase()
  );
  if (found) {
    state.user       = found;
    state.isLoggedIn = true;
    state.currentClass = found.class;
    localStorage.setItem(LS.SESSION, found.email);
    return true;
  }
  return false;
}

export function logoutUser() {
  state.isLoggedIn = false;
  state.user = null;
  localStorage.removeItem(LS.SESSION);
}

export function discoverMonster(id) {
  state.discoveredMonsters.add(id);
  localStorage.setItem(LS.MONSTERS, JSON.stringify([...state.discoveredMonsters]));
}

export function setJourneyProgress(pct) {
  state.journeyProgress = Math.min(100, Math.max(0, pct));
}
