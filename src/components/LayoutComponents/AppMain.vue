<template>
    <v-main  class="background-color">
      <v-container
        class="scroll-y"
        
        fluid
      >
        <transition name="fade" mode="out-in">
          <router-view  :key="$route.path" />
        </transition>
      </v-container>
        <v-btn
          v-scroll="onScroll"
          bottom
          color="red"
          dark
          fab
          fixed
          right
          @click="toTop"
          class="clickable"
        >
          <v-icon>mdi-chevron-up</v-icon>
        </v-btn>
    </v-main>
</template>

<script>
export default {
    methods:{
        onScroll(e){
            if(typeof window === 'undefined') return
            const top = window.pageYOffset || e.target.scrollTop || 0
            this.fab = top > 20
        },
        toTop(){
            this.$vuetify.goTo(0)
        },
    }
}
</script>

<style>
  .background-color{
    background-color: #FAFAFA;
  }
</style>