<template>
  <div class="bundle-element">
    <div v-if="bundle" class="bloc bloc-bundle">
      <div>
        <span v-t="'components.lastElements.name'" />
        {{ bundle[6] }}
      </div>
      <div>
        <span v-t="'components.lastElements.status'" />
        {{ bundle[9] }}
      </div>
      <div>
        <span v-t="'components.lastElements.certification'" />
        {{ bundle[10] }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { D, M, C, P } from '~/components/BundleElement.types'

export default Vue.extend<D, M, C, P>({
  components: {},
  props: {
    bundleId: {
      type: Number,
      required: true,
    },
    connection: {
      type: String,
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
  watch: {
    connection(newVal: string) {
      if (newVal === 'connected') {
        this.getBundle()
      }
    },
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
  .bloc-bundle {
    border: solid;
    border-radius: 30px;
    text-align: center;
    width: 150px;
  }
}
</style>
