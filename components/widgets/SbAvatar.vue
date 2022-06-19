<template>
    <div class="avatar" :class="shape">
        <div 
            v-if="fileUrl"
            class="avatar-frame" 
            :style="{'background-image': 'url('+fileUrl+')', 'width': width+'px', 'height': width+'px'}"
        >
        </div>
        <div v-else>
            <img 
                v-if="text==''" 
                src="@/assets/images/user_unknown.png" 
                alt 
                class="no-avatar" 
                :style="{'width': width+'px', 'height': width+'px'}"
            />
            <div v-else class="avatar-text" :style="{backgroundColor:color, 'width': width+'px', 'height': width+'px', fontSize, color:fontColor}">{{textSm}}</div>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        fileUrl: {
            type: String,
        },
        width: {
            type: String,
            default: '120'
        },
        shape: {
            type: String,
            default: 'circle'
        },
        text: {
            type: String,
            default: ''
        },
        color: {
            type: String,
            default: '#b3b3b3'
        },
        fontColor: {
            type: String,
            default: "#ffffff"
        }
    },
    data() {
        return {
        }
    },
    computed: {
        textSm() {
            if (this.text != undefined && this.text != '') {
                if (this.width < 60) {
                    return this.text.charAt(0);
                } else if (this.width < 100) {
                    return this.text.substring(0,2);
                } else {
                    return this.text.substring(0,3);
                }
            } else {
                return "";
            }
        },
        fontSize() {
            if (this.width < 30) {
                return '1rem';
            } else if (this.width < 80) {
                return '1.2rem';
            } else {
                return '2rem';
            }
        }
    },
    watch: {
    },
    mounted() {
    },
    methods: {
    },
    middleware: "authentication"
}
</script>

<style lang="scss" scoped>

.avatar {
    display: inline-block;
    vertical-align: middle;
    .avatar-frame {
        padding: 0.25rem;
        background-color: #f5f6f8;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        border: 1px solid #f6f6f6;
    }
    .avatar-text {
        font-weight: 600;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
.avatar.circle {
    .avatar-frame {
        border-radius: 50%;
    }
    .no-avatar {
        border-radius: 50%;
    }
    .avatar-text {
        border-radius: 50%;
    }
}
.avatar.rect {
    .avatar-frame {
        border-radius: 10px;
    }
    .no-avatar {
        border-radius: 10px;
    }
    .avatar-text {
        border-radius: 10px;
    }
}
</style>