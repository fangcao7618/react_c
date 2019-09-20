// 身份证校验
const regIdCard15 = /^\d{6}(\d{2})(0[1-9]|1[0-2])(0[1-9]|[1-2]\d|3[0-1])\d{3}$/i;
const regIdCard = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[0-2])(0[1-9]|[1-2]\d|3[0-1])\d{3}(\d|X)$/i;
const homonum = ['7', '9', '10', '5', '8', '4', '2', '1', '6', '3', '7', '9', '10', '5', '8', '4', '2'];
const retuNum = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];

// 判断是否身份证
export function IsIdCard(val) {
  if (val && (val.length == 15 || val.length == 18)) {
    if (regIdCard15.test(val)) {
      // 15 位简单校验
      return true;
    } else {
      // 18 位身份证校验
      if (regIdCard.test(val)) {
        let docvaluesp = val.split('');
        let sum = 0;
        for (let i = 0; i < 17; i++) {
          sum += docvaluesp[i] * homonum[i];
        }
        if (retuNum[sum % 11] == val.charAt(17)) {
          return true;
        }
      }
    }
  }

  return false;
};
