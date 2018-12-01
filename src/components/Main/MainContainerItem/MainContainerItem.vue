<template>
  <LayoutContainerContentItem>
    <SqlExplainTree
      :data="treeData"
      v-if="treeData"
    />
  </LayoutContainerContentItem>
</template>

<script>
  import LayoutContainerContentItem from '../../Layout/LayoutContainerContentItem';
  import SqlExplainTree             from '../../Chart/SqlExplainTree';


  export default {
    name      : "MainContainerItem",
    props     : {
      treeData: [Object, null]
    },
    components: {
      LayoutContainerContentItem,
      SqlExplainTree,
    }
  }
</script>

<style lang='scss' rel="stylesheet/scss" type="text/scss">

</style>
