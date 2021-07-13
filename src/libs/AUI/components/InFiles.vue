<template>
  <div id="files" draggable="true">把文件拖放进来</div>
</template>

<script>
export default { name: "files" };
</script>





<script setup>
// 用于接受拖放文件夹

function dragstart_handler(ev) {
  // Add the target element's id to the data transfer object
  // ev.dataTransfer.setData("text/plain", ev.target.id);
  console.log(ev);
}

// Get the element by id

window.addEventListener("DOMContentLoaded", () => {
  const element = document.getElementById("files");
  // Add the ondragstart event listener
  element.addEventListener("dragstart", dragstart_handler);
});
</script>>


<style lang="scss" scoped>
#files {
  width: 500px;
  height: 300px;
  border: dashed red;
  margin: 50px auto;
}
</style>
