<template>
  <v-avatar
    color="grey darken-1"
    :size="size"
  >
    <img
      v-if="profileImage"
      :src="profileImage"
      :alt="name"
    >
  </v-avatar>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Avatar extends Vue {
  @Prop({ required: false })
  public profileImage!: string;

  @Prop({ required: true })
  public name!: string;

  @Prop({ default: '32' })
  public size!: string;
}
</script>

<style scoped>

</style>
