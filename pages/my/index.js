//index.js
//获取应用实例
const app = getApp()

Page({
  onTabItemTap(item) {
      console.log(item.index);
      console.log(item.pagePath);
      console.log(item.text);
      wx.hideTabBarRedDot({
          index: item.index
      })
  },
  data: {
    votes: {
      "vote1": 0,
      "vote2": 0,
      "percent": 50
    },
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //事件处理函数
  bindCallHj: function() {
      var that = this;
      wx.request({
        url: 'https://www.wanghaishu.com/vote/1',
        success: function(e){
          that.setData({
            votes: e.data.data
          })
        }
      })
  },
  bindCallHs: function() {
    var that = this;
    wx.request({
      url: 'https://www.wanghaishu.com/vote/2',
      success: function (e) {
        that.setData({
          votes: e.data.data
        })
      }
    })
  },
    onLoad: function () {
    var that = this;
    wx.request({
      url: 'https://www.wanghaishu.com/vote',
      success: function(e){
        console.log(e.data.data);
        that.setData({
            votes:e.data.data
        })
      }
    })
    wx.showTabBarRedDot({
        index: 2
    });
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
    getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
