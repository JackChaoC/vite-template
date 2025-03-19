<template>
    <div class="manageDicts box">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="tabClick">
            <el-tab-pane label="List" name="list">
                <el-table :data="dictsList" stripe border style="width: 100%" height="75vh">
                    <el-table-column prop="dicts_id" label="Id" width="180" />
                    <el-table-column prop="dicts_name" label="Name" />
                    <el-table-column fixed="right" label="Operations" width="150">
                        <template #default="scope">
                            <el-button type="primary" size="small" @click="rowEdit(scope.row)">Edit</el-button>
                            <el-button type="danger" size="small"
                                @click="rowDelete(scope.row.dicts_id)">Delete</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="Add" name="add" class="add">
                <el-form :model="addFormData">
                    <el-form-item label="dicts_name">
                        <el-input v-model="addFormData.dicts_name" placeholder="dicts_name" clearable
                            style="width: 240px" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onAdd">添加</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>
    </div>
    <el-dialog v-model="dialogVisible" :modal="true" append-to-body destroy-on-close style="min-width: 340px;">
        <el-form :model="editFormData" label-width="auto">
            <div>
                <el-button type="primary" @click="updateDicts">保存</el-button>
            </div>
            <el-form-item label="id">
                <el-input v-model="editFormData.dicts_id" placeholder="id" clearable style="width: 240px" disabled />
            </el-form-item>
            <el-form-item label="name">
                <el-input v-model="editFormData.dicts_name" placeholder="name" clearable style="width: 240px" />
            </el-form-item>
            <div style="display: flex; flex-direction: row-reverse;">
                <el-button type="primary" @click="sonOpenAddForm">+</el-button>
            </div>
            <el-table :data="dictsCategoryList" stripe border style="width: 100%" height="50vh">
                <el-table-column prop="category_id" label="Category Id" width="100" />
                <el-table-column prop="category_name" label="Category Name" />
                <el-table-column fixed="right" label="Operations" width="150">
                    <template #default="scope">
                        <el-button type="primary" size="small"
                            @click="sonOpenEditForm(scope.row.category_id)">Edit</el-button>
                        <el-button type="danger" size="small"
                            @click="sonDelete(scope.row.category_id)">Delete</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form>
    </el-dialog>
    <!-- 三级form -->
    <el-dialog v-model="dialogVisibleAddSon" :modal="true" append-to-body destroy-on-close :width="500">
        <el-form :model="sonDetail" label-width="auto">

            <div>
                <el-button type="primary" @click="() => sonDetail.mode == 'add' ? addDictsCategory() : rowSonEdit()">{{
                    sonDetail.mode
                        ==
                        'add' ? '添加' : '保存' }}</el-button>
            </div>
            <el-form-item label="id">
                <el-input v-model="sonDetail.data.category_id" placeholder="id" clearable style="width: 240px"
                    disabled />
            </el-form-item>
            <el-form-item label="name">
                <el-input v-model="sonDetail.data.category_name" placeholder="name" clearable style="width: 240px" />
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script setup>
import { inject, ref, reactive, onMounted, onActivated, nextTick, toRefs } from 'vue';
import { ElMessage } from 'element-plus';
import request from '@/http/request.js'
import { validateEmail } from '../../../tools/validate';

const $baseUrl = inject('$baseUrl');
const dictsFIlterList = ref([])
const dictsCategoryFIlterList = ref([])

//一级-列表
const dictsList = ref([])
const activeName = ref('list')
const addFormData = reactive({
    dicts_id: '',
    dicts_name: ''
})
const onAdd = async () => {
    console.log('submit!')
    console.log(addFormData)
    try {
        const result = await request.post(`/management/addDicts`, {
            dicts_name: addFormData.dicts_name
        })
        ElMessage.success('添加成功')
    } catch (error) {
    }
    addFormData.dicts_name = ''

}
const tabClick = () => {
    nextTick(() => {
        console.log(activeName.value);
        if (activeName.value == 'list') {
            getDicts()
        }
    })
}
const getDicts = async () => {
    try {
        const result = await request.post(`/management/getDicts`, {
            dicts_name: addFormData.dicts_name
        })
        dictsList.value = result
    } catch (error) {
        console.log(error);
    }

}
const rowEdit = (row) => {
    dialogVisible.value = true
    editFormData.value.dicts_id = row.dicts_id
    console.log(row);
    getDictsDetails();
    getDictsCategory();
}
const rowDelete = async (id) => {
    try {
        const result = await request.post(`/management/deleteDicts`, {
            id: id
        });
        ElMessage.success('删除成功')
        getDicts()
    } catch (error) {

    }

}

//二级-表单-列表
const editFormData = ref({
    dicts_id: '',
    dicts_name: '',
    dicts_category: []
})
const dictsCategoryList = ref([])
const dialogVisible = ref(false)
const getDictsDetails = async () => {
    const result = await request.post(`/management/getDicts`, {
        id: editFormData.value.dicts_id
    })
    editFormData.value.dicts_name = result.dicts_name
}
const getDictsCategory = async () => {
    try {
        const result = await request.post(`/management/getDictsCategory`, {
            fk: editFormData.value.dicts_id
        })
        dictsCategoryList.value = result
        console.log(dictsCategoryList.value);

    } catch (error) {
        console.log(error);
    }

}
const updateDicts = async () => {
    console.log(123);

    try {
        const result = await request.post(`/management/updateDicts`, {
            id: editFormData.value.dicts_id,
            dicts_name: editFormData.value.dicts_name
        })
        ElMessage.success('修改成功')
        // dialogVisible.value = false
        // getDicts()
    } catch (error) {
        console.log(error);
    }
    getDictsDetails()
}
const sonOpenAddForm = () => {
    dialogVisibleAddSon.value = true
    sonDetail.value.mode = 'add'
    sonDetail.value.data.dicts_id = ''
    sonDetail.value.data.dicts_name = ''
}
const sonOpenEditForm = async (id) => {
    dialogVisibleAddSon.value = true
    sonDetail.value.mode = 'edit'
    getCategoryDetails(id)
}

const sonDelete = async (id) => {
    try {
        const result = await request.post(`/management/deleteDictsCategory`, {
            id: id
        });
        ElMessage.success('删除成功')
        getDictsCategory()
    } catch (error) {

    }

}

//三级-表单
const dialogVisibleAddSon = ref(false)
const sonDetail = ref({
    mode: '',// add | update
    data: {
        dicts_id: '',
        category_id: '',
        category_name: ''
    }
})
const addDictsCategory = async () => {
    try {
        const result = await request.post(`/management/addDictsCategory`, {
            fk: editFormData.value.dicts_id,
            category_name: sonDetail.value.data.category_name
        })
        getDictsCategory()
        dialogVisibleAddSon.value = false
        sonDetail.value.data.category_id = ''
        sonDetail.value.data.category_name = ''

        ElMessage.success('添加成功')
    } catch (error) {
    }
}
const getCategoryDetails = async (id) => {
    try {
        const result = await request.post(`/management/getDictsCategory`, {
            id: id
        })
        sonDetail.value.data.category_id = id
        sonDetail.value.data.category_name = result.category_name
    } catch (error) {

    }

}
const rowSonEdit = async () => {
    try {
        const result = await request.post('/management/updateDictsCategory', {
            id: sonDetail.value.data.category_id,
            category_name: sonDetail.value.data.category_name
        })
        getDictsCategory()
        dialogVisibleAddSon.value = false
        ElMessage.success('修改成功')

    } catch (error) {

    }

}


//初始化
const initData = () => {
    getDicts();
}

//dialog



onActivated(() => {
    initData()
})
</script>

<style scoped lang="scss">
.manageDicts {
    width: 100%;
    box-sizing: border-box;
    padding: 1rem 2rem;
}

.add {}
</style>