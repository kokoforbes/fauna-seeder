<template>
  <div>
    <section
      :style="{ backgroundColor: '#' + repo.colorHex }"
      class="hero has-text-centered"
    >
      <div class="hero-body">
        <div class="container">
          <figure
            :style="{ maxWidth: '10%', margin: '0 auto' }"
            v-html="repo.svgLogo"
          ></figure>
          <h1 class="title has-text-light is-size-1">
            {{ repo.projectName }}
          </h1>
        </div>
      </div>
    </section>
    <section class="detai">
      <div v-if="!isLoading" class="container" :style="{ paddingTop: '2rem' }">
        <p>
          <span class="is-size-5">Description:</span> {{ repoData.description }}
        </p>
        <p>
          <span class="is-size-5">Stars:</span> {{ repoData.stargazers_count }}
        </p>
        <p><span class="is-size-5">Forks:</span> {{ repoData.forks_count }}</p>
      </div>
      <Loader v-else />
    </section>
  </div>
</template>
<script>
import Loader from '~/components/Loader.vue'
export default {
  components: {
    Loader,
  },
  asyncData({ payload }) {
    if (payload) return { repo: payload }
  },
  data() {
    return { repoData: {}, isLoading: false }
  },
  mounted() {
    this.$nextTick(async () => {
      const repoOwner = this.repo.owner
      const repoName = this.repo.name
      this.isLoading = true
      const result = await this.$axios.$get(
        `https://api.github.com/repos/${repoOwner}/${repoName}`
      )
      this.repoData = result
      this.isLoading = false
    })
  },
}
</script>
