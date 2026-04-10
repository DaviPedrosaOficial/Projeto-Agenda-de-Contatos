document.addEventListener('DOMContentLoaded', () => {
  const modalContato = document.getElementById('modalContato');

  if (!modalContato) return;

  const temErros = modalContato.dataset.temErros === 'true';

  if (temErros) {
    const modal = new bootstrap.Modal(modalContato);
    modal.show();
  }
});