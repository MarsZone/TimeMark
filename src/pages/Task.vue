<template>
  <v-ons-page>
    <p class="intro">
      Click category to add task<br><br>
    </p>
    <v-ons-card v-for="task of taskList" :key="task.label"
    >
      <div class="title">{{ task.label }}</div>
    </v-ons-card>
  </v-ons-page>
</template>

<script>
  import axios from 'axios';
  import Bus from '../components/bus.js'
  export default {
    data () {
      return {
        taskList: [
          {
            id : 1,
            tid:"1",
            label: 'Default',
          },
          {
            id : 2,
            tid:"2",
            label: 'Study',
          },
          {
            id : 3,
            tid:"3",
            label: 'Project',
          },
          {
            id : 4,
            tid:"4",
            label: 'Sports',
          },
          {
            id : 5,
            tid:"5",
            label: 'Customer',
          }
        ]
      }
    },
    created(){
      let self = this;
      Bus.$on('tabChange', function (label) {
        if(label == 'Task')
        {
          self.updateData();
        }
      });
    },
    mounted(){

    },
    methods:{
      updateData(){
        let self = this;

        axios.post('http://localhost:3000/app/templateList', {
          username: this.$store.state.name
        })
          .then(function (response) {
            console.log(response);
            console.log(response.data.code);
            console.log(response.data.msg);
            if(response.data.code!='200')
            {
              self.showError(response.data.msg);
            }else {
              //成功获取

            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    computed: {

    },
    components: {
    }
  };
</script>

<style scoped>
  .task {
  }
  .intro {
    text-align: left;
    padding: 0 22px;
    margin-top: 20px;
    font-size: 14px;
    line-height: 1.4;
    color: rgba(0, 0, 0, .54);
  }
  ons-card {
    cursor: pointer;
    color: #333;
    text-align: center;
  }
  .card__title, .card--material__title {
    font-size: 20px;
  }

</style>
