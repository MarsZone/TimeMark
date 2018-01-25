<template>
  <v-ons-page>
    <custom-toolbar backLabel="Me">
      {{ label }}
    </custom-toolbar>
    <div class="input-login">
      <v-ons-list-item>
        <div class="left">
          <v-ons-icon icon="md-face" class="list-item__icon"></v-ons-icon>
        </div>
        <label class="center">
          <v-ons-input float maxlength="30"
                       placeholder="Email"
                       v-model="email"
                       type="email"
          >
          </v-ons-input>
        </label>
      </v-ons-list-item>

      <v-ons-list-item>
        <div class="left">
          <v-ons-icon icon="ion-locked" class="list-item__icon"></v-ons-icon>
        </div>
        <label class="center">
          <v-ons-input float maxlength="20"
                       placeholder="Password"
                       v-model="password"
                       type="password"
          >
          </v-ons-input>
        </label>
      </v-ons-list-item>
      <div style="width: 100%; text-align: center">
        <v-ons-button id="loginServer"
          @click="loginFromServer"
          class="my-button button button--outline " >Login
        </v-ons-button>
      </div>

      <div style="width: 100%; text-align: center">
        <v-ons-button id="showDailog"
                      v-bind:disabled="ifCanSend"
                      @click="showResetDailog"
                      class="my-button button button--outline "
        >
          <label v-if="!ifCanSend">Forget PassWord</label>
          <v-ons-icon v-if="ifCanSend" icon="ion-load-c" spin size="26px"></v-ons-icon>
        </v-ons-button>
      </div>

      <v-ons-alert-dialog modifier="rowfooter"
                          :visible.sync="alertDialog1Visible"
      >
        <span slot="title">Send Email <br> to Reset Password</span>

        <div class="center">
          <v-ons-input float maxlength="30"
                       placeholder="Email"
                       v-model="reqEmail"
                       type="email"
          >
          </v-ons-input>
        </div>

        <template slot="footer">
          <div class="alert-dialog-button" @click="cancelReq">Cancel</div>
          <div
            class="alert-dialog-button" @click="sendEmail">Send</div>
        </template>
      </v-ons-alert-dialog>
    </div>

  </v-ons-page>
</template>

<script>
   import axios from 'axios';
   axios.defaults.withCredentials = true;
    export default {
      data() {
        return {
          email: '',
          reqEmail:'',
          password:'',
          label:'login',
          alertDialog1Visible: false,
          ifCanSend:false,
        };
      },
      methods: {
        cancelReq(){
          this.alertDialog1Visible = false;
        },
        showResetDailog(){
          this.alertDialog1Visible = true;
        },
        sendEmail(){
          this.alertDialog1Visible = false;
          this.ifCanSend = true;
          let self = this;
          var req = this.$store.state.host + self.$store.state.net.NETREQ_resetEmail;
          axios.post(req, {
            email: this.reqEmail,
          })
            .then(function (response) {
              console.log(response.data.code);
              console.log(response.data.msg);
              self.ifCanSend = false;
              if(response.data.code!='200')
              {
                self.showError(response.data.msg);
              }else {
                self.$ons.notification.toast({
                  message:response.data.msg,
                  buttonLabel: 'OK',
                  timeout: 1000
                }).then(function () {
                });
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        },
        loginFromServer() {
          let self = this;
          var req = this.$store.state.host + self.$store.state.net.NETREQ_login;
          axios.post(req, {
            email: this.email,
            password: this.password
          })
            .then(function (response) {
              console.log("xxxxx");
              console.log(response.data.code);
              console.log(response.data.msg);
              if(response.data.code!='200')
              {
                self.showError(response.data.msg);
              }else {
                //更新Token
                //self.$store.state.token=response.data.token;
                //更新数据
                self.updateData(response.data.name,response.data.email);
                self.$ons.notification.toast({
                  message:response.data.msg,
                  buttonLabel: 'OK',
                  timeout: 1000
                }).then(function () {
                  //成功返回
                  self.pop();
                });
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        },
        updateData(name,email)
        {
          this.$store.state.login = true;
          this.$store.state.name = name;
          this.$store.state.email = email;
        },
        showError(msg){
          this.$ons.notification.alert(msg,{title:'Warning'});
        },
        pop(){
          this.$store.commit('navigator/pop');
        }

      },
    }
</script>

<style>
  .input-login{

  }
  .my-button{
    width: 90%;
    margin: 10px auto;
    text-align: center;
  }
</style>
