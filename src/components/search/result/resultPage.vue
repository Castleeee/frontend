<template style="height: 100%;">
  <div  style="height: 100%">
    <div class="cardclass"><!--   阴影线   -->
    </div>
    <div class="cardclass1"><!--   显示小飞机  -->
      <Row style="z-index: 902;">
        <Col span="3">
          <a href="/" style="text-decoration:unset;">
            <img class="logo"  src="../../../assets/all/paper-plane.svg" alt=" ：）" />
            <span style="font-size: 40px;bottom: 8px;position: relative;"><B>Search</B></span>
          </a>
        </Col>
        <Col span="21"></Col>
      </Row>
    </div>
    <Row style="z-index: 902;"><!--   顶栏  -->
      <Col span="3">&nbsp;</Col>
      <Col span="21"><resultHeader style="position:fixed ;padding-top: 23px" :issearch=false v-bind:kw="kwords"></resultHeader></Col>
    </Row>
    <Row >
      <Col span="3">&nbsp;</Col>
      <Col><Menu   @on-select="changeType"
                   style="top: 50px;"
                   mode="horizontal"
                   theme="light"
                   :active-name="querytype">

        <Menu-item  name="all">
          <Icon type="ios-search" />
          全部
        </Menu-item>
        <Menu-item name="article">
          <Icon type="ios-paper" />
          文章
        </Menu-item>
        <Menu-item name="question">
          <Icon type="md-chatbubbles" />
          问题
        </Menu-item>
      </Menu>
      </Col>
    </Row>
    <!-- todo 放上一card -->
    <Row style="padding-top: 60px">
      <Col span="3">&nbsp;</Col>
      <Col span="21" style="color: #70757a;text-align: left">找到约 {{ total| NumFormat }} 条结果</Col>
    </Row>
    <div style="min-height: 45%;padding-top: 20px; " ><!--  内容 background-color: rgba(255,126,31,0.06) -->
      <div v-for="(item,index) in results" :key="index"><!-- todo 把链接写上-->
        <Row style="text-align: left">
          <Col span="3">&nbsp;</Col>
          <Col span="15" class="contenttag">
            作者:<a style="color: #3C4043 " :href="geturl(index,'user')">{{ item.user }}</a> >
            <span v-for="(tag,index1) in item.tags" :key="tag"><a style="color: #3C4043 " @click="pushto(index,index1,'tag')" >{{ tag }}</a> &nbsp;&nbsp;</span> >

            {{ item.type|TypeFormat }} >👍{{item.likes}} </Col>
          <Col span="6"> </Col>
        </Row>
        <Row style="text-align: left">
          <Col span="3">&nbsp;</Col>
          <Col span="15"> <h3 class="contenttitle"><a style="color: rgba(26,13,171,0.87);" :href="geturl(index,'title')">{{ item.title }}</a></h3></Col>
          <Col span="6">&nbsp;</Col>
        </Row>
        <Row style="text-align: left">
          <Col span="3">&nbsp;</Col>
        <Col span="10" class="contentdes"> {{ item.description }}</Col>
          <Col span="11">&nbsp;</Col>
        </Row>
        <br/><br/>
      </div>
    </div>
    <div style="min-height: 30%;"><!--分页和关键词联想 background-color: rgba(43,179,255,0.16)-->
      <Row>
        <Col span="3">&nbsp;</Col>
        <Col span="11" style="text-align: left;font-size:18px;color: #222;"> 相关搜索 </Col>
        <Col span="6"> </Col>
      </Row><br/>

      <Row>
        <Col span="3">&nbsp;</Col>
        <Col span="3" style="text-align: left;">
          <div style="display:flow">
          <div style="width: 100%;font-size:14px;padding-top: 10px" v-for="(item,index) in association[0]" :key="index">
            <Row><a @click="pushto(index,0,'tag0')" style="color:#1a0dab;">{{ item }}</a></Row>
          </div> <!-- todo 把相关的词条传过来-->
          </div>
        </Col>
        <Col span="3" style="text-align: left;">
          <div style="display:flow">
            <div style="width: 100%;font-size:14px;padding-top: 10px" v-for="(item,index) in association[1]" :key="index">
              <Row><a @click="pushto(index,0,'tag1')" style="color:#1a0dab;">{{ item }}</a></Row>
            </div> <!-- todo 把相关的词条传过来-->
          </div>
        </Col>
        <Col span="15"> </Col>
      </Row>
      <Row style="padding-top: 40px ;padding-bottom: 40px">
        <Col span="6">&nbsp;</Col>
        <Col span="14" style="text-align: left">
          <Page style="transform: scale(1.3,1.3)"
                @on-change="changepage"
                :page-size="pagesize"
                size="small"
                :total="total"
                show-elevator />
        </Col>
        <Col span="3">&nbsp;</Col>
      </Row>

    </div>
    <searchFooter style="height: 40px;margin-bottom: 0px;"></searchFooter><!--   底栏  -->
  </div>
</template>

<script>
import searchFooter from '@/components/search/result/searchFooter.vue'
import resultHeader from './resultHeader'
export default {
  components: {
    searchFooter,
    resultHeader
  },
  name: 'resultPage',
  data () {
    return {
      querytype: this.$route.query.type,
      kwords: this.$route.query.kwords,
      page: this.$route.query.page,
      total: 0,
      results: [ ], // 结果一页10个
      association: [[], []], // 6个,便于渲染
      pagesize: 10
    }
  },
  created () {
    this.getresult(this.$route.query.kwords, this.$route.query.type, 1)
  },
  methods: {
    getresult (kwords, type, page) {
      this.$axios.post(this.$backip + '/search/', { kwords: kwords, type: type, page: page })
        .then((res) => {
          this.total = res.data.total
          this.results = res.data.results
          this.association = res.data.association
        })
    },
    changeType (name) { // 切换类型时的动作
      this.querytype = name
      console.log(this.querytype, '切换类型时的动作')
      this.getresult(this.$route.query.kwords, name, 1)
      // todo 获取数据重新渲染
    },
    changepage (index) { // 更该页面的动作
      console.log(this.querytype, '更该页面的动作', index)
      this.getresult(this.$route.query.kwords, this.$route.query.type, index)
      // todo 获取数据重新渲染
    },
    geturl (index, type) { // 给title和用户链接
      if (type === 'user') {
        return this.results[index].authorlink
      }
      if (type === 'title') {
        return this.results[index].link
      }
    },
    pushto (index, index1, type) {
      if (type === 'tag') {
        this.$router.push({ path: '/search', query: { kwords: this.results[index].tags[index1], type: this.querytype } })
        location.reload()
      }
      if (type === 'tag0') {
        this.$router.push({ path: '/search', query: { kwords: this.association[0][index], type: this.querytype } })
        location.reload()
      }
      if (type === 'tag1') {
        this.$router.push({ path: '/search', query: { kwords: this.association[1][index], type: this.querytype } })
        location.reload()
      }
    }
  }
}
</script>

<style scoped>
.cardclass{
  height: 80px;
  padding-top: 0.5%;
  width: 100%;
  background-color: #ffffff;
  position: fixed;
  box-shadow: #a4a4a4 0 0 6px; /*边框阴影*/
}
.cardclass1{
  height: 80px;
  padding-top: 0.5%;
  width: 100%;
  background-color: #ffffff;
  position: fixed;
  z-index: 901;
}
.logo{
  width: 25%;
  height: 25%;
  padding-top:  10px;
}
.contenttag{
  color: #3C4043;
  font-style: normal;
  font-size: 12px;
  padding-top: 2px;
  line-height: 1.3;
  letter-spacing:2px;
}
.contenttitle{
  font-size: 20px;
  line-height: 1.3;
  padding-top: 7px;
  font-family: arial,sans-serif;
  font-weight: normal;
  letter-spacing:2px
}
a:hover {
  text-decoration: underline;
}
.contentdes{
  font-size: 14px;
  padding-top: 6px;
  line-height: 1.5;
  font-family: arial,sans-serif;
  letter-spacing:2px
}
</style>
