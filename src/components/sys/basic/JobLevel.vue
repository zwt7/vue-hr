<template>
 <div>
    <div>
      <el-input v-model="job.name" size="small" class="input_type"   placeholder="添加职称..."  prefix-icon="el-icon-plus" ></el-input>
      <el-select v-model="job.titlelevel" placeholder="请选择" size="small" class="select_type">
          <el-option  v-for="item in titleLevels" :key="item" :label="item" :value="item"></el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-plus" size="small" @click="addJoblevel">添加</el-button>
    </div>
    <div>
        <!-- 这里的Prop所对应的字段，应和后端的字段名是一致的，我的后端的createdate是小写 -->
      <el-table :data="Joblevels" border stripe style="width: 70%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="编号" width="56"></el-table-column>
        <el-table-column prop="name" label="职位名称" width="180"></el-table-column>
        <el-table-column prop="titlelevel" label="职称等级" width="180"></el-table-column>
        <el-table-column prop="createdate" label="创建时间" width="200"></el-table-column>
        <el-table-column prop="enabled" label="是否启用" width="100">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.enabled" type="success">已启用</el-tag>
            <el-tag v-else type="warning">未启用</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
            <el-button size="mini" @click="showEditDialog(scope.$index,scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
            </template>
        </el-table-column>
      </el-table>
      <el-button type="danger" size="small" style="margin-top:8px"
      @click="deleteMany" :disabled="multipleSelection.length===0">批量删除</el-button>
    </div>
    <el-dialog title="修改名称" :visible.sync="dialogVisible" width="30%">
        <div>
            <el-tag>职位名称</el-tag>
            <el-input class="update_input" size="small" v-model="updateJob.name"></el-input>
        </div>
         <div>
            <el-tag>职称等级</el-tag>
            <el-select class="update_input" size="small" v-model="updateJob.titlelevel">
                <el-option v-for="item in titleLevels" :key="item" :label="item" :value="item">
                </el-option>
            </el-select>
        </div>
        <div>
          <el-tag>是否启用</el-tag>
          <el-switch v-model="updateJob.enabled" class="update_input"></el-switch>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible=false" size="small">取消</el-button>
            <el-button type="primary" @click="doUpdate" size="small">确定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
 data() {
  return {
       // 添加输入框的数据
      job: {
        name: '',
        titlelevel:'',
      },
      //表格显示的数据
      Joblevels:[],
      titleLevels:[
          '正高级',
          '副高级',
          '正级',
          '副级',
          '员级'
      ],
      //更新按钮的数据
      updateJob:{
          name:'',
          titlelevel:'',
          enabled:true
      },
      //对话框显示与否的标志位
      dialogVisible:false,
      //批量删除的数据记录
      multipleSelection:[]
  }
 },
 methods:{
      //表格数据初始化处理
      async initJoblevels(){
          const data=await this.getRequest("/system/basic/job/")
          if(data){
              this.Joblevels=data.obj;
          }
      },
      //添加新记录的事件处理
    async addJoblevel() {
      if (this.job.name&&this.job.titlelevel) {
        const resp = await this.postRequest("/system/basic/job/", this.job);
        if (resp) {
          this.initJoblevels()
          this.job.name =''
          this.job.titlelevel=''
        }
      } else {
        this.$message.warning("职位名称不能为空");
      }
    },
    //显示修改对话框
    showEditDialog(index,data){
        Object.assign(this.updateJob,data)//使用深拷贝
        this.dialogVisible=true;
    },
    //弹框确认修改的事件处理
    async doUpdate(){
        const resp=await this.putRequest("/system/basic/job/",this.updateJob);
        if(resp){
          //刷新一次数据列表
            this.initJoblevels()
            this.dialogVisible=false;
        }
    },
    //表格记录的删除按钮的事件处理
    handleDelete(index,data){
        this.$confirm('此操作将永久删除'+data.name+'职位，是否继续','提示',{
            confirmButtonText:'确定',
            cancelButtonText:'取消',
            type:'warning'
        }).then(()=>{
            this.deleteRequest("/system/basic/job/"+data.id).then(resp =>{
                this.initJoblevels()
            })
        }).catch(()=>{
            this.$message({
                type:'info',
                message:'已取消操作'
            });
        });
    },
    //记录多选的处理
    handleSelectionChange(val){
        console.log(val)
         this.multipleSelection=val
        
    },
    //批量删除
    deleteMany(){
        this.$confirm('此操作将永久删除'+this.multipleSelection.length+'条记录,是否记录'+'提示',{
             confirmButtonText:'确定',
            cancelButtonText:'取消',
            type:'warning'
        }).then(()=>{
            //生成删除记录，id的查询字符串
            let ids="?"
            this.multipleSelection.forEach(item =>{
                ids+="ids="+item.id +'&'
            })
            this.deleteRequest("/system/basic/job/"+ids).then(resp =>{
                this.initJoblevels()
            })
        }).catch(()=>{
            this.$message({
                type:'info',
                message:'已取消操作'
            });
        });
    },
    //在页面元素挂载后加载数据
    mounted(){
        this.initJoblevels()
    }

  },

 }
</script>

<style scoped>
.input_type {
    width: 300px;
    margin-right: 8px;
    margin-bottom: 16px;
  }
   .update_input {
    width: 200px;
    margin-left: 8px;
  }
  .select_type{
      width: 150px;
      margin-left: 8px;
  }

</style>
