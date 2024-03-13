/*
 * @Author: NorthWind 
 * @Date: 2020-12-14 09:25:43 
 * @Last Modified by: NorthWind
 * @Last Modified time: 2021-03-26 13:38:36
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
    name: 'basicInfo',
    components: {
        menuS
    },
    data() {
        return {
            viewMenu: 6
        };
    },
    created() {
       
    }
};
</script>