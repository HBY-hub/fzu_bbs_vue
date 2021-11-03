<template>
  <Nav/>
  <van-row>
    <van-col span="1"/>
    <van-col span="22">
      <van-uploader v-model="fileList" :after-read="afterRead" multiple />
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
              name="标题"
              placeholder="标题"
              v-model="title"
          />
          <van-field
              name="描述"
              placeholder="描述"
              v-model="description"
          />
          <van-field
              v-model="content"
              rows="2"
              autosize
              type="textarea"
              maxlength="140"
              placeholder="内容"
              show-word-limit
          />
          <van-field
              v-model="result"
              is-link
              readonly
              label="主题"
              placeholder="选择主题"
              @click="()=>{showPicker=true;console.log(showPicker)}"
          />
          <van-popup v-model:show="showPicker" round position="bottom">
            <van-picker
                :columns="columns"
                @cancel="showPicker = false"
                @confirm="onConfirm"
            />
          </van-popup>
        </van-cell-group>
        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit">
            发布
          </van-button>
        </div>
      </van-form>
    </van-col>
    <van-col span="1"/>
  </van-row>
</template>

<script>
import {defineComponent, ref} from "vue";
import axios from "axios";
import Nav from "@/components/Nav";
import {useRouter} from "vue-router";
import {useStore} from "vuex";


export default defineComponent({
  name: "AddPassage",
  components: {Nav},
  setup(){
    const store = useStore();
    const columns = ['失物招领','快递代取','活动通知','校园兼职','闲置转让'];
    const router = useRouter()
    const result = ref('');
    const showPicker = ref(false);

    const onConfirm = (value) => {
      result.value = value;
      showPicker.value = false;
      console.log(result.value);
    };
    let fileList = ref([])
    const title = ref("")
    const description = ref("")
    const content = ref("")
    let images = []
    const onSubmit=()=>{
      console.log(images)
      axios.post("/addPassage",
            {userName:store.state.user.userName,"title":title.value,"theme":result.value,"description":description.value,"content":content.value,"image":(images)}
      ).then(
          (res)=>{
            console.log(res)
            router.push("/index")
          }
      )

    }
    const afterRead = (file) => {
      let formData = new FormData();
      formData.append("file",file.file);
      console.log(file)
      axios.post("/ossUpload",formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(
          (res)=>{
            // fileList.value = [...fileList.value,res.data.message]
            images=[...images,res.data.message]
            console.log(images)
      })
    };

    return {
      columns,
      showPicker,
      result,
      onConfirm,
      title,
      afterRead,
      description,
      content,
      fileList,
      images,
      onSubmit
    }
  }
})
</script>

<style scoped>

</style>
