<template>
    <div class="k-collapse" :class="className" :id="id">
        <div class="collapse-button" @click="showContents = !showContents" :class="buttonClassName" :style="buttonStyle">
            {{label}}
            <span
                role="button"
                class="btn-opener"
                :class="showContents ? null : 'collapsed'"
                :aria-expanded="showContents ? 'true' : 'false'"
            ><i class="uil-angle-down"></i></span>            
        </div>
        <b-collapse v-model="showContents">
            <slot></slot>
        </b-collapse>
    </div>
</template>

<script>
export default {
    props: {
        id: String,
        className: String,
        label: String,
        buttonClassName: String,
        buttonStyle: String,
    },
    data() {
        return {
            showContents: false,
        }
    },
    mothods: {
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