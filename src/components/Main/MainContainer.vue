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
      <MainContainerItem
        v-for="(treeNode, index) in treeNodes"
        :key="treeNodes.uuid"
        :treeData="treeNode"
        :index="index"
        @on-plan-show="setMenuVisible(false)"
      />
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
        'treeNodes',
      ]),
      sqlModel: {
        get() {return this.sql;},
        set(val) {this.$store.commit(types.MUTATION.STORE_SQL, val);}
      }
    },
    methods   : {
      ...mapActions({
        executeSql: types.ACTION.EXECUTE_SQL,
      }),
      ...mapMutations({
        setMenuVisible: types.MUTATION.STORE_MENU_VISIBLE_STATE,
      })
    }
  }
</script>

<style lang='scss' rel="stylesheet/scss" type="text/scss">

</style>
