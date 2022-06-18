<template>
<div class="container">

<h3>Font Size</h3>

<div v-for="(n) in em" :key="n">
    <div v-if="n <= 13">
        <h6>
            <code>
                .em-{{n}}
                .em-sm-{{n}}
                .em-md-{{n}}
                .em-lg-{{n}}
                .em-xl-{{n}}
                .em-xxl-{{n}}
            </code>
        </h6>
        <p>font-size: {{Number(n * .1).toFixed(1)}}em</p>
        <p :class="'em-'+n">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae eligendi impedit, iusto laboriosam doloremque aperiam corrupti dolore! Natus nesciunt, sit dolor et delectus vero eligendi ex libero similique error voluptatum?</p>
    </div>
    <div v-if="n == 100">
        <code><h6>...</h6></code>
        <code><h6>em-{{n}}</h6></code>
        <p>font-size: {{Number(n * .1).toFixed(1)}}em</p>
    </div>
</div>

<hr>

<h3>Font Weight</h3>

<div v-for="n in fw" :key="n">
    <h6>
        <code>
            .fw-{{ n * .01 }}
            .fw-sm-{{ n * .01 }}
            .fw-md-{{ n * .01 }}
            .fw-lg-{{ n * .01 }}
            .fw-xl-{{ n * .01 }}
            .fw-xxl-{{ n * .01 }}
        </code>
    </h6>
    <p>font-weight: {{ n }}</p>
    <p :class="'fw-' + (n * .01)">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae eligendi impedit, iusto laboriosam doloremque aperiam corrupti dolore! Natus nesciunt, sit dolor et delectus vero eligendi ex libero similique error voluptatum?</p>
</div>

</div><!-- .root -->
</template>


<!-- * * * * * * * * * * * * * * * CoffeeScript * * * * * * * * * * * * * * * -->
<script lang="coffee">

# import AppComponent from '@/components/AppComponent'

export default

    name: 'App'

    # components: { AppComponent }

    # beforeCreate: () ->

    # created: () ->

    # beforeMount: () ->

    # mounted: () ->

    # props:

    # data: () ->

    # methods:

    computed:
        em: -> (i for i in [1..100])
        fw: -> (i for i in [100..900] when i % 100 is 0)

</script>


<!-- * * * * * * * * * * * * * * * * Stylus * * * * * * * * * * * * * * * * * -->
<style lang="stylus" scoped>

// @require '../fun'

/*
* sm ≥ 576px
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
// @media (min-width: 576px)

/*
* md ≥ 768px
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
// @media (min-width: 768px)

/*
* lg ≥ 992px
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
// @media (min-width: 992px)

/*
* xl ≥ 1200px
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
// @media (min-width: 1200px)

/*
* xxl ≥ 1400px
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
// @media (min-width: 1400px)

</style>