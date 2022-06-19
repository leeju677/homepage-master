<template>
    <div class="k-collapse" :id="id">
        <div class="collapse-button" @click="toggleCollapse()" :class="className">
            <slot></slot>
            <span
                role="button"
                class="btn-opener"
                :class="showContents ? null : 'collapsed'"
                :aria-expanded="showContents ? 'true' : 'false'"
            ><i class="uil-angle-down"></i></span>            
        </div>
    </div>
</template>

<script>
export default {
    props: {
        id: String,
        className: String,
    },
    data() {
        return {
            showContents: false
        }
    },
    methods: {
        toggleCollapse() {
            console.log('toggleOpen');
            this.showContents = !this.showContents;
            this.$emit('onCollapse', this.showContents);
        }
    }
}
</script>

<style lang="scss" scoped>
    .k-collapse {
        .collapse-button {
            display: inline-block;
            cursor: pointer;
        }
        .btn-opener {
            display: inline-block;
            border: 0;
            border-radius: 50%;
            transition: all ease 0.5s;
            font-size: 1rem;
        }
        .btn-opener.collapsed {
            transform: rotate( 180deg );
        }
    }

</style>