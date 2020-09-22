<template>
  <div class="last-elements">
    <BundleElement :bundle-id="2" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import BundleElement from '~/components/BundleElement.vue'
import { D, M, C, P } from '~/pages/index/LastElements.types'

export default Vue.extend<D, M, C, P>({
  components: {
    BundleElement,
  },
  props: {
    numberOfElements: {
      type: Number,
      required: true,
    },
    totalBundle: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      bundleId: 0,
      bundle: undefined,
    }
  },
  computed: {
    // ...mapState('tracks', ['contractInstance']),
    hasBundleAvailable() {
      if (
        this.bundle &&
        this.bundle.length === 11 &&
        this.bundle[6] !== '' &&
        this.bundle[9] === 'Available'
      ) {
        return true
      }
      return false
    },
    noBundle() {
      return this.$t('pages.components.LastElements.no_bundle') as string
    },
  },
  methods: {},
})
</script>

<style lang="scss" scoped>
.last-elements {
  width: 100%;
  height: 100%;
}
</style>
