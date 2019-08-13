<?php

/**
 * Enqueue a style.
 */
add_action( 'wp_enqueue_scripts', 'twentyseventeen_child_enqueue_styles' );
function twentyseventeen_child_enqueue_styles() {
 
    $parent_style = 'parent-style';
 
    wp_enqueue_style( $parent_style, get_template_directory_uri() . '/style.css' );
    wp_enqueue_style( 'child-style',
        get_stylesheet_directory_uri() . '/style.css',
        array( $parent_style ),
        wp_get_theme()->get('Version')
    );
}


/**
 * Enqueue a script.
 */
function twentyseventeen_child_enqueue_scripts() {
    wp_enqueue_script( 'twentyseventeen_child-script', get_stylesheet_directory_uri() . '/js/script.js', array( 'jquery' ), '1.0.0', true );
    

    // $total_movie_posts = wp_count_posts('movie');
    $query_args = array(
        'post_type' => 'movie',
        'post_status' => array(
            'publish',
            'pending',
            'draft',
            'private',
        )    
    );
    $movie_posts = new WP_Query($query_args);
    $total_movie_posts = $movie_posts->found_posts;
    $posts_per_page = 20;


    $localize_data = array(
        'SITE_URL' => get_option('siteurl'),
        'TOTAL_POSTS' => $total_movie_posts,
        'POSTS_PER_PAGE' => $posts_per_page,
        'TOTAL_PAGES' => ceil($total_movie_posts / $posts_per_page),
    );
    
    wp_localize_script('twentyseventeen_child-script', 'REST_API_EXAMPLE', $localize_data);

}
add_action( 'wp_enqueue_scripts', 'twentyseventeen_child_enqueue_scripts' );

