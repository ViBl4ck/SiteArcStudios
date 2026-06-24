import { showToast } from './toast.js';

export function initShop() {
  document.querySelectorAll('[data-product]').forEach(btn => {
    btn.addEventListener('click', () => {
      showToast('EM BREVE', 'A loja estará disponível em breve. Fique ligado!', 'info');
    });
  });
}
