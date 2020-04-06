<template>
  <div>
    <!-- todo 自动补全数据放到后端 -->
    <AutoComplete
      @on-search="autocomplete"
      @keyup.enter.native="submit('all')"
      v-model="kwords"
      icon="ios-search"
      placeholder="  你搜你🐴 呢?  "
      class="searchClass optionClass iconClass" >
      <div class="demo-auto-complete-item" >
        <div class="demo-auto-complete-group">
          <span>{{ tip[0].title }}</span>
          <a @click="submit('article')" target="_blank">更多</a>
        </div >
        <Option v-for="(option,index) in tip[0].children" :value="option.title" :key="option.title" style="height: 35px">
          <span class="demo-auto-complete-title" @click="optionSubmit(0,index,'article')">{{ option.title }}</span>
          <span class="demo-auto-complete-count">{{ option.count }}个结果</span>
        </Option>
        <div class="demo-auto-complete-group">
          <span>{{ tip[1].title }}</span>
          <a @click="submit('question')" target="_blank">更多</a>
        </div >
        <Option v-for="(option,index) in tip[1].children" :value="option.title" :key="option.title" style="height: 35px">
          <span class="demo-auto-complete-title" @click="optionSubmit(1,index,'question')">{{ option.title }}</span>
          <span class="demo-auto-complete-count">{{ option.count }}个结果</span>
        </Option>
      </div>
      <Button v-click-ctrl
              @click="submit('all')"
              style="width: 20%"
              type="warning"><B>搜索</B>
      </Button>
    </AutoComplete>
  </div>
</template>

<script>
export default {
  name: 'searchFrame',
  props: ['kw', 'isrespage'],
  data () {
    return {
      kwords: this.kw,
      type: 'all',
      tip: [
        {
          title: '文章',
          type: 'article',
          children: [
            {
              title: ' ',
              count: 0
            }
          ]
        },
        {
          title: '问题',
          type: 'question',
          children: [
            {
              title: '',
              count: 0
            }
          ]
        }
      ]
    }
  },
  methods: {
    optionSubmit (index1, index2, type) {
      console.log(index1, index2, type)
      this.kwords = this.tip[index1].children[index2].title
      this.submit(type)
      if (this.isrespage === 1) {
        console.log('aaaaa')
        location.reload()
      }
    },
    submit (type) {
      this.type = type
      if (this.kwords !== '') {
        console.log(this.kwords, this.type)
        this.$router.push({ path: '/search', query: { kwords: this.kwords, type: this.type } })
      }
    },
    autocomplete (value) {
      console.log(value)
      if (value === '') { console.log('kong') }
      this.$axios.get(this.$backip + '/search/autocomplete/' + value + '/')
        .then((res) => {
          this.tip[0].children = res.data.article
          console.log(res.data.question)
          this.tip[1].children = res.data.question
        })// todo 对接后台接口自动补全
    }
  }
}

</script>

<style scoped>
  .searchClass >>> .ivu-input{
    letter-spacing:1px;
    width:100%;
    height: 40px;
    border-radius: 24px;
    font-size: 20px;
  }
  .optionClass /deep/ .ivu-select-dropdown{
    border-radius: 16px;
  }
  .iconClass /deep/ .ivu-input-icon {
    font-size: 27px;
    text-align: left;
    right: 1%;
    bottom: 14%;
  }
  .demo-auto-complete-item{
    position: static;
    padding: 4px 0;
    border-bottom: 1px solid #F6F6F6;
  }
  .demo-auto-complete-group{
    font-size: 12px;
    padding: 4px 6px;
  }
  .demo-auto-complete-group span{
    color: #666;
    font-weight: bold;
    float: left;
  }
  .demo-auto-complete-group a{
    float: right;
  }
  .demo-auto-complete-count{
    width: 20%;
    float: right;
    color: #999;
  }
  .demo-auto-complete-title{
    font-size: 15px;
    text-align: left;
    width: 80%;
    float:left;
  }

</style>
