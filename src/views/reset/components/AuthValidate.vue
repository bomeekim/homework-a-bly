<template>
  <v-container class="mt-16">
    <v-row class="justify-center align-center">
      <v-card
        class="pa-4"
        max-width="500"
        width="400"
        flat
      >
        <v-card-title class="font-weight-bold">
          STEP 2. 인증 코드 확인
        </v-card-title>
        <v-card-subtitle>
          <p class="mt-3 mb-0">거의 다 왔어요! 😉</p>
          <p class="mb-0">이메일로 받은 인증 코드를 입력해주세요.</p>
        </v-card-subtitle>
        <v-card-text>
          <v-text-field
            v-model="authCode"
            label="인증 코드"
            outlined
            placeholder="인증 코드를 입력해주세요"
            hide-details
            :rules="[inputRules.required, inputRules.number]"
          />
          <v-row class="mx-3 mt-3 mb-7 justify-space-between">
            <p class="mb-0 text-caption font-weight-bold">남은 시간</p>
            <p
              class="mb-0 text-caption font-weight-bold"
              :class="{ 'pink--text': remainTime <= 30 }"
            >
              {{ minutes }} : {{ seconds }}
            </p>
          </v-row>
          <v-btn
            height="50px"
            block
            depressed
            color="primary"
            :loading="loading"
            :disabled="!authCode || loading"
            @click="handleNextButtonClick"
          >
            다음
          </v-btn>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
// eslint-disable-next-line import/no-extraneous-dependencies
import { namespace } from 'vuex-class';
import rules from '@/utils/rules';
import AUTH_API from '@/api/auth';
import { IRule } from '@/interfaces/rule';
import { convertedSingleDigitWithZero } from '@/utils/date';

const Auth = namespace('Auth');

@Component
export default class AuthValidate extends Vue {
  private authCode = '';

  private loading = false;

  private inputRules: IRule = rules;

  private remainTime = 0;

  private timer = 0;

  get minutes() {
    const minutes = Math.floor(this.remainTime / 60);
    return convertedSingleDigitWithZero(minutes);
  }

  get seconds() {
    const seconds = this.remainTime - (Number(this.minutes) * 60);
    return convertedSingleDigitWithZero(seconds);
  }

  @Auth.Getter
  private submittedEmail!: string;

  @Auth.Getter
  private storedIssueToken!: string;

  @Auth.Getter
  private storedRemainMillisecond!: number;

  @Auth.Mutation
  public setConfirmToken!: (newConfirmToken: string) => void;

  mounted() {
    if (this.storedRemainMillisecond) {
      this.remainTime = this.storedRemainMillisecond / 1000;
      this.startTimer();
    }
  }

  public startTimer(): void {
    this.timer = setInterval(() => {
      if (this.remainTime >= 1) {
        this.remainTime -= 1;
      } else {
        this.remainTime = 0;
        clearInterval(this.timer);

        this.$swal('시간이 초과되었습니다. 인증 코드를 다시 발급받아 주세요.').then((result) => {
          if (result.isConfirmed) {
            this.$router.go(-1);
          }
        });
      }
    }, 1000);
  }

  public handleNextButtonClick(): void {
    if (this.authCode) {
      // 타이머 클리어
      clearInterval(this.timer);

      // 버튼 로더 노출
      this.loading = true;

      // 인증코드 검증 요청
      this.validateAuthCode();
    }
  }

  public async validateAuthCode(): Promise<void> {
    try {
      const {
        status, data: { confirmToken },
      } = await AUTH_API.VALIDATE_AUTH_CODE({
        email: this.submittedEmail,
        authCode: this.authCode,
        issueToken: this.storedIssueToken,
      });

      if (status === 200 && confirmToken) {
        this.setConfirmToken(confirmToken);

        // 비밀번호 변경 페이지 이동
        await this.$router.push('/reset/password');
      }
    } catch (e) {
      console.error(e);
      const { message } = e;
      this.$swal(message).then((result) => {
        if (result.isConfirmed) {
          this.$router.go(-1);
        }
      });
    } finally {
      this.loading = false;
    }
  }
}
</script>
