<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package WordPress
 * @subpackage Twenty_Seventeen
 * @since 1.0
 * @version 1.0
 */

get_header(); ?>
<div class="wrap">
	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">
		<div class="filters" style="float: left;">
		<input style="margin-bottom: 1rem;" type="text" class="search-box" placeholder="Search for movies...">
		<button style="padding: .5rem; margin-bottom: 1rem;" class="reset-btn" type="button" value="clear">Clear</button>
		<ul style="list-style: none" class="terms-items">
			<?php foreach (get_terms(array( 'taxonomy' => 'genre', 'parent' => 0, 'hide_empty' => false)) as $parent): ?>
				<li>
					<h6 class="term-item"><?php echo $parent->name; ?></h6>
					<ul style="list-style: none" class="term-item-childrens">
					<?php foreach (get_terms(array( 'taxonomy' => 'genre', 'parent' => $parent->term_id, 'hide_empty' => false)) as $child_term): $slug = $child_term->slug; ?>
						<li>
							<input class="genre-filter" name="<?php echo $parent->slug ?>" type="checkbox" id="<?php echo $slug; ?>" value="<?php echo $slug; ?>"/>

							<label for="<?php echo $slug; ?>"><?php echo $child_term->name; ?></label>
						</li>
					<?php endforeach;?>
					</ul>
				</li>
			<?php endforeach;?>
		</ul>
		</div>
		<div style="float: right;" class="movies-main"></div>
		<div style="clear: both;"></div>
		</main><!-- #main -->
	</div><!-- #primary -->
</div><!-- .wrap -->


<?php
$args = array(
	   'post_type' => 'movie',
       'post_status' => 'publish',
       'posts_per_page' => -1,
       'orderby' => 'title',
       'order' => 'ASC',
);

$posts  = new WP_Query( $args );
$posts = $posts->get_posts();

?>

<div class="movies">
	<?php
	foreach ($posts as $key => $post) {
		// echo '<pre>';
		// print_r($post);
		// echo '</pre>';
		$termsArray = get_the_terms( $post->ID, "genre" );
		$termsString = "";

		foreach ( $termsArray as $term ) {
			$termsString .= $term->slug.' ';
		}
	?> 
		<div class="item" data-id="<?php echo $post->post_name; ?>" data-category="<?php echo $termsString; ?>">
			<div><?php echo $post->post_title; ?></div>
		</div>

	<?php }; ?>
</div>

<?php
get_footer();
