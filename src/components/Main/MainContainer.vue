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
    <slot></slot>
  </LayoutContainerContent>
</template>

<script>
  import LayoutContainerContent               from '../Layout/LayoutContainerContent'
  import {mapState, mapActions, mapMutations} from 'vuex';
  import types                                from '../../vuex/types';


  export default {
    name      : "MainContainer",
    components: {
      LayoutContainerContent
    },
    computed  : {
      ...mapState([
        'sql'
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
