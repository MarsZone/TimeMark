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
          <v-ons-input float maxlength="20"
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
        <v-ons-button id="loginServer"
                      @click="loginFromServer"
                      class="my-button button button--outline " >Forget PassWord
        </v-ons-button>
      </div>
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
          password:'',
        };
      },
      methods: {
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
