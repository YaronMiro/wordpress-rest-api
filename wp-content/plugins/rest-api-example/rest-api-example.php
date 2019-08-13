<?php
/**
 * Plugin Name:     Rest Api Example
 * Plugin URI:      PLUGIN SITE HERE
 * Description:     Rest API Example
 * Author:          Yaron Miro
 * Author URI:      https://github.com/YaronMiro
 * Text Domain:     rest-api-example
 * Domain Path:     /languages
 * Version:         0.1.0
 *
 * @package         Rest_Api_Example
 */


defined ( 'ABSPATH' ) || die( 'rest-api-example plugin => Hey, something went wrong...' );
define( 'REST_API_EXAMPLE_PLUGIN_PATH', plugin_dir_path( __FILE__ ) );


require_once(REST_API_EXAMPLE_PLUGIN_PATH . 'post-types/movie.php');
require_once(REST_API_EXAMPLE_PLUGIN_PATH . 'taxonomies/genre.php');

class RestApiExample {

    private function activate() {}
    
    private function deactivate() {}

    private function uninstall() {}

};

// Instantiate plugin class.
if ( class_exists( 'RestApiExample' ) ) {
    $restApiExamplePlugin = new RestApiExample();
}

// Register Activation Hook.
// register_activation_hook(__FILE__, array($restApiExamplePlugin, 'activate') );

// Register Deactivation Hook.
// register_deactivation_hook(__FILE__, array($restApiExamplePlugin, 'deactivate') );