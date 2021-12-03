<template>
  <v-menu
    offset-y
    rounded
  >
    <template v-slot:activator="{ on, attrs }">
      <v-avatar
        color="grey darken-1"
        :size="size"
        v-bind="attrs"
        v-on="on"
      >
        <img
          v-if="profileImage"
          :src="profileImage"
          :alt="name"
        >
      </v-avatar>
    </template>

    <v-list>
      <v-list-item @click="handleLogoutButtonClick">
        <v-list-item-title>로그아웃</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
// eslint-disable-next-line import/no-extraneous-dependencies
import { namespace } from 'vuex-class';
import AUTH_API from '@/api/auth';
import { ABLY_ACCESS_TOKEN } from '@/constants';

const Auth = namespace('Auth');

@Component
export default class AvatarMenu extends Vue {
  @Prop({ required: false })
  public profileImage!: string;

  @Prop({ required: true })
  public name!: string;

  @Prop({ default: '32' })
  public size!: string;

  @Auth.Action
  public clearAuthStore!: (lastConnectedAt?: number) => void;

  public async handleLogoutButtonClick(): Promise<void> {
    try {
      const { status, data: { lastConnectedAt } } = await AUTH_API.LOGOUT();

      if (status === 200 && lastConnectedAt) {
        setTimeout(async () => {
          // store 및 로컬스토리지 비우기
          this.clearAuthStore(lastConnectedAt);
          localStorage.removeItem(ABLY_ACCESS_TOKEN);

          // 라우터 이동
          await this.$router.push('/login');
        }, 500);
      }
    } catch (e) {
      console.error(e);
      const { message } = e;
      this.$swal(message);
    }
  }
}
</script>

<style scoped>
.v-list-item {
  min-height: 32px;
}

.v-list-item__title {
  font-size: 0.8em !important;
}
</style>
