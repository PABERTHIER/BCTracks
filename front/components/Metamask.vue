<template>
  <div class="metamask">
    <div class="container">
      <div v-t="'components.metamask.metamask'" class="header" />
      <div>{{ data.isInjected }}</div>
    </div>
    <div class="container">
      <div v-t="'components.metamask.network'" class="header" />
      <div>{{ network }}</div>
    </div>
    <div class="container">
      <div v-t="'components.metamask.account'" class="header" />
      <div>{{ data.coinbase }}</div>
    </div>
    <div class="container">
      <div v-t="'components.metamask.balance'" class="header" />
      <div>{{ balance }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { NETWORKS } from '~/utils/constants/network'
import { D, M, C, P } from '~/components/Metamask.types'

export default Vue.extend<D, M, C, P>({
  components: {},
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {}
  },
  computed: {
    network() {
      return NETWORKS[this.data.networkId]
    },
    balance() {
      return this.data.balance / 1000000000000000000
    },
  },
  methods: {},
})
</script>

<style lang="scss" scoped>
.metamask {
  .container {
    display: flex;
    .header {
      margin-right: 5px;
    }
  }
}
</style>
