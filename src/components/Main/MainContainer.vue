<template>
  <LayoutContainerContent>
    <el-input
      placeholder="请输入内容"
      v-model="sqlModel"
      clearable
      slot="top"
    >
      <el-button slot="append" icon="el-icon-search" @click="executeSql"></el-button>
    </el-input>
    <template>
      <MainContainerItem :treeData="treeNode" />
    </template>
  </LayoutContainerContent>
</template>

<script>
  import LayoutContainerContent               from '../Layout/LayoutContainerContent'
  import MainContainerItem                    from './MainContainerItem'
  import {mapState, mapActions, mapMutations} from 'vuex';
  import types                                from '../../vuex/types';


  export default {
    name      : "MainContainer",
    components: {
      LayoutContainerContent,
      MainContainerItem,
    },
    computed  : {
      ...mapState([
        'sql',
        'treeNode',
      ]),
      sqlModel: {
        get() {return this.sql;},
        set(val) {this.$store.commit(types.MUTATION.STORE_SQL, val);}
      }
    },
    methods   : {
      ...mapActions({
        executeSql: types.ACTION.EXECUTE_SQL,
      })
    }
  }
</script>

<style lang='scss' rel="stylesheet/scss" type="text/scss">

</style>
