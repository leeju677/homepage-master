<template>
    <div class="row mb-2" :id="id" :class="className">
        <div 
            class="col-sm-12 label-item" 
            :class="(
                col == '1' ? 'col-md-1' : 
                col == '2' ? 'col-md-2' : 
                col == '3' ? 'col-md-3' : 
                col == '4' ? 'col-md-4' : 
                col == '5' ? 'col-md-5' : 
                col == '6' ? 'col-md-6' : 
                'col-md-2'
            ) +' '+ (
                size == 'sm' ? 'pt-4' : size == 'xs' ? 'pt-0' : 'pt-8'
            )"
        >
            <i class="uil-asterisk" v-show="required == 'true'"></i>
            {{ label }}
        </div>
        <div 
            class="col-sm-12"
            :class="(
                col == '1' ? 'col-md-11' : 
                col == '2' ? 'col-md-10' : 
                col == '3' ? 'col-md-9' : 
                col == '4' ? 'col-md-8' : 
                col == '5' ? 'col-md-7' : 
                col == '6' ? 'col-md-6' : 
                'col-md-10'
            )"
        >
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        id: String,
        className: String,
        label: String,
        required: String,
        col: String,
        size: String,
    }    
}
</script>

<style lang="scss" scoped>
.label-item {
    text-align: right;
}
@media (max-width: 768px) { 
    .label-item {
        text-align: left;
    }
}
</style>