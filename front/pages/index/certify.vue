<template>
  <div class="child-page">
    <h1 v-t="'pages.index.certify.title'" />
    <div class="bloc-container">
      <div class="bloc">
        <div v-t="'pages.index.certify.bundleId'" />
        <div>
          <input v-model="bundleId" type="number" />
        </div>
      </div>
      <div v-if="hasBundleAvailable" class="bloc bloc-bundle">
        <div>
          <span v-t="'pages.index.certify.name'" />
          {{ bundle[6] }}
        </div>
        <div>
          <span v-t="'pages.index.certify.status'" />
          {{ bundle[9] }}
        </div>
        <div>
          <span v-t="'pages.index.certify.certification'" />
          {{ bundle[10] }}
        </div>
      </div>
      <div v-else class="no-bundle">{{ noBundle }}</div>
    </div>
    <button
      v-t="'pages.index.certify.certify_bundle'"
      :disabled="!hasBundleAvailable"
      class="certify-button"
      :class="{ clickable: hasBundleAvailable }"
      @click="certifyBundle()"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import { D, M, C, P } from '~/pages/index/certify.types'

export default Vue.extend<D, M, C, P>({
  components: {},
  props: {},
  data() {
    return {
      bundleId: 0,
      bundle: undefined,
    }
  },
  computed: {
    ...mapState('tracks', ['contractInstance']),
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
      return this.$t('pages.index.certify.no_bundle') as string
    },
  },
  watch: {
    bundleId(newVal: number) {
      if (newVal > 0) {
        this.getBundle()
      } else if (newVal <= 0) {
        this.bundle = undefined
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
    certifyBundle() {},
  },
})
</script>

<style lang="scss" scoped>
.child-page {
  .bloc-container {
    display: flex;
    margin-bottom: 15px;
    .bloc {
      width: 25%;
      margin-bottom: 10px;
    }
    .bloc-bundle {
      border: solid;
      border-radius: 30px;
      text-align: center;
    }
    .no-bundle {
      align-self: center;
      font-size: 18px;
    }
  }
  .certify-button {
    width: 150px;
    height: 35px;
    background-color: $grey;
    color: $white;
    border-radius: 5px;
    border: none;
    font-size: 15px;
    opacity: 0.5;
    cursor: not-allowed;
    &.clickable {
      background-color: $red;
      opacity: 0.7;
      cursor: pointer;
    }
  }
}
</style>
