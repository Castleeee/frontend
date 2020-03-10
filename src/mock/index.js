import Mock from 'mockjs'

import getNewsList from './getNewsList'
import login from './accounts/login'
let data = [].concat(
  getNewsList,
  login)
data.forEach(function (res) {
  Mock.mock(res.path, /get|post|delete|patch|put/i, res.data)
})

export default Mock
