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
		<div class="fillters" style="float: left;">
		<ul style="list-style: none" class="terms-items">
			<?php foreach (get_terms(array( 'taxonomy' => 'genre', 'parent' => 0, 'hide_empty' => false)) as $parent): ?>
				<li>
					<h6 class="term-item"><?php print $parent->name; ?></h6>
					<ul style="list-style: none" class="term-item-childrens">
					<?php foreach (get_terms(array( 'taxonomy' => 'genre', 'parent' => $parent->term_id, 'hide_empty' => false)) as $child_term): $id = 'genre-term-id-' . $child_term->term_id; ?>
						<li>
							<input style="display: inline-block;" class="genre-filter" type="checkbox" id="<?php print $id; ?>" value="<?php print $id; ?>"/>
							<label style="display: inline-block;" for="<?php print $id; ?>"><?php print $child_term->name; ?></label>
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
get_footer();
