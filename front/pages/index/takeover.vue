<template>
  <div class="child-page">
    <h1 v-t="'pages.index.takeover.title'" />
    <div class="bloc-container">
      <div class="bloc">
        <div v-t="'pages.index.takeover.bundleId'" />
        <div>
          <input v-model="bundleId" type="number" />
        </div>
        <div v-t="'pages.index.takeover.addressdelivery'" />
        <div>
          <input v-model="bundleId" type="number" />
        </div>
      </div>
      <div v-if="hasBundleAvailable" class="bloc bloc-bundle">
        <div>
          <span v-t="'pages.index.takeover.name'" />
          {{ bundle[6] }}
        </div>
        <div>
          <span v-t="'pages.index.takeover.status'" />
          {{ bundle[9] }}
        </div>
        <div>
          <span v-t="'pages.index.takeover.certification'" />
          {{ bundle[10] }}
        </div>
      </div>
      <div v-else class="no-bundle">{{ noBundle }}</div>
    </div>
    <button
      v-t="'pages.index.takeover.submit_takeover_bundle'"
      :disabled="hasBundleAvailable"
      class="submit-button"
      :class="{ clickable: !hasBundleAvailable }"
      @click="submitTakeover()"
    />
    <button
      v-t="'pages.index.takeover.delivery_takeover_bundle'"
      :disabled="hasBundleAvailable"
      class="delivery-button"
      :class="{ clickable: !hasBundleAvailable }"
      @click="submitTakeover()"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { D, M, C, P } from '~/pages/index/takeover.types'

export default Vue.extend<D, M, C, P>({
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  methods: {},
})
</script>

<style lang="scss" scoped></style>
