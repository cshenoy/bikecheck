BikeCheck.Mixins.UserMGMTMixins = {
  getLoginCreds: function(credsType) {
    var creds = {
      username: this.$('#' + credsType + '-username').val(),
      password: this.$('#' + tcredsTypeype + '-password').val()
    };
    return creds;
  }
};
