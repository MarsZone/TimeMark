<template>
  <v-ons-page>
    <custom-toolbar backLabel="Me">
      {{ label }}
    </custom-toolbar>
    <div class="input-register">
      <v-ons-list-item>
        <div class="left">
          <v-ons-icon icon="md-face" class="list-item__icon"></v-ons-icon>
        </div>
        <label class="center">
          <v-ons-input float maxlength="20"
                       placeholder="User Name"
                       v-model="name"
                       required
          >
          </v-ons-input>
        </label>
      </v-ons-list-item>

      <v-ons-list-item>
        <div class="left">
          <v-ons-icon icon="ion-email" class="list-item__icon"></v-ons-icon>
        </div>
        <label class="center">
          <v-ons-input float maxlength="30"
                       placeholder="Email reset password"
                       type="email"
                       v-model="email"
                       required
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
                       required
          >
          </v-ons-input>
        </label>
      </v-ons-list-item>

      <div style="width: 100%; text-align: center">
      <v-ons-button @click="RegisterToServer"
                    class="my-button button button--outline " >Register</v-ons-button>
      </div>
    </div>

  </v-ons-page>
</template>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        name: '',
        email: '',
        password:'',
        label:'',
      };
    },
    methods: {
      RegisterToServer() {
        let self = this;
        var req = this.$store.state.host + self.$store.state.net.NETREQ_register;
        //check email usename.
        if(this.email == '' || this.name =='' || this.password == '')
        {
          this.showError('Email or name or password was must input.');
          return;
        }
        axios.post(req, {
          username: this.name,
          email   : this.email,
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
              //更新数据
              self.updateData(response.data.name);
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
      updateData(name)
      {
        this.$store.state.login = true;
        this.$store.state.name = name;
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
  .my-button{
    width: 90%;
    margin: 10px auto;
    text-align: center;
  }
</style>
