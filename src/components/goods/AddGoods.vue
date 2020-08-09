<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card style="height: 500px">
      <el-alert
        title="添加商品"
        type="info"
        center
        show-icon
        :closable="false">
      </el-alert>

      <el-steps :active="activeIndex-0" align-center>
        <el-step title="步骤1"></el-step>
        <el-step title="步骤2"></el-step>
        <el-step title="步骤3"></el-step>
        <el-step title="步骤4"></el-step>
        <el-step title="步骤5"></el-step>
        <el-step title="步骤6"></el-step>
      </el-steps>

      <el-tabs v-model="activeIndex" tab-position="left" style="height: 100%;" :before-leave="beforeLeave">
        <el-tab-pane label="基本信息">基本信息</el-tab-pane>
        <el-tab-pane label="参数">
          <div>
            <quill-editor v-model="content"
                          :options="editorOption">
            </quill-editor>
          </div>
        </el-tab-pane>
        <el-tab-pane label="属性">属性</el-tab-pane>
        <el-tab-pane label="图片">
          <el-upload
            :action="uploadFunc()"
            :file-list="fileList"
            multiple
            list-type="picture"
            :on-success="handlerSuccess"
            :on-preview="handlerPreview"
            :on-remove="handlerRemove"
            :headers="headers">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="内容">
          <!-- 2.为echatrs准备一个具备大小的Dom -->
          <div id="main" style="width: 600px;height: 400px"></div>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <el-dialog
      :visible.sync="dialogVisible"
      width="50%">
      <img :src="imgsrc" style="width: 100%"/>
    </el-dialog>
  </div>
</template>

<script>

  export default {
    name: 'AddGoods',

    data() {
      return {
        activeIndex: '0',
        fileList: [],
        headers: {
          Authorization: window.sessionStorage.getItem('username')
        },
        dialogVisible: false,
        imgsrc: '',
        content: null,
        editorOption: {
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
              ['blockquote', 'code-block'], // 引用  代码块
              [{ header: 1 }, { header: 2 }], // 1、2 级标题
              [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
              [{ script: 'sub' }, { script: 'super' }], // 上标/下标
              [{ indent: '-1' }, { indent: '+1' }], // 缩进
              // [{'direction': 'rtl'}],                         // 文本方向
              [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
              [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
              [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
              [{ font: [] }], // 字体种类
              [{ align: [] }], // 对齐方式
              ['clean'], // 清除文本格式
              ['link', 'image', 'video'] // 链接、图片、视频
            ] //工具菜单栏配置
          }
        }
      }
    },

    // 此时页面上的元素已经渲染完毕
    mounted() {
      //console.log(this.$route.params.id)
      //console.log()

      // 3.初始化echarts实例
      var myChart = echatrs.init(document.getElementById('main'))

      // 4.准备数据和配置项
      var option = {
          title: {
            text: '未来一周气温变化',
            subtext: '纯属虚构'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['最高气温', '最低气温']
          },
          toolbox: {
            show: true,
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              dataView: { readOnly: false },
              magicType: { type: ['line', 'bar'] },
              restore: {},
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value} °C'
            }
          },
          series: [
            {
              name: '最高气温',
              type: 'line',
              data: [11, 11, 15, 13, 12, 13, 10],
              markPoint: {
                data: [
                  { type: 'max', name: '最大值' },
                  { type: 'min', name: '最小值' }
                  ]
              },
              markLine: {
                data: [
                  { type: 'average', name: '平均值' }
                  ]
              }
            },
            {
              name: '最低气温',
              type: 'line',
              data: [1, -2, 2, 5, 3, 2, 0],
              markPoint: {
                data: [
                  { name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }
                  ]
              },
              markLine: {
                data: [
                  { type: 'average', name: '平均值' },
                  [{
                    symbol: 'none',
                    x: '90%',
                    yAxis: 'max'
                  }, {
                    symbol: 'circle',
                    label: {
                      position: 'start',
                      formatter: '最大值'
                    },
                    type: 'max',
                    name: '最高点'
                  }]
                  ]
              }
            }
            ]
        }

      // 5.展示
      myChart.setOption(option)
    },

    methods: {
      beforeLeave(activeName, oldActiveName) {
        // console.log(oldActiveName)
      },

      uploadFunc() {
        //return this.$http.baseURI
        //这里返回的是一个字符串，所以没有使用axios的方法上传，即没有给上传请求的header里面添加token
        return this.$http.defaults.baseURL + 'upload/uploadFile'
      },

      handlerSuccess(reposne) {
        //console.log(reposne)
        //console.log(this.fileList)
      },

      handlerRemove(file) {
        //console.log(file)
      },

      handlerPreview(file) {
        this.dialogVisible = true
        this.imgsrc = file.url
        console.log(file)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-steps {
    margin: 10px 0;
  }
</style>
