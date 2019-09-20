export default {
  env: 'stg',
  host: '//stg.oneconnent.com/',
  site: {
    // site 名称
    bank: 'galileo',
    // 公钥
    publicKey: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC635J11qovVVFF3NAsU4gqJaHppu8j+f3wBvWF3DuY++t6gpXFOVKPeuHARfIzlB57WhuiURnbfZCAUK46zZ0WuO2pVCDnGGRIkVCFzg1roNJSPszAbf9lyd+FCEKw2XziapIIN93mvovOK5GpTs4rwKwjzuQdqqeZ4z9TEzpByQIDAQAB',
    // 公用参数
    params: {
      sellChannel: 'galileo',
      clientId: 'galileo',
      version: '1.0',
      signMethod: 'sha256',
      format: 'json',
      secret: '563fc0e9-44b4-475e-90eb-d0b72414d7e1',
      ssoTicket: function() {
        return 'sso';
      }
    }
  }
};
