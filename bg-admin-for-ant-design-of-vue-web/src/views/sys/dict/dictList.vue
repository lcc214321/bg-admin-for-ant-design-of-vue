<template>
  <a-card title="字典管理">
    <div>
      <div style="display: inline-block;float: left;">
        <a-button type="primary">新增</a-button>
        <a-button type="primary">修改</a-button>
        <a-button type="primary">删除</a-button>
      </div>
      <div style="display: inline-block;float: right;">
        212
      </div>
    </div>
    <div style="margin-top: 50px;">
      <a-table :columns="columns" :dataSource="data" bordered>
      </a-table>
    </div>

  </a-card>
</template>
<script>
  export default {
    data() {
      return {
        current: 1,
        columns: [
          {
            title: 'name',
            dataIndex: 'name',
            width: '25%',
            scopedSlots: {customRender: 'name'}
          }
        ],
        data: []
      }
    }
  }
</script>
