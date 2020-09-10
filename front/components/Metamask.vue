<template>
  <div class="metamask">
    <p>Metamask: {{ data.isInjected }}</p>
    <p>Network: {{ data.networkId }}</p>
    <p>Account: {{ data.coinbase }}</p>
    <p>Balance: {{ data.balance }}</p>
    <!-- Todo: pb unité -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
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
  computed: {},
  methods: {},
})
</script>

<style lang="sccs" scoped></style>
