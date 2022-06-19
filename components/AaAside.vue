<template>
  <div class="aa-aside">
    <h1 class="text-center">알찬상회</h1>
    <div class="text-center mb-10">
      <img src="@/assets/images/r_altoran.jpg" class="temp-img">
    </div>

    <P>
      이 파일은 @/components/AsAside.vue 입니다.<br>
      @/layouts/default.vue에서 아래의 코드로 불러오고 있습니다.
    </p>

    <pre>
&lt;div class="aside"&gt;
.      &lt;AaAside&gt;&lt;/AaAside&gt;
&lt;/div&gt;

&lt;script&gt;
import AaAside from "@/components/AaAside.vue";

export default {
  components: {
    AaAside
  },

    </pre>
    <P>
      "@/"경로는 프로젝트의 루트를 의미합니다.<br>
      신규로 제작하는 컴퍼넌트의 이름은 "Aa~"로 시작하도록 지어주면 관리가 편할것 같습니다.
    </P>

  </div>
</template>

<script>
  export default {};
</script>
  
<style lang="scss" scoped>
  .temp-img {
    width: 300px;
    text-align: center;
  }
</style>