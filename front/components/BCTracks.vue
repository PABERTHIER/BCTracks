<template>
  <div class="bctracks">
    <Metamask :data="data" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Metamask from '~/components/Metamask.vue'
import { D, M, C, P } from '~/components/BCTracks.types'

export default Vue.extend<D, M, C, P>({
  components: {
    Metamask,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {}
  },
  computed: {},
  methods: {},
})
</script>

<style lang="scss" scoped></style>
