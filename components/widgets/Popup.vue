<template>
  <div class="body">
    <b-card>
      <b-card-title>{{ title }}</b-card-title>
      <b-card-body> {{content}} </b-card-body>
      <b-form-checkbox
        value="staff"
        unchecked-value=""
        class="pt-2 mr-20"
        checked
        plain
        >팝업 하루동안 열지 않기</b-form-checkbox
      >
      <b-button type="button" variant="primary"  @click="emitToParent" class="w-sm justify-content-end">링크 이동</b-button>
      <b-button type="button" variant="primary"  @click="emitToParent" class="w-sm justify-content-end">닫기</b-button>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "Popup",
  props: {
    title: String,
    content: String,
    windowId: Number,
  },
  data() {
    return {
      send: {
        text: "",
        id: 0,
      },
    };
  },
  mounted() {},
  methods: {
    emitToParent() {
      this.send.text = this.title;
      this.send.id = this.windowId;
      this.$emit("window-popup", this.send);
      this.$emit("window-close");
    },
  },
};
</script>
