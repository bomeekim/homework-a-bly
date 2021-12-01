<template>
  <v-container class="mt-16">
    <v-row class="justify-center align-center">
      <v-card
        class="pa-4"
        max-width="500"
        flat
      >
        <v-card-title>
          STEP 3. 비밀번호 변경
        </v-card-title>
        <v-card-subtitle>
          진짜 마지막이에요! 비밀번호를 변경해주세요.
        </v-card-subtitle>
        <v-card-text>
          <v-form
            v-model="valid"
            class="my-4"
          >
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
            <v-text-field
              v-model="passwordConfirm"
              label="비밀번호"
              outlined
              placeholder="비밀번호를 한번 더 입력해주세요"
              :rules="[inputRules.required, inputRules.password]"
              :append-icon="showPasswordConfirm ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPasswordConfirm ? 'text' : 'password'"
              @click:append="showPasswordConfirm = !showPasswordConfirm"
            />
          </v-form>
          <v-btn
            height="50px"
            block
            depressed
            color="primary"
            :loading="loading"
            :disabled="password !== passwordConfirm || loading"
            @click="handleChangeButtonClick"
          >
            변경하기
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
export default class PasswordReset extends Vue {
  private valid = false;

  private password = '';

  private showPassword = false;

  private passwordConfirm = '';

  private showPasswordConfirm = false;

  private loading = false;

  private inputRules: Rule = rules;

  @Auth.Getter
  private submittedEmail!: string;

  @Auth.Getter
  private storedConfirmToken!: string;

  public handleChangeButtonClick(): void {
    if (this.valid) {
      // 버튼 로더 노출
      this.loading = true;

      // 패스워드 변경
      this.changePassword();
    }
  }

  public async changePassword(): Promise<void> {
    try {
      const { status } = await AUTH_API.CHANGE_PASSWORD({
        email: this.submittedEmail,
        confirmToken: this.storedConfirmToken,
        newPassword: this.password,
        newPasswordConfirm: this.passwordConfirm,
      });

      if (status === 200) {
        this.$swal('비밀번호가 변경되었습니다. 다시 로그인해주세요.')
          .then((result) => {
            if (result.isConfirmed) {
              // 확인버튼 클릭 시 로그인 화면으로 이동
              this.$router.push('/login');
            }
          });
      }
    } catch (e) {
      console.error(e);
      const { message } = e;
      this.$swal(message);
    } finally {
      this.loading = false;
    }
  }
}
</script>
