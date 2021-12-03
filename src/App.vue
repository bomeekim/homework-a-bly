<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
// eslint-disable-next-line import/no-extraneous-dependencies
import { namespace } from 'vuex-class';

const Common = namespace('Common');

@Component
export default class App extends Vue {
  get isLoggedIn(): boolean {
    return !/login|reset/g.test(this.$route.path);
  }

  @Common.Mutation
  public setIsMobile!: (newIsMobile: boolean) => void;

  mounted() {
    this.setIsMobile(this.$vuetify.breakpoint.mobile);
  }
}
</script>
