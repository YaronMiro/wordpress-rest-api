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
		<div class="fillters">
		<ul class="terms-itmes">
			<?php foreach (get_terms(array( 'taxonomy' => 'genre', 'parent' => 0, 'hide_empty' => false)) as $parent): ?>
				<li>
					<h6 class="term-item"><?php print $parent->name; ?></h6>
					<ul class="term-item-childrens">
					<?php foreach (get_terms(array( 'taxonomy' => 'genre', 'parent' => $parent->term_id, 'hide_empty' => false)) as $child_term): ?>
						<li>
							<input type="checkbox" id="<?php print $child_term->term_id; ?>" value="<?php print $child_term->term_id; ?>"/>
							<label for="<?php print $child_term->term_id; ?>"><?php print $child_term->name; ?></label>
						</li>
					<?php endforeach;?>
					</ul>
				</li>
			<?php endforeach;?>
		</ul>
		</div>
		<div class="movies-main"></div>
		</main><!-- #main -->
	</div><!-- #primary -->
</div><!-- .wrap -->

<?php
get_footer();
