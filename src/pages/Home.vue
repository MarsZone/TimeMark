<template>
  <v-ons-page>
    <p class="intro">
      This is a kitchen sink example that shows off the Vue bindings for Onsen UI.<br><br>
    </p>

    <v-ons-card v-for="page of pages" :key="page.label"
                @click="push(page.component, page.label)"
    >
      <div class="title">{{ page.label }}</div>
      <div class="content">{{ page.desc }}</div>
    </v-ons-card>
  </v-ons-page>
</template>

<script>

  export default {
    data () {
      return {
        pages: [

        ]
      };
    },
    methods: {
      push(page, key) {
        this.$store.onsui.commit('navigator/push', {
          extends: page,
          data() {
            return {
              toolbarInfo: {
                backLabel: 'Home',
                title: key
              }
            }
          }
        });
      }
    }
  };
</script>

<style>
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
  }
  .card__title, .card--material__title {
    font-size: 20px;
  }
</style>
