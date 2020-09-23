<template>
  <div v-if="totalBundle !== 0" class="last-elements">
    <div v-for="element in numberOfElements" :key="element.id">
      <BundleElement
        :connection="connection"
        :bundle-id="1 + totalBundle - element"
        :is-reloading="isReloading"
        class="element"
        @reloaded="reloaded"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import BundleElement from '~/components/BundleElement.vue'
import { D, M, C, P } from '~/components/LastElements.types'

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
    connection: {
      type: String,
      required: true,
    },
    isReloading: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      bundle: undefined,
    }
  },
  computed: {
    totalElement() {
      return 1 + this.totalBundle - this.numberOfElements
    },
  },
  methods: {
    reloaded(bundleId: number) {
      if (bundleId === this.totalElement) {
        this.$emit('reloaded')
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.last-elements {
  display: flex;
  margin-top: 25px;
  .element {
    margin-right: 10px;
  }
}
</style>
