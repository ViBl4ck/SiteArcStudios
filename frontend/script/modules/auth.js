import { state, registerUser, loginUser, logoutUser } from './state.js';
import { showToast } from './toast.js';
import { selectClass } from './classes.js';

export function initAuth() {
  const cadastroForm = document.getElementById('cadastro-form');
  const loginBtn     = document.getElementById('login-btn');
  const logoutBtn    = document.getElementById('logout-btn');

  cadastroForm?.addEventListener('submit', onRegister);
  loginBtn?.addEventListener('click', onLogin);
  logoutBtn?.addEventListener('click', onLogout);

  const phoneInput = document.getElementById('reg-phone');
  phoneInput?.addEventListener('input', () => {
    phoneInput.value = maskPhone(phoneInput.value);
  });

  // Se há sessão ativa, já mostra o painel logado (só afeta a página da jornada)
  if (state.isLoggedIn) renderDashboardLoggedIn();

  initTabs();
}

// Abas Nova Jornada / Continuar (página jornada.html)
function initTabs() {
  const tabs = document.querySelectorAll('.auth-tab');
  if (!tabs.length) return;

  const show = name => {
    document.querySelectorAll('.auth-tab').forEach(t => {
      const on = t.dataset.tab === name;
      t.classList.toggle('active', on);
      t.setAttribute('aria-selected', String(on));
    });
    const cad = document.getElementById('tab-cadastro');
    const log = document.getElementById('tab-login');
    if (cad) cad.hidden = name !== 'cadastro';
    if (log) log.hidden = name !== 'login';
  };

  tabs.forEach(t => t.addEventListener('click', () => show(t.dataset.tab)));
  document.querySelectorAll('[data-tab-target]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      show(el.dataset.tabTarget);
    });
  });
}

function onRegister(e) {
  e.preventDefault();
  const form = e.target;
  clearErrors(form);

  const name  = form.querySelector('#reg-name').value.trim();
  const email = form.querySelector('#reg-email').value.trim();
  const phone = form.querySelector('#reg-phone').value.trim();
  const birth = form.querySelector('#reg-birth').value;
  const cls   = form.querySelector('input[name="reg-class"]:checked')?.value ?? 'guerreiro';

  let valid = true;

  if (!name) {
    setError('reg-name-error', '✗ Nome obrigatório');
    form.querySelector('#reg-name').classList.add('error');
    valid = false;
  }

  if (!isValidEmail(email)) {
    setError('reg-email-error', '✗ E-mail inválido');
    form.querySelector('#reg-email').classList.add('error');
    valid = false;
  }

  if (phone && !isValidPhone(phone)) {
    setError('reg-phone-error', '✗ Telefone inválido. Use (00) 00000-0000');
    form.querySelector('#reg-phone').classList.add('error');
    valid = false;
  }

  if (!birth) {
    setError('reg-birth-error', '✗ Data de nascimento obrigatória');
    form.querySelector('#reg-birth').classList.add('error');
    valid = false;
  } else if (!isValidBirth(birth)) {
    setError('reg-birth-error', '✗ Data inválida ou menor de 13 anos');
    form.querySelector('#reg-birth').classList.add('error');
    valid = false;
  }

  if (!valid) {
    showToast('DADOS INVÁLIDOS', 'Corrija os campos marcados.', 'error');
    return;
  }

  registerUser({ name, email, phone, birth, class: cls });
  selectClass(cls, { silent: true });

  showToast('JORNADA INICIADA!', `Bem-vindo(a), ${name}.`, 'success', 4000);
  showToast('PROGRESSO SALVO', 'Seu perfil foi criado com sucesso.', 'system', 5000);

  form.reset();

  // Cadastro e Dashboard agora são a mesma página → mostra o painel logado
  renderDashboardLoggedIn();
  setTimeout(() => {
    const sec = document.getElementById('jornada');
    if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 300);
}

function onLogin() {
  const emailInput = document.getElementById('login-email');
  const email = emailInput?.value.trim() ?? '';

  clearErrors(document.getElementById('dashboard-out'));

  if (!isValidEmail(email)) {
    setError('login-email-error', '✗ E-mail inválido');
    emailInput?.classList.add('error');
    showToast('ACESSO NEGADO', 'E-mail inválido.', 'error');
    return;
  }

  const success = loginUser(email);
  if (!success) {
    setError('login-email-error', '✗ Usuário não encontrado. Faça o cadastro.');
    emailInput?.classList.add('error');
    showToast('USUÁRIO NÃO ENCONTRADO', 'Inicie sua jornada primeiro.', 'error');
    return;
  }

  selectClass(state.user.class, { silent: true });
  showToast('JORNADA RETOMADA', `Bem-vindo(a) de volta, ${state.user.name}!`, 'success');
  renderDashboardLoggedIn();
}

function onLogout() {
  logoutUser();
  showToast('JORNADA PAUSADA', 'Sessão encerrada.', 'system');
  renderDashboardLoggedOut();
}

export function renderDashboardLoggedIn() {
  const authArea = document.getElementById('jornada-auth');
  const panelIn  = document.getElementById('dashboard-in');

  if (authArea) authArea.hidden = true;
  if (panelIn)  panelIn.hidden  = false;

  const { user } = state;
  if (!user) return;

  const nameEl  = document.getElementById('player-display-name');
  const classEl = document.getElementById('player-display-class');
  const avatar  = document.getElementById('player-avatar');

  const ICONS = { guerreiro: '⚔', arqueiro: '🏹', curandeiro: '🌿' };

  if (nameEl)  nameEl.textContent  = user.name;
  if (classEl) classEl.textContent = user.class.charAt(0).toUpperCase() + user.class.slice(1);
  if (avatar)  avatar.textContent  = ICONS[user.class] ?? '⚔';

  const fill  = document.getElementById('dashboard-journey-fill');
  const pct   = document.getElementById('dashboard-journey-pct');
  const val   = state.journeyProgress;
  if (fill)  fill.style.width   = `${val}%`;
  if (pct)   pct.textContent    = `${val}%`;

  const codexCount = document.getElementById('codex-count-dashboard');
  const codexFill  = document.getElementById('codex-dashboard-fill');
  const n = state.discoveredMonsters.size;
  if (codexCount) codexCount.textContent = n;
  if (codexFill)  codexFill.style.width  = `${(n / 7) * 100}%`; // 7 = TOTAL_MONSTERS em bestiary.js
}

function renderDashboardLoggedOut() {
  const authArea = document.getElementById('jornada-auth');
  const panelIn  = document.getElementById('dashboard-in');
  if (authArea) authArea.hidden = false;
  if (panelIn)  panelIn.hidden  = true;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  return /^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(phone);
}

function isValidBirth(dateStr) {
  const birth = new Date(dateStr);
  if (isNaN(birth)) return false;
  const today = new Date();
  const age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  const adjustedAge = (m < 0 || (m === 0 && today.getDate() < birth.getDate())) ? age - 1 : age;
  return adjustedAge >= 13 && birth < today;
}

function maskPhone(value) {
  let v = value.replace(/\D/g, '').slice(0, 11);
  if (v.length >= 7) {
    return `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`;
  } else if (v.length >= 3) {
    return `(${v.slice(0,2)}) ${v.slice(2)}`;
  } else if (v.length > 0) {
    return `(${v}`;
  }
  return v;
}

function setError(id, msg) {
  const el = document.getElementById(id);
  if (el) el.textContent = msg;
}

function clearErrors(container) {
  if (!container) return;
  container.querySelectorAll('.form-error').forEach(el => el.textContent = '');
  container.querySelectorAll('.form-input.error').forEach(el => el.classList.remove('error'));
}
