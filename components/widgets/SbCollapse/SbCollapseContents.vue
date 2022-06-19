<template>
    <div class="k-collapse" :class="className" :id="id">
        <b-collapse v-model="show">
            <slot></slot>
        </b-collapse>
    </div>
</template>

<script>
export default {
    props: {
        id: String,
        className: String,
        show: Boolean
    },
    data() {
        return {
        }
    },
    mothods: {
    }
}
</script>

<style lang="scss" scoped>
    .btn-opener {
        display: inline-block;
        border: 0;
        border-radius: 50%;
        transition: all ease 0.5s;
    }
    .btn-opener.collapsed {
        transform: rotate( 180deg );
    }
</style>