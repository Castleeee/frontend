<template>
    <div>
      <Card>
        <!--        <profileData></profileData>-->
        <div>
          <p style="font-size: 26px">我的资料</p>
          <Divider />
          <div style="font-size: 20px; text-align: left;padding-left: 5%" >
            <div style="display:flex; ">
              <div v-on:click="changeAva" style="height:400px;width:12%; margin-right:20px">
                <img src="../../../../assets/user/mountain-2.jpg" class="round_icon"  alt="">
              </div>
              <div style="height:40%; width:8%; margin-left:30px;margin-right:20px">
                <p> 博客名称</p><br/>
                <p> 博客地址</p><br/>
                <p> 我的简介</p><br/>
              </div>
              <div v-if="!edit" style=" height:40%; width:80%; margin-right:20px">
                <p> :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ blogdata.blogName }}</p><br/>
                <p> :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a :href=blogdata.blogUrl>{{ blogdata.blogUrl }}</a></p><br/>
                <div>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ blogdata.introduction }}</div>
                <br/><br/><br/>
                <br/><br/><br/><br/>
                <Row>
                  <Col span="21">&nbsp;</Col>
                  <Col span="3">&nbsp;<Button class="bottomButon" type="info" @click="edit=!edit">编辑</Button></Col>
                </Row>
              </div>
              <div v-if="edit" style=" height:40%; width:80%; margin-right:20px">
                <p> :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Input v-model="blogName" placeholder="博客名称" style="width: 300px" />
                </p><br/>
                <p> :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Input v-model="blogUrl" placeholder="博客地址" :rows="4" style="width: 300px" />
                </p><br/>
                <p> :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Input v-model="introduction"
                         placeholder="我的简介"
                         show-word-limit
                         type="textarea"
                         style="width: 80%" />
                </p><br/>
                  <br/><br/><br/>
                  <br/><br/><br/><br/>
                  <Row>
                    <Col span="18">&nbsp;</Col>
                    <Col span="6">&nbsp;<Button class="bottomButon" type="info" @click="edit=!edit">取消</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <Button class="bottomButon" @click="updateBlog" type="success">保存</Button></Col>
                  </Row>
                </div>
              </div>
            </div>
        </div>
      </Card>
    </div>
</template>

<script>
export default {
  name: 'myblog',
  mounted () {
    // this.$getProfile()
  },
  data: function () {
    return {
      edit: false,
      blogName: '',
      blogUrl: 'http://',
      introduction: ''
    }
  },
  methods: {
    changeAva: function () {
      this.$Message.success('asas')// todo 更换头像
    },
    updateBlog: function () {
      var blogName = this.blogName
      var blogUrl = this.blogUrl
      var introduction = this.introduction
      if (blogName === '' && introduction === '' && blogUrl === 'http://') {
        this.$Message.error('没有更改任何资料!')
      } else {
        if (this.blogName === '') {
          blogName = this.$store.state.profile.blogName
        } else if (this.introduction === '') {
          introduction = this.$store.state.profile.introduction
        } else if (this.blogUrl === 'http://') {
          blogUrl = this.$store.state.profile.blogUrl
        }
        // eslint-disable-next-line no-useless-escape
        if (!RegExp('/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/').test(blogUrl)) {
          console.log(this.$backip + '/user/blog/' + localStorage.getItem('id') + '/')
          this.$axios.patch(this.$backip + '/user/blog/' + localStorage.getItem('id') + '/', { blogName: blogName, blogUrl: blogUrl, introduction: introduction })
            .then((res) => { location.reload() })
        } else {
          this.$Message.error('请填入正确地址!')
        }
      }
    }
  },
  computed: {
    blogdata: {
      get: function () {
        return this.$store.state.blog // 在这里把临时对象的值通过计算属性赋值给页面中用到的对象
      }
    }
  }
}

</script>

<style scoped>
  .round_icon{
    border-style:solid;
    border-color: #2bb3ff;
    border-width:5px;
    margin-top: 30%;
    width: 100%;
    height: 38%;
    display: flex;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .bottomButon{

    height: 30px;
    width: 100px;

  }
</style>
