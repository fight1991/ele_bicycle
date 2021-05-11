// pages/user/livelihoodBusiness_corp/common/listTitle.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    accountId: {
      type: String,
      value: ''
    },
    title: {
      type: String,
      value: '-'
    },
    subTitle: {
      type: String,
      value: '-'
    },
    isTouchToLeft: { // 是否能够左滑
      type: Boolean,
      value: true
    },
    selected: {
      type: Boolean,
      value: false
    },
    showSelectBox: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    start: 0, // 起始位置
    end: 0, // 结束位置
    isLeft: false, // 是否始左滑
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 删除按钮
    deleteBtn (e) {
      this.triggerEvent('delete', this.data.accountId)
    },
    boxTap () {
      let { isLeft, isTouchToLeft, id } = this.data
      if (isLeft && isTouchToLeft) {
        this.setData({
          isLeft: false
        })
      }
    },
    touchstart (e) {
      // console.log(e)
      if (!this.data.isTouchToLeft) return
      let startP = e.changedTouches[0].clientX
      this.data.start = startP
    },
    touchmove (e) {
      if (!this.data.isTouchToLeft) return
      // console.log(e)
    },
    touchcancel (e) {
      if (!this.data.isTouchToLeft) return
      // console.log(e)
    },
    touchend (e) {
      if (!this.data.isTouchToLeft) return
      // console.log(e)
      let endP = e.changedTouches[0].clientX
      let { start } = this.data
      // 滑动距离大于100
      if (endP < start && (start - endP) > 50) { // 说明是左滑
        this.setData({
          isLeft: true
        })
      }
    }
  }
})
