<template>
  <div>
    <Table border ref="selection" :columns="Scolumns" :data="Sdata"></Table>
<br/><br/><br/>
    <Row>
      <Col span="6">&nbsp;</Col>
      <Col span="12"><Page @on-change="changepage" :page-size="page.pagesize" :total="page.total" show-elevator /></Col>
      <Col span="6">&nbsp;</Col>
    </Row><br/><br/>
    <Row>
      <Col span="9">&nbsp;</Col>
      <Col span="3"><Button @click="handleSelectAll(allSelect)">全选(不选)记录</Button>&nbsp;</Col>
      <Col span="3">&nbsp;<Button v-click-ctrl @click="delSelect">删除选中记录</Button></Col>
      <Col span="9">&nbsp;</Col>

    </Row>
  </div>
</template>

<script>
export default {
  mounted () {
    this.$axios.get(this.$backip + '/search/history/?page=1').then((res) => {
      this.Sdata = res.data.results
      this.page.total = res.data.count
    })
  },
  name: 'myhistory',
  data () {
    return {
      allSelect: false,
      page: {
        pagesize: 10,
        total: 0,
        pagenum: 1
      },
      result: {},
      Scolumns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '搜索时间',
          width: 260,
          key: 'generateTime',
          sortable: true
        },
        {
          title: '搜索内容',
          key: 'content'
        },
        {
          title: '记录编号',
          width: 100,
          key: 'id'
        }
      ],
      Sdata: []

    }
  },
  methods: {
    handleSelectAll () {
      this.$refs.selection.selectAll(this.allSelet)
      this.allSelet = !this.allSelet
    },
    delSelect () {
      this.$Message.success('删除所有事件')
      var sel = this.$refs.selection.getSelection()
      var res = []
      for (let i in sel) { console.log('ee:', sel[i].id); res.push(sel[i].id) }
      console.log(sel)
      console.log('res:', res)
      this.$axios({
        method: 'delete',
        url: this.$backip + '/search/history/destory/',
        data: { list: res }
      }).then((res) => {
        this.$axios.get(this.$backip + '/search/history/?page=' + this.page.pagenum).then((res) => {
          this.Sdata = res.data.results
          this.page.total = res.data.count
        })
      })
    },
    changepage (index) {
      this.$axios.get(this.$backip + '/search/history/?page=' + index).then((res) => {
        this.Sdata = res.data.results
        this.page.total = res.data.count
        this.page.pagenum = index
      })
    }
  }
}
</script>

<style scoped>

</style>
