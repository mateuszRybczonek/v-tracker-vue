<template>
  <svg
    @mouseenter="makeSmoke"
    xmlns="http://www.w3.org/2000/svg"
    width="200"
    height="200"
    viewBox="0 0 76 76"
    aria-labelledby="smoking-ship"
    role="presentation"
    >

    <g ref="originalship">
      <path fill="#999" d="M 47.9513,35.922C 47.9513,34.2839 47.1908,33.4649 45.6697,33.4649C 44.1346,33.4649 43.367,34.2839 43.367,35.922C 43.367,37.5928 44.1346,38.4282 45.6697,38.4282C 47.1908,38.4282 47.9513,37.5928 47.9513,35.922 Z M 20.5833,53.8333L 15.8333,38L 25.3333,38L 25.3333,28.5L 30.0833,28.5L 32.4583,20.5833L 38,20.5833L 38,28.5L 50.6667,28.5L 50.6667,33.25L 55.4167,33.25L 55.4167,38L 60.1667,38L 55.4167,53.8333L 20.5833,53.8333 Z M 40.4887,35.922C 40.4887,34.2839 39.7282,33.4649 38.2071,33.4649C 36.6579,33.4649 35.8834,34.2839 35.8834,35.922C 35.8834,37.5928 36.6579,38.4282 38.2071,38.4282C 39.7282,38.4282 40.4887,37.5928 40.4887,35.922 Z M 33.1595,35.922C 33.1595,34.2839 32.3849,33.4649 30.8358,33.4649C 29.2866,33.4649 28.512,34.2839 28.512,35.922C 28.512,37.5928 29.2866,38.4282 30.8358,38.4282C 32.3849,38.4282 33.1595,37.5928 33.1595,35.922 Z "/>
    </g>
    <g ref="smoke">
      <g ref="smoke1" id="smoke1">
        <circle cx="28" cy="6" r="3" transform="translate(10 10)" fill="#999"/>
      </g>
      <g ref="smoke2" id="smoke2">
        <circle cx="31" cy="4" r="4" transform="translate(10 10)" fill="#999"/>
      </g>
      <g ref="smoke3" id="smoke3">
        <circle cx="35" cy="2" r="5" transform="translate(10 10)" fill="#999"/>
      </g>
      <g ref="smoke4" id="smoke4">
        <circle cx="39" cy="0" r="6" transform="translate(10 10)" fill="#999"/>
      </g>
    </g>
  </svg>
</template>

<script>
import { TweenMax, TimelineMax, Sine } from 'gsap'

export default {
  methods: {
    makeSmoke() {
      TweenMax.killAll()
      const tl = new TimelineMax()
      tl.add('start')
      this.pitchVessel(tl)
      this.addSmoke(tl, this.$refs.smoke1, 0.3)
      this.addSmoke(tl, this.$refs.smoke2, 1.6)
      this.addSmoke(tl, this.$refs.smoke3, 2.9)
      this.addSmoke(tl, this.$refs.smoke4, 4.2)
    },

     addSmoke(tl, el, delay) {
      tl.fromTo(
        el,
        1,
        {
          opacity: 0
        },
        {
          opacity: 1,
          ease: Sine.easeOut
        },
        `start+=${delay}`
      )

      tl.fromTo(
        el,
        1,
        {
          scale: 1
        },
        {
          scale: 1.1,
          repeat: 10,
          yoyo: true,
          transformOrigin: '50% 50%',
          ease: Sine.easeInOut
        },
        `start+=${delay+0.3}`
      )
    },

    pitchVessel(tl) {
      tl.fromTo(
        this.$refs.originalship,
        1,
        {
          rotation: 0
        },
        {
          rotation: 2,
          repeat: 15,
          yoyo: true,
          transformOrigin: '50% 50%',
          ease: Sine.easeInOut
        },
        'start+=0.3'
      )
    }
  }
}
</script>

<style scoped>
  #smoke1, #smoke2, #smoke3, #smoke4 {
      opacity: 0;
  }
</style>
