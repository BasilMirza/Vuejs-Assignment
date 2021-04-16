<template>
    <div>
    <h2>This is Users</h2>
    <p>{{userDetails.name}}</p>
    </div>
</template>

<script>
export default {
    name: 'UserDetails',
    components: {},
    computed: {
        userDetails() {
            return this.$store.getters.registeredUser;
        }
    },
};
</script>