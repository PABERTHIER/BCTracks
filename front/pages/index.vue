<template>
  <div class="page-container">
    <nuxt-link :to="playgroundLink">
      <slot>
        <button v-t="'miscellaneous.playground'" class="playground-button" />
      </slot>
    </nuxt-link>
    <div class="contract">
      <div class="bloc">
        <div v-t="'pages.default.bundleId'" />
        <div>
          <input v-model="data.bundleId" type="number" />
        </div>
      </div>
      <div class="bloc">
        <div v-t="'pages.default.bundleNumber'" />
        <div>
          <input v-model="data.bundleNumber" type="number" />
        </div>
      </div>
      <div class="bloc">
        <div v-t="'pages.default.productName'" />
        <div>
          <input v-model="data.productName" type="text" />
        </div>
      </div>
      <div class="bloc">
        <div v-t="'pages.default.productNumber'" />
        <div>
          <input v-model="data.productNumber" type="number" />
        </div>
      </div>
      <button
        v-t="'pages.default.add_product'"
        class="add-button"
        @click="addProduct()"
      />
    </div>
    <div class="enable">
      <button
        v-t="'miscellaneous.enable_eth'"
        class="enable-button"
        @click="getAccount()"
      />
    </div>
    <BCTracks v-if="web3" :data="web3" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import BCTracks from '~/components/BCTracks.vue'
import { D, M, C, P } from '~/pages/index.types'

export default Vue.extend<D, M, C, P>({
  components: {
    BCTracks,
  },
  data() {
    return {
      playgroundLink: '/playground/playground',
      data: {
        bundleId: 0,
        bundleNumber: 0,
        productName: '',
        productNumber: 0,
      },
    }
  },
  computed: {
    ...mapState('tracks', ['web3', 'contractInstance']),
  },
  mounted() {
    this.getContractInstance!()
  },
  methods: {
    ...mapActions('tracks', ['getAccount', 'getContractInstance']),
    async addProduct() {
      try {
        if (this.web3!.coinbase) {
          console.log(this.contractInstance())
          await this.contractInstance().Add_Bundle(
            this.data.bundleId,
            this.data.bundleNumber,
            this.data.productName,
            this.data.productNumber,
            {
              gas: 300000,
              from: this.web3!.coinbase,
            },
            (err, result) => {
              if (err) {
                const errorMsg = this.$t('miscellaneous.error') as string
                this.$notify(errorMsg, err.message, 'error', 5_000)
              } else {
                const successMsg = this.$t(
                  'pages.default.add_success'
                ) as string
                this.$notify(successMsg, '', 'success', 5_000)
              }
            }
          )
        }
      } catch (e) {
        const errorMsg = this.$t('miscellaneous.error') as string
        this.$notify(errorMsg, e, 'error', 5_000)
      }
    },
  },
  head() {
    return {
      title: this.$t('pages.default.title') as string,
    }
  },
})
</script>

<style lang="scss" scoped>
.playground-button,
.enable-button,
.add-button {
  width: 150px;
  height: 35px;
  background-color: $red;
  color: $white;
  border-radius: 5px;
  border: none;
  font-size: 15px;
  opacity: 0.7;
  cursor: pointer;
}
.contract {
  margin-top: 50px;
  .bloc {
    margin-bottom: 10px;
  }
}
.enable {
  margin-top: 50px;
  margin-bottom: 50px;
}
</style>
