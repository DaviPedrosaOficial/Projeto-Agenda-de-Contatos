document.addEventListener('DOMContentLoaded', () => {
  const modalContato = document.getElementById('modalContato');

  if (!modalContato) return;

  const temErros = modalContato.dataset.temErros === 'true';

  if (temErros) {
    const modal = new bootstrap.Modal(modalContato);
    modal.show();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('ordenarSelect');

  if (select) {
    select.addEventListener('change', () => {
      select.form.submit();
    });
  }
});