近期着手开发后台管理系统，其中有一个需求就是能在后台页面中office相关的文档。最初的时候之有在线预览Word、PPT等相关文件，因为是后台返回的文件直链接，需要在前端做相应的展示。最初上传文件的时候采用的是阿里云OSS文件直传上传的文件，上传成功后会返回一个绝对的路径。

在不同的浏览器中直接访问上传文件到阿里云生成的文件链接时，展现效果是截然不同的：有的PC浏览器是支持在线预览Office相关的文件的，有的PC浏览器在访问文件直链接的时候是直接把文件下载到了电脑本地的。

处于方便查阅的目的，减少中间商对文件的破坏，索性选择尽量实现在本窗口来在线预览文件；在实现在线预览的同时，也减少了下载文件来的不方便。上网查询了许多相似的博客文档，但是没有符合本项目实际需求的。最初采用的是利用微软提供的在线预览功能来打开新窗口进行文件word、ppt等文档文件的在线预览功能，但是为了兼顾视频和图片的预览，写两套代码的话感觉有些不妥，最终发挥奇思妙想来实现了弹窗预览的方式，支持PDF、Word、PPT、IMG以及MP$视频的在线预览功能。

html:

```html
<template>
    <div class="content">
        <!-- 在线预览 -->
        <el-dialog
            width="64vw"
            top="9vh"
            :title="viewTitle"
            :visible.sync="isView"
            :destroy-on-close="true"
            @closed="viewType === `VIDEO` && createPlayer('', true)"
        >
            <div class="view_wrap">
                <!-- 预览PDF -->
                <div class="view_pdf" v-if="viewType === `PDF`">
                    <VuePDF :src="viewURL" />
                </div>
                <!-- 预览视频 -->
                <div class="view_video" v-else-if="viewType === `VIDEO`">
                    <div id="xgplayer"></div>
                </div>
                <!-- 预览office -->
                <div class="view_office" v-else-if="viewType === `OFFICE`">
                    <iframe :src="viewURL" width="100%" frameborder="0" seamless></iframe>
                </div>
                <!-- 预览图片 -->
                <div class="view_img" v-else-if="viewType === `IMG`">
                    <el-image :src="viewURL"></el-image>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
```

js:

```js
// 引入xgplayer播放器
import XGPlayer from "xgplayer";

export default {
    components: { VuePDF: () => import("vue-pdf") },
    data() {
        return {
            isUpload: true,
            isView: false,
            viewType: "" /* PDF,OFFICE,IMG,VIDEO */,
            viewTitle: "" /* 弹窗标题 */,
            viewURL: "" /* 预览地址 */,
            player: null /* 播放器标识 */
        };
    },
    methods: {
        // 创建&销毁播放器
        createPlayer(url, flag = false) {
            if (flag) {
                this.player && this.player.once("destroy", () => {});
                return false;
            }
            this.player = new XGPlayer({
                id: "xgplayer",
                url: url,
                // poster: "",
                autoplay: true,
                videoInit: true /* 初始化第一帧 */,
                fluid: true,
                // download: true,
                lang: "zh-cn"
            });
        },
        // 预览
        handleView(item) {
            // 处理文件预览地址
            let path = item.url.toLowerCase(),
                dotIndex = path.lastIndexOf("."),
                fileType = path.substring(dotIndex);
            // 校验文件类型
            if (fileType.includes(".rar.zip")) return false; /* rar、zip */
            this.viewURL = item.url;
            this.viewTitle = `${item.author} -【${item.title}】`;
            // office文档
            if (".doc.docx.ppt.pptx".includes(fileType)) {
                this.viewType = "OFFICE"; /* doc、docx、ppt、pptx */
                let path = `http://view.officeapps.live.com/op/view.aspx?src=${item.url}`;
                this.viewURL = path;
                // window.open(path); /* 可以实现在新窗口预览 */
                // return false;
            }

            if (fileType === ".pdf") {
                this.viewType = "PDF"; /* pdf */
            } else if (".jpg.jpeg.png".includes(fileType)) {
                this.viewType = "IMG"; /* jpg、jpeg、png */
            } else if (".mp4.3gp.m3u8".includes(fileType)) {
                this.viewType = "VIDEO"; /* .mp4.3gp.m3u8 */
                this.$nextTick(() => {
                    this.createPlayer(item.url);
                });
            }
            this.isView = true;
        },
        // 销毁dialog
        dialogClosed(name) {
            this.$refs[name].resetFields();
            if (name === "upForm") {
                this.isUpload = true;
                this.upForm = { type: "", url: "", path: "", worksId: "", status: "", workStatus: "" }; /* 上传附件 */
            } else if (name === "popForm") {
                this.popForm = {}; /* 新建&编辑 */
            }
        }
    }
};
```

> **注**：此次弹窗实现了前端预览多种类型文件的预览功能，其中视频预览采用的是**xgplayer播放器**来实现的，PDF文件在线预览是借助第三方插件**vue-pdf**来实现**PDF文件**预览的。