const container = document.getElementById('toast-container');

const ICONS = {
  success: '✓',
  error:   '✗',
  info:    '▸',
  unlock:  '📖',
  system:  '⚙',
};

export function showToast(title, msg = '', type = 'info', duration = 3500) {
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.setAttribute('role', 'status');
  toast.innerHTML = `
    <span class="toast__icon" aria-hidden="true">${ICONS[type] ?? '▸'}</span>
    <div class="toast__body">
      <span class="toast__title">${title}</span>
      ${msg ? `<span class="toast__msg">${msg}</span>` : ''}
    </div>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('removing');
    toast.addEventListener('animationend', () => toast.remove(), { once: true });
  }, duration);
}
