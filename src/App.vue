<template>
  <div id="app">
    <LayoutContainer>
      <CollapsibleMenu slot="menu"/>
      <MainContainer slot="main">
        <LayoutContainerContentItem></LayoutContainerContentItem>
        <LayoutContainerContentItem></LayoutContainerContentItem>
      </MainContainer>
    </LayoutContainer>
  </div>
</template>

<script>
  import store           from './vuex';
  import HelloWorld      from './components/HelloWorld'
  import LayoutContainer from './components/Layout/LayoutContainer';
  import LayoutContainerContent from './components/Layout/LayoutContainerContent';
  import LayoutContainerContentItem from './components/Layout/LayoutContainerContentItem';

  import MainContainer from './components/Main';
  import CollapsibleMenu from './components/CollapsibleMenu';


  export default {
    name      : 'App',
    store,
    components: {
      HelloWorld,
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
