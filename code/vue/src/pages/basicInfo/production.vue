/*
 * @Author: NorthWind 
 * @Date: 2021-03-26 13:48:49 
 * @Last Modified by: NorthWind
 * @Last Modified time: 2021-03-26 14:05:28
 */
<template>
    <div class="commonMain">
        <el-aside class="homeBottomMenu">
            <div class="hbmMain">
                <menuS ref="projectMenu" :viewMenu="viewMenu"></menuS>
            </div>
        </el-aside>
        <el-main class="homeMain">
            <div id="project">
                <router-view />
            </div>
        </el-main>
    </div>
</template>

<script>
import menuS from '@/components/menuList.vue';
export default {
    name: 'production',
    components: {
        menuS
    },
    data() {
        return {
            viewMenu: 3
        };
    },
    created() {
       
    }
};
</script>