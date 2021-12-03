<template>
  <v-row class="justify-center">
    <v-col
      cols="12"
      sm="8"
    >
      <v-sheet
        min-height="70vh"
        rounded="lg"
        class="pa-5"
      >
        <v-card flat>
          <v-card-title class="flex font-weight-bold align-end">
            {{ userInfo.name }}님! 환영합니다
            <span class="ml-2">
              <v-img
                src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/party-popper_1f389.png"
                height="30px"
                width="30px"
                contain
              />
            </span>
            <v-spacer/>
            <p class="text-date-caption grey--text mb-0">
              마지막 접속 일자: {{ convertedLastConnectedAt }}
            </p>
          </v-card-title>
          <v-card-text class="mt-10">
            <v-row class="ma-0 lex flex-column justify-center align-center">
              <v-col xl="4" lg="4" class="text-center">
                <avatar
                  :name="userInfo.name"
                  :profile-image="userInfo.profileImage"
                  size="150"
                />
              </v-col>
              <v-col class="text-center">
                <p class="text-h6 font-weight-bold mt-2 mb-1 black--text">{{ userInfo.name }}</p>
                <p class="mb-2">{{ userInfo.email }}</p>
              </v-col>
            </v-row>
            <v-row
              class="flex justify-space-between mt-xl-5 mt-lg-5 mx-xl-10 mx-lg-10"
            >
              <v-btn
                v-for="{ name, value, icon } in buttonList"
                :key="name"
                depressed
                color="transparent"
                x-large
              >
                <v-icon class="mr-1">{{ icon }}</v-icon>
                <span class="text-body-2 mr-3">{{ name }}</span>
                <span class="font-weight-bold pink--text">{{ value | comma }}</span>
              </v-btn>
            </v-row>
          </v-card-text>
        </v-card>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Avatar from '@/components/Avatar.vue';
import { IUserInfo } from '@/interfaces/userInfo';
import { getConvertedTimestamp } from '@/utils/date';

export interface IButton {
  name: string,
  value: string | number,
  icon: string,
}

@Component({
  components: {
    Avatar,
  },
})
export default class Profile extends Vue {
  @Prop({ required: false })
  public userInfo!: IUserInfo;

  private buttonList: IButton[] = [
    { name: '회원등급', value: 'VVIP', icon: 'mdi-crown-outline' },
    { name: '쿠폰', value: 3, icon: 'mdi-ticket-percent' },
    { name: '포인트', value: 15300, icon: 'mdi-alpha-p-box-outline' },
  ];

  get convertedLastConnectedAt(): string {
    return getConvertedTimestamp(this.userInfo.lastConnectedAt);
  }
}
</script>

<style scoped>
.text-date-caption {
  font-size: 0.1rem;
  font-weight: 400;
  line-height: 1.25rem;
  letter-spacing: 0.0333333333em;
}
</style>
