<template>
  <v-ons-page modifier="white">
    <!--<div class="profile-pic">-->
      <!--<img src="../assets/vue-onsenui.png">-->
    <!--</div>-->

    <v-ons-list-title>Access</v-ons-list-title>
    <v-ons-list>
      <v-ons-list-item v-for="(item, index) in access" :key="item.title"
                       @click="loadView(index)"
      >
        <div class="left">
          <v-ons-icon fixed-width class="list-item__icon" :icon="item.icon"></v-ons-icon>
        </div>
        <div class="center">
          {{ item.title }}
        </div>
        <div class="right">
          <v-ons-icon icon="fa-link"></v-ons-icon>
        </div>
      </v-ons-list-item>
    </v-ons-list>

    <v-ons-list-title>Links</v-ons-list-title>
    <v-ons-list>
      <v-ons-list-item v-for="item in links" :key="item.title"
                       @click="loadLink(item.url)"
      >
        <div class="left">
          <v-ons-icon fixed-width class="list-item__icon" :icon="item.icon"></v-ons-icon>
        </div>
        <div class="center">
          {{ item.title }}
        </div>
        <div class="right">
          <v-ons-icon icon="fa-external-link"></v-ons-icon>
        </div>
      </v-ons-list-item>
    </v-ons-list>

    <div>Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>

  </v-ons-page>
</template>

<script>
  export default {
    methods: {
      loadView(index) {
        this.$store.commit('tabbar/set', index + 1);
        this.$store.commit('splitter/toggle');
      },
      loadLink(url) {
        window.open(url, '_blank');
      }
    },
    data() {
      return {
        links: [
          {
            title: 'Blog',
            icon: 'ion-social-wordpress-outline',
            url: 'http://marszm.cn/blog/wordpress/'
          }
        ],
        access: [
          {
            title: 'Home',
            icon: 'ion-home'
          },
          {
            title: 'Calendar',
            icon: 'ion-calendar'
          },
          {
            title: 'Charts',
            icon: 'ion-podium'
          }
        ]
      };
    }
  };
</script>

<style scoped>
  .profile-pic {
    width: 100%;
    background-color: #fff;
    border-bottom: 1px solid #DDD;
    color: rgba(0, 0, 0, .56);
    padding-bottom: 8px;
  }
  .page--material .profile-pic {
    background-color: #f6f6f6;
  }
  .profile-pic > img {
    display: block;
    max-width: 100%;
  }
</style>

<style>
  .page--material__background.page--white__background {
    background-color: #fff;
  }
</style>
