<template>
  <div id="app">
    <LayoutContainer>
      <LayoutContainerContent slot="main"></LayoutContainerContent>
    </LayoutContainer>
  </div>
</template>

<script>
  import store           from './vuex';
  import HelloWorld      from './components/HelloWorld'
  import LayoutContainer from './components/Layout/LayoutContainer';
  import LayoutContainerContent from './components/Layout/LayoutContainerContent';


  export default {
    name      : 'App',
    store,
    components: {
      HelloWorld,
      LayoutContainer,
      LayoutContainerContent,
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
