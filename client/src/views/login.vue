<template>
    <div class="dashboard">
        <login></login>
    </div>
</template>

<script>
import login from '@/components/Login.vue'
export default {
    components: {
        login
    },
    created() {
        let token = localStorage.getItem('userToken') || false

        if(token){
            this.$router.push('/dashboard')
        }
    },
}
</script>

 <style scoped>
 .v-card{
    margin-top: 70px;
    border-radius: 7px !important;
    padding-bottom: 20px
}
 </style>
 