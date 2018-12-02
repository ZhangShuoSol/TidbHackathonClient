<template>
  <div class="table-columns-item-field">
    <template v-if="col.Index.type === 0">{{col.Index.Key_name}}</template>
    <el-select
      v-else
      v-model="col.Index.type"
      placeholder="请选择"
      @change="onIndexTypeChange"
    >
      <el-option
        :key="1"
        label="index"
        :value="1">
      </el-option>
      <el-option
        :key="2"
        label="N/A"
        :value="2">
      </el-option>
    </el-select>
  </div>
</template>

<script>
  export default {
    name   : "TableColumnsItemField",
    props  : {
      col  : Object,
      index: Number,
    },
    methods: {
      onIndexTypeChange(select) {
        this.$emit('on-change-index-type', {
          col: this.col,
          select
        })
      }
    }
  }
</script>

<style lang='scss' rel="stylesheet/scss" type="text/scss">

</style>
