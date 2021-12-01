<template>
  <div class="container login-wrapper">
    <v-row
      class="align-center"
      :class="{
        'justify-center': isMobile,
        'justify-start pl-50': !isMobile
      }"
    >
      <v-card
        class="pa-4"
        max-width="500"
        :width="isMobile ? 300 : 360"
        flat
        color="white"
        rounded="xl"
      >
        <v-card-title>
          <v-img
            height="90px"
            src="../assets/images/image-logo-transparent.png"
          />
        </v-card-title>
        <v-card-text>
          <v-form
            v-model="valid"
            class="my-4"
          >
            <v-text-field
              v-model="email"
              label="아이디"
              outlined
              placeholder="이메일을 입력해주세요"
              :rules="[inputRules.required, inputRules.email]"
            />
            <v-text-field
              v-model="password"
              label="비밀번호"
              outlined
              placeholder="비밀번호를 입력해주세요"
              :rules="[inputRules.required, inputRules.password]"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
            />
          </v-form>
          <v-btn
            height="50px"
            block
            depressed
            color="primary"
            :disabled="!valid"
            @click="handleLoginButtonClick"
          >
            로그인
          </v-btn>
        </v-card-text>
        <v-card-actions class="px-4 py-6 justify-center">
          <p class="mb-0 text-caption">비밀번호를 잊으셨나요?</p>
          <v-btn
            color="primary"
            small
            text
            @click="handlePasswordResetButtonClick"
          >
            다시 설정하기
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
// eslint-disable-next-line import/no-extraneous-dependencies
import { namespace } from 'vuex-class';
import rules from '@/utils/rules';
import AUTH_API from '@/api/auth';
import { ABLY_ACCESS_TOKEN } from '@/constants';

const Auth = namespace('Auth');

export interface RuleFunction {
  (value: string): boolean | string;
}

export interface Rule {
  [key: string]: RuleFunction,
}

@Component
export default class Login extends Vue {
  private valid = false;

  private email = '';

  private password = '';

  private showPassword = false;

  private inputRules: Rule = rules;

  get isMobile(): boolean {
    return this.$vuetify.breakpoint.mobile;
  }

  @Auth.Mutation
  public setAccessToken!: (newAccessToken: string) => void;

  public handleLoginButtonClick(): void {
    if (this.valid) {
      this.login();
    }
  }

  public handlePasswordResetButtonClick(): void {
    this.$router.push('/reset');
  }

  public async login(): Promise<void> {
    try {
      const { status, data: { accessToken } } = await AUTH_API.LOGIN({
        email: this.email,
        password: this.password,
      });

      if (status === 200 && accessToken) {
        // store, localStorage 저장
        this.setAccessToken(accessToken);
        localStorage.setItem(ABLY_ACCESS_TOKEN, accessToken);

        // 라우터 이동
        await this.$router.push('/');
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
.login-wrapper {
  height: 100vh;
  width: 100%;
  max-width: 100%;
  position: relative;
}

.login-wrapper::before {
  content: "";
  background-image: url(../assets/images/image-background.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  filter: brightness(.8);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.login-wrapper > .row {
  height: inherit;
}

@media (min-width: 1024px) {
  .login-wrapper::before {
    background-image: url(../assets/images/image-background.jpg);
  }
}

@media (max-width: 767px) {
  .login-wrapper::before {
    background-image: url(../assets/images/image-background-750px.jpg);
  }
}

.v-card {
  opacity: 0.95;
}

.pl-50 {
  padding-left: 200px;
}
</style>
