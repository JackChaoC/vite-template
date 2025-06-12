<template>
    <div class="manageGoods box">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="List" name="list">List</el-tab-pane>
            <el-tab-pane label="Add" name="add" class="add">
                <el-form :model="editFormData" label-width="auto">
                    <div class="flex form-item">
                        <label>图片</label>
                        <el-upload class="avatar-uploader" :action="`${$baseUrl}/upload`" :show-file-list="false"
                            :on-success="handleAvatarSuccess">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                            <el-icon v-else class="avatar-uploader-icon">
                                <Plus />
                            </el-icon>
                        </el-upload>
                    </div>
                    <div class="form-item">
                        <label>名称</label>
                        <input type="text" class="input">
                    </div>
                    <div class="form-item">
                        <label>价格</label>
                        <input type="text" class="input">
                    </div>
                    <div class="form-item">
                        <label>库存</label>
                        <input type="text" class="input">
                    </div>
                    <button class="btn submit" @click="showFileList">submit</button>
                </el-form>
            </el-tab-pane>

        </el-tabs>
    </div>
</template>

<script setup>
import { inject, ref } from 'vue';
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';

const editFormData = ref({})
let $baseUrl = inject('$baseUrl');

const activeName = ref('add')
const handleClick = () => {
    console.log(activeName.value)
}

const imageUrl = ref('')
const showFileList = () => {
    console.log(imageUrl.value);
}
const handleAvatarSuccess = (res, uploadFile) => {
    console.log(res, uploadFile);
    imageUrl.value = $baseUrl.value + res.data.path
    console.log(imageUrl.value);

}

</script>

<style scoped lang="scss">
.manageGoods {
    width: 100%;
    height: 1000px;
    box-sizing: border-box;
    padding: 1rem 2rem;

}

.add {}

.avatar-uploader {

    img,
    .avatar-uploader-icon {
        height: 100px;
        width: 100px;
    }

    img {
        object-fit: contain;
        border: 1px dashed var(--color-border-gray);

        &:hover {
            border-color: $color-primary;
        }
    }

    .avatar-uploader-icon {
        font-size: 20px;
        border: 1px dashed var(--color-border-gray);
        border-radius: 3px;

        &:hover {
            border-color: $color-primary;
        }
    }
}
</style>