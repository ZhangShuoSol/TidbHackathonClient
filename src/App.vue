<template>
  <div id="app">
    <LayoutContainer :visible.sync="menuVisible">
      <CollapsibleMenu slot="menu"/>
      <MainContainer slot="main">
        <LayoutContainerContentItem></LayoutContainerContentItem>
        <LayoutContainerContentItem></LayoutContainerContentItem>
      </MainContainer>
    </LayoutContainer>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex';
  import types from './vuex/types'

  import store           from './vuex';
  import LayoutContainer from './components/Layout/LayoutContainer';
  import LayoutContainerContent from './components/Layout/LayoutContainerContent';
  import LayoutContainerContentItem from './components/Layout/LayoutContainerContentItem';

  import MainContainer from './components/Main';
  import CollapsibleMenu from './components/CollapsibleMenu';


  export default {
    name      : 'App',
    store,
    computed: {
      ...mapState([
        'menuVisible',
      ]),
      menuVisible: {
        get() {return this.$store.state.menuVisible;},
        set(val) {this.$store.commit(types.MUTATION.STORE_MENU_VISIBLE_STATE, val);}
      }
    },
    methods: {
      // ...mapMutations({
      //   toggleVisibleState: types.MUTATION.STORE_MENU_VISIBLE_STATE
      // })
    },
    components: {
      LayoutContainer,
      LayoutContainerContent,
      LayoutContainerContentItem,

      CollapsibleMenu,
      MainContainer,
    }
  }
</script>

<style>
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
  #app {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
</style>
