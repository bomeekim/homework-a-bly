import Vue from 'vue';

// eslint-disable-next-line import/prefer-default-export
function showAlertModal(text: string): any {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return Vue.swal({
    html: text,
    width: 380,
    showCloseButton: true,
    showCancelButton: false,
    showConfirmButton: true,
    allowOutsideClick: false,
    confirmButtonText: '확인',
    customClass: {
      htmlContainer: 'swal-custom-alert-html',
      confirmButton: 'swal-custom-alert-confirm-button',
    },
  });
}

export default {
  // eslint-disable-next-line no-shadow
  install(Vue: any) {
    // eslint-disable-next-line no-param-reassign
    Vue.prototype.$showAlertModal = showAlertModal;
  },
};
