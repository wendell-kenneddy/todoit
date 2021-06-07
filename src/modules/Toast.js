export class Toast {
  static showToast(text) {
    if (text == null) return;

    const toast = document.querySelector('.toast');
    const toastP = toast.firstElementChild;

    toastP.innerText = text;

    toast.classList.remove('hide');
    toast.classList.add('fadein');

    setTimeout(() => {
      toast.classList.remove('fadein');
      toast.classList.add('hide');
    }, 2000)
  }
};
