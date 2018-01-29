<template>
  <v-ons-page>
    <custom-toolbar backLabel="Me">
      {{ label }}
    </custom-toolbar>


  </v-ons-page>
</template>

<script>
    import axios from 'axios';
    import moment from 'moment';
    export default {
      data() {
        return {
          label:'',
        };
      },
    }
</script>

<style>

</style>
