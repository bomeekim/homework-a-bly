<template>
  <v-app id="inspire">
    <v-app-bar
      app
      color="white"
      flat
    >
      <!--모바일이 아닌 경우 상단 왼쪽에 로고를 표시한다.-->
      <v-img
        v-if="!storedIsMobile"
        src="../assets/images/image-logo.jpg"
        width="120px"
        alt="logo"
      />

      <v-tabs
        v-model="currentTab"
        class="ml-n9"
        :class="{ 'px-10': !storedIsMobile, 'pr-10': storedIsMobile }"
        color="grey darken-1"
        centered
      >
        <v-tab
          v-for="link in links"
          :key="link"
        >
          {{ link }}
        </v-tab>
      </v-tabs>

      <avatar-menu
        class="hidden-sm-and-down"
        :name="storedUserInfo.name"
        :profile-image="storedUserInfo.profileImage" />
    </v-app-bar>

    <v-main class="grey lighten-3 pt-4">
      <v-container>
        <v-tabs-items v-model="currentTab">
          <v-tab-item
            v-for="link in links"
            :key="link"
          >
            <component
              :is="tabList[currentTab]"
              :user-info="storedUserInfo"
            />
          </v-tab-item>
        </v-tabs-items>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
// eslint-disable-next-line import/no-extraneous-dependencies
import { namespace } from 'vuex-class';
import AvatarMenu from '@/components/AvatarMenu.vue';
import Profile from '@/views/Profile.vue';
import AUTH_API from '@/api/auth';
import { IUserInfo } from '@/interfaces/userInfo';

const Common = namespace('Common');
const Auth = namespace('Auth');

@Component({
  components: {
    AvatarMenu,
    Profile,
  },
})
export default class Home extends Vue {
  private links: string[] = [
    'Profile',
    'My Shopping',
    'My Reviews',
    'Settings',
  ];

  private tabList: string[] = [
    'Profile',
  ];

  private currentTab = 0;

  mounted() {
    this.getUserInfo();
  }

  @Common.Getter
  public storedIsMobile!: boolean;

  @Auth.Getter
  public storedUserInfo!: IUserInfo;

  @Auth.Mutation
  public setUserInfo!: (newUserInfo: IUserInfo) => void;

  public async getUserInfo(): Promise<void> {
    try {
      const { status, data } = await AUTH_API.USER_INFO();

      if (status === 200 && data) {
        this.setUserInfo({
          email: data.email,
          lastConnectedAt: data.lastConnectedAt,
          name: data.name,
          profileImage: data.profileImage,
        });
      }
    } catch (e) {
      const { message } = e;
      this.$showAlertModal(message).then((result) => {
        if (result.isConfirmed) {
          this.$router.push('/login');
        }
      });
    }
  }
}
</script>

<style scoped>
.v-tabs-items {
  background-color: transparent !important;
}
</style>
