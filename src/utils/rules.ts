const rules = {
  required: (value: string) => !!value || '필수항목입니다.',
  email: (value: string) => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(value) || '올바른 e-mail 형식이 아닙니다.';
  },
  password: (value: string) => {
    const pattern = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
    return pattern.test(value) || '영문자와 숫자, 특수문자 조합으로 8~16자리를 입력해주세요.';
  },
};

export default rules;
