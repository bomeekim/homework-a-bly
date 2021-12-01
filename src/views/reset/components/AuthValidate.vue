<template>
  <v-container class="mt-16">
    <v-row class="justify-center align-center">
      <v-card
        class="pa-4"
        max-width="500"
        flat
      >
        <v-card-title>
          STEP 2. 인증 코드 확인
        </v-card-title>
        <v-card-subtitle>
          거의 다 왔어요! 이메일로 받은 인증 코드를 입력해주세요.
        </v-card-subtitle>
        <v-card-text>
          <v-text-field
            v-model="authCode"
            label="인증 코드"
            outlined
            placeholder="인증 코드를 입력해주세요"
            :rules="[inputRules.required, inputRules.number]"
          />
          <!--TODO 타이머 구현-->
          <h5>남은 시간 </h5>
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
import { Rule } from '@/views/Login.vue';
import AUTH_API from '@/api/auth';

const Auth = namespace('Auth');

// TODO 모듈화
export interface RuleFunction {
  (value: string): boolean | string;
}

@Component
export default class AuthValidate extends Vue {
  private authCode = '';

  private loading = false;

  private inputRules: Rule = rules;

  @Auth.Getter
  private submittedEmail!: string;

  @Auth.Getter
  private storedIssueToken!: string;

  @Auth.Mutation
  public setConfirmToken!: (newConfirmToken: string) => void;

  public handleNextButtonClick(): void {
    if (this.authCode) {
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
