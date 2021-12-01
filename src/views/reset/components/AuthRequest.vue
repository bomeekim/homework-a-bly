<template>
  <v-container class="mt-16">
    <v-row class="justify-center align-center">
      <v-card
        class="pa-4"
        max-width="500"
        flat
      >
        <v-card-title>
          STEP 1. 인증코드 발급
        </v-card-title>
        <v-card-subtitle>
          인증코드를 발급받을 이메일을 입력해주세요.
        </v-card-subtitle>
        <v-card-text>
          <v-text-field
            v-model="email"
            label="이메일"
            outlined
            placeholder="이메일을 입력해주세요"
            :rules="[inputRules.required, inputRules.email]"
          />
          <v-btn
            height="50px"
            block
            depressed
            color="primary"
            :loading="loading"
            :disabled="!email || loading"
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
export default class AuthRequest extends Vue {
  private email = '';

  private loading = false;

  private inputRules: Rule = rules;

  @Auth.Mutation
  public setIssueToken!: (newIssueToken: string) => void;

  @Auth.Mutation
  public setRemainMillisecond!: (newRemainMillisecond: string) => void;

  public handleNextButtonClick(): void {
    // 버튼 로더 노출
    this.loading = true;

    // 인증코드 발급 요청
    this.requestAuthCode();
  }

  public async requestAuthCode(): Promise<void> {
    try {
      const {
        status,
        data: { issueToken, remainMillisecond },
      } = await AUTH_API.REQUEST_AUTH_CODE(this.email);

      if (status === 200 && issueToken && remainMillisecond) {
        this.setIssueToken(issueToken);
        this.setRemainMillisecond(remainMillisecond);
      }
    } catch (e) {
      console.error(e);
      const { message } = e;
      this.$swal(message);
    }
  }
}
</script>
