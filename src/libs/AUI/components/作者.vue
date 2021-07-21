<template>
  <footer>
    <kbd
      mdui-tooltip="{content: '不管在身在何处 我都会提醒自己 不要忘记自己活在现实中 QQ:250740270',position: 'top',delay: 500}"
    >
      制作：絕
    </kbd>
    <kbd> 赞助：七哥</kbd>
  </footer>
</template>



<script>
export default {};
</script>

<style>
kbd {
  margin-right: 10px;
}

footer {
  height: 40px;
  line-height: 40px;
  border-top: 2px solid rgb(169, 98, 22);
  text-align: center;
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  color: rgb(169, 98, 22);
  background-color: #303030;
}
</style>