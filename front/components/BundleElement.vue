<template>
  <div class="bundle-element">
    <div v-if="bundle" class="bloc bloc-bundle">
      <div>
        <span v-t="'pages.components.LastElements.name'" />
        {{ bundle[6] }}
      </div>
      <div>
        <span v-t="'pages.components.LastElements.status'" />
        {{ bundle[9] }}
      </div>
      <div>
        <span v-t="'pages.components.LastElements.certification'" />
        {{ bundle[10] }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { D, M, C, P } from '~/pages/index/BundleElement.types'

export default Vue.extend<D, M, C, P>({
  components: {},
  props: {
    bundleId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      bundle: undefined,
    }
  },
  computed: {
    ...mapState('tracks', ['contractInstance']),
  },
  mounted() {
    this.getBundle()
  },
  methods: {
    async getBundle() {
      try {
        await this.contractInstance().bundles.call(
          this.bundleId,
          (err, result) => {
            if (err) {
              const errorMsg = this.$t('miscellaneous.error') as string
              this.$notify(errorMsg, err.message, 'error', 5_000)
            } else {
              this.bundle = result
            }
          }
        )
      } catch (e) {
        const errorMsg = this.$t('miscellaneous.error') as string
        this.$notify(errorMsg, e, 'error', 5_000)
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.bundle-element {
  width: 100%;
  height: 100%;
}
</style>
