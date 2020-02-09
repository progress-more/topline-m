<template>
  <div class="user-profile">
     <van-nav-bar
      title="编辑资料"
      left-arrow
      @click-left="$router.back()"
    />
    <van-cell-group>
      <!-- 功能需求：编辑头像资料时，点击选择图片，之后先预览，取消后不变，确定后更改头像；
      细节1.上传图片必须file类型的input，而且提交数据需为formdata格式；
    2.给选择的图片创建url，预览图片 （vant中有预览图片组件）
        -->
      <van-cell title="头像" is-link @click="onSelectFile">
        <van-image
          width="30"
          height="30"
          round
          :src="user.photo"
        />
      </van-cell>
      <input
        type="file"
        ref="file"
        hidden
        @change="onFileChange"
      />
      <van-cell title="昵称" :value="user.name" is-link @click="onClickName"/>
      <!-- <van-cell title="介绍" :value="user" is-link /> -->
      <van-cell title="性别" :value="user.gender === 0 ? '男': '女'" is-link />
      <van-cell title="生日" :value="user.birthday" is-link />
    </van-cell-group>

    <!-- 头像预览 -->
    <van-image-preview v-model="isPreviewShow" :images="images">
      <!-- 由于需要在组件上显示取消和确定按钮，so用到slot插槽，格式同导航栏 -->
      <van-nav-bar
        slot="cover"
        left-text="取消"
        right-text="确定"
        @click-left="isPreviewShow = false"
        @click-right="onSavePhoto"
      />
    </van-image-preview>

     <!-- 修改用户昵称 -->
    <van-popup
      v-model="isEditNameShow"
      position="bottom"
    >
      <van-nav-bar
        title="编辑昵称"
        left-text="取消"
        right-text="完成"
        @click-left="isEditNameShow = false"
        @click-right="onUpdateName"
      />
      <div>
        <van-field
          v-model="message"
          rows="2"
          autosize
          type="textarea"
          maxlength="20"
          show-word-limit
        />
      </div>
    </van-popup>
    <!-- /修改用户昵称 -->
  </div>
</template>

<script>
import { getUserProfile,
  updateUserPhoto,
  updateUserProfile } from '@/api/user'

export default {
  name: 'userProfile',
  components: {},
  props: {},
  data () {
    return {
      user: {}, // 接收用户资料
      isPreviewShow: false,
      images: [], // 预览的图片数组
      isEditNameShow: false,
      message: '' // 昵称输入框信息
    }
  },
  computed: {
    // 作用：封装属性 使用方便 不用每次都this.$refs['file']
    file () {
      return this.$refs['file']
    }
  },
  watch: {},
  created () {
    this.loadProfile()
  },
  mounted () {},
  methods: {
    // 点击昵称 弹出层显示 展示当前昵称
    onClickName () {
      this.isEditNameShow = true
      this.message = this.user.name
    },

    // 更新用户昵称
    async onUpdateName () {
      // 判断是否为空
      if (!this.message) {
        return
      }

      // 请求提交表单
      await this.updateUserProfile('name', this.message)

      // 更新视图
      this.user.name = this.message

      // 关闭弹层
      this.isEditNameShow = false
    },

    // 更新用户资料 (一个接口 so设置一个共同的方法)
    async updateUserProfile (field, value) {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '更新中...',
        forbidClick: true // 是否禁止背景点击
      })
      // 发送请求
      try {
        await updateUserProfile({
          [field]: value // 注意属性名使用中括号包裹，否则会当做字符串来使用而不是变量
        })

        this.$toast.success('更新成功')
      } catch (error) {
        this.$toast.success('更新失败')
      }
    },

    // 点击确定 保存图片
    async onSavePhoto () {
      // 1.用户确认
      await this.$dialog.confirm({
        title: '头像选择',
        message: '确认使用该图片作为头像吗？'
      })
      // 2.点击确认时 为防网络慢用户重复点击 需禁止背景点击
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '保存中...',
        forbidClick: true // 是否禁止背景点击
      })
      // 3.发送请求 更新用户头像
      try {
        // 通过file-input获取文件对象
        const fileObj = this.file.files[0]
        // 构造包含文件的表单对象
        const fd = new FormData()
        fd.append('photo', fileObj)

        // 提交请求
        await updateUserPhoto(fd)
        // 更新视图
        this.user.photo = URL.createObjectURL(fileObj)
        // 提示成功
        this.$toast.success('保存成功')
        this.isPreviewShow = false
      } catch (error) {
        this.$toast.fail('保存失败')
      }
    },

    // 当选择的文件发生改变时 预览图片
    onFileChange () {
      // 1.拿到file类型input选择的文件对象
      const fileObj = this.file.files[0]
      // console.log(fileObj)
      // 2.使用window.URL.createObjectURl(file)得到文件地址
      const fileUrl = window.URL.createObjectURL(fileObj)
      // 3.赋值给img的src属性 展示图片
      // console.log(fileUrl)
      this.images = [fileUrl]
      this.isPreviewShow = true
    },

    // 点击选择文件
    onSelectFile () {
      // 使点击图片行时，实际上是点击input
      this.file.click()
    },

    // 加载用户资料
    async loadProfile () {
      try {
        const { data } = await getUserProfile()
        this.user = data.data
      } catch (error) {
        this.$toast.fail('获取数据失败')
      }
    }
  }
}
</script>

<style lang='less' scoped>
  .van-image-preview {
    // position: relative;
    .van-nav-bar {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #000;
    }
  }

  .van-popup {
    .van-nav-bar {
      background-color: #fff;
      .van-nav-bar__title {
        color: #323233;
      }
    }
  }

</style>
