<template>
  <LayoutContainerContentItem>
    <SqlExplainTree></SqlExplainTree>
  </LayoutContainerContentItem>
</template>

<script>
  import LayoutContainerContentItem from '../../Layout/LayoutContainerContentItem';
  import SqlExplainTree from '../../Chart/SqlExplainTree';


  export default {
    name      : "MainContainerItem",
    components: {
      LayoutContainerContentItem,
      SqlExplainTree,
    }
  }
</script>

<style lang='scss' rel="stylesheet/scss" type="text/scss">

</style>
