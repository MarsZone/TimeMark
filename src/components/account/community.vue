<template>
  <v-ons-page>
    <custom-toolbar backLabel="Me">
      {{ label }}
    </custom-toolbar>

  </v-ons-page>
</template>

<script>
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
