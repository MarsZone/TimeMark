<template>
  <v-ons-page>
    <v-ons-card v-for="task of taskList" :key="task.label"
    >
      <div class="title">{{ task.label }}</div>
    </v-ons-card>
  </v-ons-page>
</template>

<script>
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
    methods:{

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
  ons-card {
    cursor: pointer;
    color: #333;
    text-align: center;
  }
  .card__title, .card--material__title {
    font-size: 20px;
  }

</style>
