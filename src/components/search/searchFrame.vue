<template>
  <div>
    <AutoComplete
      v-model="value4"
      icon="ios-search"
      placeholder="  你搜你🐴 呢?  "
      class="searchClass optionClass iconClass" >
      <div class="demo-auto-complete-item" v-for="item in data4" :key="item" >
        <div class="demo-auto-complete-group">
          <span>{{ item.title }}</span>
          <a href="https://www.google.com/search?q=iView" target="_blank">更多</a>
        </div >
        <Option v-for="option in item.children" :value="option.title" :key="option.title" style="height: 35px">
          <span class="demo-auto-complete-title">{{ option.title }}</span>
          <span class="demo-auto-complete-count">{{ option.count }} 人关注</span>
        </Option>
      </div>
      <Button v-click-ctrl
              to="https://www.google.com/search?q=iView"
              style="width: 20%"
              type="warning"><B>搜索</B>
      </Button>
    </AutoComplete>

  </div>
</template>

<script>
export default {
  name: 'searchFrame',
  data () {
    return {
      value4: '',
      data4: [
        {
          title: '话题',
          children: [
            {
              title: 'iView',
              count: 10000

            },
            {
              title: 'iView UI',
              count: 10600

            }
          ]
        },
        {
          title: '问题',
          children: [
            {
              title: 'iView UI 有多好',
              count: 60100

            },
            {
              title: 'iView 是啥',
              count: 30010

            }
          ]
        },
        {
          title: '文章',
          children: [
            {
              title: 'iView 是一个设计语言',
              count: 100000

            }
          ]
        }
      ]
    }
  }
}

</script>

<style scoped>
  .searchClass >>> .ivu-input{
    width:100%;
    height: 44px;
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
    bottom: 18%;
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
    float: right;
    color: #999;
  }
  .demo-auto-complete-title{
    font-size: 15px;
    float:left;
  }

</style>
