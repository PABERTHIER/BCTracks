<template>
  <div class="bundle-element">
    <div v-if="bundle && bundle[6] !== ''" class="bloc-bundle">
      <div>
        <span v-t="'components.lastElements.name'" />
        {{ bundle[6] }}
      </div>
      <div>
        <span v-t="'components.lastElements.date'" />
        {{ date }}
      </div>
      <div>
        <span v-t="'components.lastElements.nb_products'" />
        {{ bundle[7].c[0] }}
      </div>
      <div>
        <span v-t="'components.lastElements.nb_bundles'" />
        {{ bundle[5].c[0] }}
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
    <div v-else-if="bundleData && bundleData[6] !== ''" class="bloc-bundle">
      <div>
        <span v-t="'components.lastElements.name'" />
        {{ bundleData[6] }}
      </div>
      <div>
        <span v-t="'components.lastElements.date'" />
        {{ date }}
      </div>
      <div>
        <span v-t="'components.lastElements.nb_products'" />
        {{ bundleData[7].c[0] }}
      </div>
      <div>
        <span v-t="'components.lastElements.nb_bundles'" />
        {{ bundleData[5].c[0] }}
      </div>
      <div>
        <span v-t="'components.lastElements.status'" />
        {{ bundleData[9] }}
      </div>
      <div>
        <span v-t="'components.lastElements.certification'" />
        {{ bundleData[10] }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { formatDate } from '~/helpers/date'
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
      required: false,
      default: '',
    },
    bundleData: {
      type: Object,
      required: false,
      default: undefined,
    },
  },
  data() {
    return {
      bundle: undefined,
    }
  },
  computed: {
    ...mapState('tracks', ['contractInstance']),
    date() {
      if (this.bundle && this.bundle.length === 11) {
        return formatDate(this.bundle[8].c[0])
      } else if (this.bundleData && this.bundleData.length === 11) {
        return formatDate(this.bundleData[8].c[0])
      }
      return '--/--/--'
    },
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
    padding: 30px;
    border: solid;
    border-radius: 30px;
    text-align: left;
    width: 300px;
  }
}
</style>
