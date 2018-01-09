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
                       placeholder="User Name"
                       v-model="name"
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
                       placeholder="password"
                       v-model="password"
                       type="password"
          >
          </v-ons-input>
        </label>
      </v-ons-list-item>

      <v-ons-button @click="loginFromServer"
        class="my-button button button--outline " >Login</v-ons-button>
    </div>

  </v-ons-page>
</template>

<script>
   import axios from 'axios';

    export default {
      data() {
        return {
          name: '',
          password:'',
        };
      },
      methods: {
        loginFromServer() {
          let self = this;
          var req = this.$store.state.host + '/login';
          axios.post(req, {
            username: this.name,
            password: this.password
          })
            .then(function (response) {
              console.log(response);
              console.log(response.data.code);
              console.log(response.data.msg);
              if(response.data.code!='200')
              {
                self.showError(response.data.msg);
              }else {
                //更新数据
                self.updateData(response.data.name);
                //成功返回
                self.pop();
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
  .input-login{

  }
  .my-button{
    width: 100%;
    margin: 10px auto;
    text-align: center;
  }
</style>
