<template>
    <div class="popover-confirm">
        <div class="btn-area" @click="toggleConform()">
            <slot></slot>
        </div>
        <div class="confirm-box" :class="[variant, position, gravity]" :style="{left, right}" v-show="show">
            <div class="confirm-contents">
                <div class="icon" v-show="icon != ''">
                    <i :class="icon"></i>
                </div>
                <div>
                    <p class="title" v-html="title" v-show="title != ''"></p>
                    <p class="contents" v-html="info"></p>
                </div>
            </div>
            <hr>
            <div class="tool">
                <b-button type="button" size="sm" :variant="positiveVariant" @click="doIt()">{{positiveText}}</b-button>
                <b-button type="button" size="sm" :variant="negativeVariant" @click="hideConform()">취소</b-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
        },
        info: {
            type: String,
            required: true
        },
        position: {
            type: String,
            default: 'right'
        },
        gravity: {
            type: String,
            default: 'up'
        },
        offset: {
            type: String,
            default: '0'
        },
        icon: {
            type: String,
        },
        variant: {
            type: String,
        },
        positiveText: {
            type: String,
            default: '확인'
        },
        positiveVariant: {
            type: String,
            default: 'danger'
        },
        negativeText: {
            type: String,
            default: '확인'
        },
        negativeVariant: {
            type: String,
            default: 'light'
        },
    },
    computed: {
        left: function () {
            if (this.position == 'left') {
                if (this.offset && this.offset != "0") {
                    return (this.offset * -1) +'px';
                } else {
                    return '-230px';
                }
            } else {
                return '';
            }
        },
        right: function() {
            if (this.position == undefined || this.position == '' || this.position == 'right') {
                if (this.offset && this.offset != "0") {
                    return (this.offset * -1) +'px';
                } else {
                    return '-230px';
                }
            } else {
                return '';
            }
        },
    },
    data() {
        return {
            show: false,
        }
    },
    methods: {
        toggleConform() {
            this.show = !this.show;
        },
        hideConform() {
            this.show = false;
        },
        doIt() {
            this.$emit('confirm');
            this.show = false;
        }
    }
}
</script>

<style lang="scss" scoped>
.popover-confirm {
    position: relative;
    .btn-area {
        display: inline-block;
        cursor: pointer;
    }
    .confirm-box {
        position: absolute;
        bottom: 30px;
        display: flex;
        flex-direction: column;
        min-width: 0;
        word-wrap: break-word;
        background-color: #fff;
        background-clip: border-box;
        border: 0 solid #f6f6f6;
        border-radius: 0.25rem;
        margin-bottom: 1.25rem;
        box-shadow: 0 2px 4px rgba(15, 34, 58, 0.12);
        padding: 10px;
        color: #3a2f19;
        background-color: #f1f1ec;
        border-color: #f1f1ec;
        min-width: 300px;
        z-index: 1;
        .confirm-contents {
            display: flex;
            align-items: flex-start;
            .icon {
                padding-right: 5px;
            }
        }

        p {
            margin: 0;
        }
        .title {
            font-weight: 800;
            text-align: left;
        }
        .contents {
            text-align: left;
        }
        .tool {
            text-align: left;
        }
    }
    .confirm-box:after {
        content: '';
        position: absolute;
        border-style: solid;
        border-width: 16px 16px 0;
        border-color: #f1f1ec transparent;
        display: block;
        width: 0;
        z-index: 1;
        bottom: -16px;
    }
    .confirm-box.left {
        left: -218px;
        .tool {
            text-align: right;
        }
    }
    .confirm-box.left:after {
        right: 20px;
    }

    .confirm-box.gravity-right {
        top: 5px;
        bottom: auto;
    }
    .confirm-box.gravity-right:after {
        border-width: 16px 16px 0px 16px;
        bottom: auto;
        left: -16px;
    }

    .confirm-box.primary {
        color: #37458b;
        background-color: #dee3fa;
        border-color: #ced5f8;
    }

    .confirm-box.secondary {
        color: #464855;
        background-color: #e3e4e8;
        border-color: #d5d7dd;
    }

    .confirm-box.success {
        color: #1f7556;
        background-color: #d6f3e9;
        border-color: #c2eddd;
    }

    .confirm-box.danger {
        color: #924040;
        background-color: #fde1e1;
        border-color: #fcd2d2;
    }

    .confirm-box.warning {
        color: #916c2e;
        background-color: #fcf0db;
        border-color: #fbe9c9;
    }

    .confirm-box.info {
        color: #306391;
        background-color: #dcedfc;
        border-color: #cbe4fb;
    }    

    
    .confirm-box.primary:after {
        border-color: #dee3fa transparent;
    }

    .confirm-box.secondary:after {
        border-color: #e3e4e8 transparent;
    }

    .confirm-box.success:after {
        border-color: #d6f3e9 transparent;
    }

    .confirm-box.danger:after {
        border-color: #fde1e1 transparent;
    }

    .confirm-box.warning:after {
        border-color: #fcf0db transparent;
    }

    .confirm-box.info:after {
        border-color: #dcedfc transparent;
    }    
}
</style>