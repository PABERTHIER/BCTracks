<template>
  <div class="metamask">
    <p>Metamask: {{ data.isInjected }}</p>
    <p>Network: {{ network }}</p>
    <p>Account: {{ data.coinbase }}</p>
    <p>Balance: {{ balance }}</p>
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

<style lang="sccs" scoped></style>
