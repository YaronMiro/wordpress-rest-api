<?php

/**
 * Registers the `genere` taxonomy,
 * for use with 'movies'.
 */
function genere_init() {
	register_taxonomy( 'genere', array( 'movies' ), array(
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
			'name'                       => __( 'Generes', 'rest-api-example' ),
			'singular_name'              => _x( 'Genere', 'taxonomy general name', 'rest-api-example' ),
			'search_items'               => __( 'Search Generes', 'rest-api-example' ),
			'popular_items'              => __( 'Popular Generes', 'rest-api-example' ),
			'all_items'                  => __( 'All Generes', 'rest-api-example' ),
			'parent_item'                => __( 'Parent Genere', 'rest-api-example' ),
			'parent_item_colon'          => __( 'Parent Genere:', 'rest-api-example' ),
			'edit_item'                  => __( 'Edit Genere', 'rest-api-example' ),
			'update_item'                => __( 'Update Genere', 'rest-api-example' ),
			'view_item'                  => __( 'View Genere', 'rest-api-example' ),
			'add_new_item'               => __( 'New Genere', 'rest-api-example' ),
			'new_item_name'              => __( 'New Genere', 'rest-api-example' ),
			'separate_items_with_commas' => __( 'Separate generes with commas', 'rest-api-example' ),
			'add_or_remove_items'        => __( 'Add or remove generes', 'rest-api-example' ),
			'choose_from_most_used'      => __( 'Choose from the most used generes', 'rest-api-example' ),
			'not_found'                  => __( 'No generes found.', 'rest-api-example' ),
			'no_terms'                   => __( 'No generes', 'rest-api-example' ),
			'menu_name'                  => __( 'Generes', 'rest-api-example' ),
			'items_list_navigation'      => __( 'Generes list navigation', 'rest-api-example' ),
			'items_list'                 => __( 'Generes list', 'rest-api-example' ),
			'most_used'                  => _x( 'Most Used', 'genere', 'rest-api-example' ),
			'back_to_items'              => __( '&larr; Back to Generes', 'rest-api-example' ),
		),
		'show_in_rest'      => true,
		'rest_base'         => 'genere',
		'rest_controller_class' => 'WP_REST_Terms_Controller',
	) );

}
add_action( 'init', 'genere_init' );

/**
 * Sets the post updated messages for the `genere` taxonomy.
 *
 * @param  array $messages Post updated messages.
 * @return array Messages for the `genere` taxonomy.
 */
function genere_updated_messages( $messages ) {

	$messages['genere'] = array(
		0 => '', // Unused. Messages start at index 1.
		1 => __( 'Genere added.', 'rest-api-example' ),
		2 => __( 'Genere deleted.', 'rest-api-example' ),
		3 => __( 'Genere updated.', 'rest-api-example' ),
		4 => __( 'Genere not added.', 'rest-api-example' ),
		5 => __( 'Genere not updated.', 'rest-api-example' ),
		6 => __( 'Generes deleted.', 'rest-api-example' ),
	);

	return $messages;
}
add_filter( 'term_updated_messages', 'genere_updated_messages' );
