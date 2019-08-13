<?php

/**
 * Registers the `genre` taxonomy,
 * for use with 'movie'.
 */
function genre_init() {
	register_taxonomy( 'genre', array( 'movie' ), array(
		'hierarchical'      => false,
		'public'            => true,
		'show_in_nav_menus' => true,
		'show_ui'           => true,
		'show_admin_column' => false,
		'query_var'         => true,
		'rewrite'           => true,
		'capabilities'      => array(
			'manage_terms'  => 'edit_posts',
			'edit_terms'    => 'edit_posts',
			'delete_terms'  => 'edit_posts',
			'assign_terms'  => 'edit_posts',
		),
		'labels'            => array(
			'name'                       => __( 'Genres', 'rest-api-example' ),
			'singular_name'              => _x( 'Genre', 'taxonomy general name', 'rest-api-example' ),
			'search_items'               => __( 'Search Genres', 'rest-api-example' ),
			'popular_items'              => __( 'Popular Genres', 'rest-api-example' ),
			'all_items'                  => __( 'All Genres', 'rest-api-example' ),
			'parent_item'                => __( 'Parent Genre', 'rest-api-example' ),
			'parent_item_colon'          => __( 'Parent Genre:', 'rest-api-example' ),
			'edit_item'                  => __( 'Edit Genre', 'rest-api-example' ),
			'update_item'                => __( 'Update Genre', 'rest-api-example' ),
			'view_item'                  => __( 'View Genre', 'rest-api-example' ),
			'add_new_item'               => __( 'New Genre', 'rest-api-example' ),
			'new_item_name'              => __( 'New Genre', 'rest-api-example' ),
			'separate_items_with_commas' => __( 'Separate genres with commas', 'rest-api-example' ),
			'add_or_remove_items'        => __( 'Add or remove genres', 'rest-api-example' ),
			'choose_from_most_used'      => __( 'Choose from the most used genres', 'rest-api-example' ),
			'not_found'                  => __( 'No genres found.', 'rest-api-example' ),
			'no_terms'                   => __( 'No genres', 'rest-api-example' ),
			'menu_name'                  => __( 'Genres', 'rest-api-example' ),
			'items_list_navigation'      => __( 'Genres list navigation', 'rest-api-example' ),
			'items_list'                 => __( 'Genres list', 'rest-api-example' ),
			'most_used'                  => _x( 'Most Used', 'genre', 'rest-api-example' ),
			'back_to_items'              => __( '&larr; Back to Genres', 'rest-api-example' ),
		),
		'show_in_rest'      => true,
		'rest_base'         => 'genre',
		'rest_controller_class' => 'WP_REST_Terms_Controller',
	) );

}
add_action( 'init', 'genre_init' );

/**
 * Sets the post updated messages for the `genre` taxonomy.
 *
 * @param  array $messages Post updated messages.
 * @return array Messages for the `genre` taxonomy.
 */
function genre_updated_messages( $messages ) {

	$messages['genre'] = array(
		0 => '', // Unused. Messages start at index 1.
		1 => __( 'Genre added.', 'rest-api-example' ),
		2 => __( 'Genre deleted.', 'rest-api-example' ),
		3 => __( 'Genre updated.', 'rest-api-example' ),
		4 => __( 'Genre not added.', 'rest-api-example' ),
		5 => __( 'Genre not updated.', 'rest-api-example' ),
		6 => __( 'Genres deleted.', 'rest-api-example' ),
	);

	return $messages;
}
add_filter( 'term_updated_messages', 'genre_updated_messages' );
